#!/usr/bin/env tsx

import { Command } from 'commander'
import { existsSync } from 'fs'
import inquirer from 'inquirer'
import { chdir } from 'process'
import tiged from 'tiged'
import { ensureBootloader } from '../../util/ensureBootloader'
import { pkg } from '../../util/pkg'
import { runTasks } from '../../util/Task'
import {
  runPackageManagerInstall,
  selectPackageManager,
} from './selectPackageManager'

export const NewCommand = () =>
  new Command('new')
    .description(`Create a new PocketPages app`)
    .argument('<name>', 'Name of the app')
    .option('-t, --template <template>', 'Template to use')
    .action(async (name, { template }) => {
      const finalTemplate = await (async () => {
        if (template)
          return template.includes('/')
            ? template
            : `benallfree/pocketpages/starters/${template}`
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
          name: `Installing PocketPages bootloader`,
          run: async () => ensureBootloader(),
        },
        {
          name: 'Updating project name in package.json',
          run: async () => {
            pkg('name', name)
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
