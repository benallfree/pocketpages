import { Command } from 'commander'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { ensureBootloader } from './util/ensureBootloader'
import { runTasks } from './util/Task'

export const init = async () => {
  await runTasks([
    {
      name: `Ensuring PocketPages bootloader`,
      run: async () => ensureBootloader(),
    },
    {
      name: `updating .gitignore`,
      run: async () => {
        const gitignore = existsSync(`.gitignore`)
          ? readFileSync('.gitignore', 'utf-8')
          : ''
        writeFileSync(
          `.gitignore`,
          `${gitignore}\n+pocketpages.pb.js\n.pocketpages\n`,
        )
      },
    },
  ])
}

export const InitCommand = () =>
  new Command('init').description(`Initialize PocketPages`).action(async () => {
    await init()

    console.log(`PocketPages initialized`)
  })
