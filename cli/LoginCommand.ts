import { input } from '@inquirer/prompts'
import { Command } from 'commander'
import * as EmailValidator from 'email-validator'
import envPaths from 'env-paths'
import { default as env } from 'env-var'
import { ensureDirSync, readJSONSync, writeJSONSync } from 'fs-extra'
import { join } from 'path'
import PocketBase, { type AuthModel } from 'pocketbase'
import { runTasks } from './util/Task'

export const POCKETPAGES_HOME = (...paths: string[]) =>
  join(
    env
      .get('POCKETPAGES_HOME')
      .default(envPaths(`pocketpages`).data)
      .asString(),
    ...paths,
  )
ensureDirSync(POCKETPAGES_HOME())

export const POCKETPAGES_MOTHERSHIP_URL = (...paths: string[]) => {
  const url = new URL(
    env
      .get(`POCKETPAGES_MOTHERSHIP_URL`)
      .default(`https://pocketpages.dev`)
      .asString(),
  )
  url.pathname = join(url.pathname, ...paths)
  return url.toString()
}

export type Config = {
  email: string
  auth: { record: AuthModel; token: string }
}
export function config<T extends keyof Config>(
  k: T,
  v?: Config[T],
): Config[T] | undefined {
  const configPath = POCKETPAGES_HOME('config.json')
  // console.log({ configPath })
  const config = (() => {
    try {
      // console.log(`Reading config`, configPath)
      return readJSONSync(configPath) as Partial<Config>
    } catch (e) {
      // console.warn(`${e}`)
      return {}
    }
  })()
  try {
    if (v !== undefined) {
      config[k] = v
      // console.log(`Writing config`, config, configPath)
      writeJSONSync(configPath, config)
      return v
    }
    return config[k]
  } catch (e) {
    console.error(`${e}`)
  }
}

export const client = new PocketBase(POCKETPAGES_MOTHERSHIP_URL())
const { record, token } = config('auth') || {}
// console.log({ record, token })
if (record && token) {
  client.authStore.save(token, record)
  // console.log({ valid: client.authStore.isValid })

  client.authStore.onChange((token, record) => {
    config('auth', { token, record })
  })
}

// console.log(POCKETPAGES_HOME())

export const LoginCommand = () =>
  new Command('login')
    .description(`Log in to PocketPages`)
    .helpOption(false)
    .action(async () => {
      while (true) {
        const email = await input({
          message: 'Enter your email address',
          default: config('email'),
          validate: (input: string) => {
            if (!EmailValidator.validate(input)) {
              return 'Invalid email address'
            }
            return true
          },
        })

        config(`email`, email)

        try {
          await runTasks([
            {
              name: `Sending one-time password`,
              run: async () => {
                const res = await client.send(`/api/otp/auth`, {
                  body: { email },
                  method: 'POST',
                })
              },
            },
          ])
        } catch (e) {
          console.error(`There was an error sending the one-time password`)
          continue
        }

        const code = await input({
          message: `A one-time password has been sent to ${email}. Enter it here:`,
          validate: (input: string) => {
            return !!input.trim().match(/^\d{6}$/) || 'Invalid code'
          },
        })

        try {
          await runTasks([
            {
              name: `Verifying one-time password`,
              run: async () => {
                const res = await client.send(`/api/otp/verify`, {
                  body: { email, code },
                  method: 'POST',
                })
                config(`auth`, res)
                client.authStore.save(res.token, res.record)
              },
            },
          ])
          break
        } catch (e) {
          console.error(`There was an error verifying the one-time password`)
        }
      }
      console.log(`Logged in!`)
    })
