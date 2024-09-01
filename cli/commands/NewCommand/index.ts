#!/usr/bin/env tsx

import { spawnSync } from 'child_process'
import commandExists from 'command-exists'
import { Command } from 'commander'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import ora from 'ora'
import { chdir } from 'process'
import tiged from 'tiged'

function runPackageManagerInstall(packageManager: string) {
  const result = spawnSync(`${packageManager}`, ['install'], {
    stdio: 'pipe', // Capture stdout and stderr
    encoding: 'utf-8', // Ensure the output is in string format
  })

  const stdout = result.stdout
  const stderr = result.stderr

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    console.error(`Error during ${packageManager} install:`, stderr)
  } else {
  }
}

interface Task {
  name: string
  run: () => Promise<void>
}

async function runTasks(tasks: Task[]): Promise<void> {
  for (const task of tasks) {
    const spinner = ora(`${task.name}...`).start()

    try {
      await task.run()
      spinner.succeed(`${task.name}`)
    } catch (error) {
      spinner.fail(`${task.name}`)
      console.error('Error:', error)
      process.exit(1) // Exit if any task fails
    }
  }
}

interface PackageManager {
  name: string
  command: string
}

async function selectPackageManager(): Promise<string> {
  const managers: PackageManager[] = [
    { name: 'bun', command: 'bun' },
    { name: 'pnpm', command: 'pnpm' },
    { name: 'yarn', command: 'yarn' },
    { name: 'npm', command: 'npm' },
  ]

  let defaultManager: string | undefined

  for (const manager of managers) {
    if (commandExists.sync(manager.command)) {
      defaultManager = manager.name
      break
    }
  }

  const choices = managers.map((manager) => manager.name)

  const { chosenManager } = await inquirer.prompt<{ chosenManager: string }>([
    {
      type: 'list',
      name: 'chosenManager',
      message: 'Select your preferred package manager:',
      choices,
      default: defaultManager,
    },
  ])

  return chosenManager
}

export const NewCommand = () =>
  new Command('new')
    .description(`Create a new PocketPages app`)
    .argument('<name>', 'Name of the app')
    .option('-t, --template <template>', 'Template to use')
    .action(async (name, { template }) => {
      const finalTemplate = await (async () => {
        if (template) return template
        const { templateName } = await inquirer.prompt([
          {
            type: 'list',
            name: 'templateName',
            message: 'Enter the template name:',
            choices: ['minimal', 'daisyui', 'other (you specify)'],
          },
        ])
        if (templateName !== 'other (you specify)')
          return `benallfree/pocketpages/starters/${templateName}`
        {
          const { templateName } = await inquirer.prompt([
            {
              type: 'input',
              name: 'templateName',
              message: 'Enter the template name:',
            },
          ])
          return templateName
        }
      })()

      const packageManager = await selectPackageManager()

      // console.log({ name, packageManager, finalTemplate })

      const force = await (async () => {
        if (existsSync(name)) {
          const { force } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'force',
              message: `Directory ${name} already exists. Overwrite?`,
            },
          ])
          return force
        }
      })()

      const tasks = [
        {
          name: 'Cloning template',
          run: async () => {
            const emitter = tiged(finalTemplate, {
              disableCache: true,
              force,
            })

            emitter.on('info', (info) => {
              // console.log(info.message);
            })

            await emitter.clone(name)
          },
        },
        {
          name: 'Changing directory',
          run: async () => {
            chdir(name)
          },
        },
        {
          name: 'Updating package.json',
          run: async () => {
            const json = JSON.parse(readFileSync('package.json').toString())
            json.name = name
            writeFileSync('package.json', JSON.stringify(json, null, 2))
          },
        },
        {
          name: 'Installing dependencies',
          run: async () => {
            await runPackageManagerInstall(packageManager)
          },
        },
      ]
      await runTasks(tasks)
      console.log(
        `Your PocketPages app is ready!\n\nTo continue, run the following commands:`,
      )
      console.log(`cd ${name}`)
      console.log(`${packageManager} dev`)
    })
