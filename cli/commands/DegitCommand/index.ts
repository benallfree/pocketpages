#!/usr/bin/env tsx

import { confirm, input, select } from '@inquirer/prompts'
import { Command } from 'commander'
import { existsSync } from 'fs'
import tiged from 'tiged'
import { runTasks } from '../../util/Task'
import { selectPackageManager } from './selectPackageManager'

export const DegitCommand = () =>
  new Command('degit')
    .description(`Clone a starter template`)
    .argument('<name>', 'Name of the destination directory')
    .option('-t, --template <template>', 'Template to use')
    .action(async (name, { template }) => {
      const finalTemplate = await (async () => {
        if (template) {
          return template.includes('/')
            ? template
            : `benallfree/pocketpages/starters/${template}`
        }
        {
          const templateName = await select({
            message: 'Choose your template:',
            choices: [
              `deploy-fly-manual`,
              `deploy-fly-ga`,
              `deploy-pockethost-ga`,
              `deploy-pockethost-manual`,
              'other (you specify)',
            ].map((name) => ({ name, value: name })),
          })
          if (templateName !== 'other (you specify)') {
            return `benallfree/pocketpages/starters/${templateName}`
          }
        }
        {
          const templateName = await input({
            message: 'Enter the template name:',
          })
          return templateName.includes('/')
            ? templateName
            : `benallfree/pocketpages/starters/${templateName}`
        }
      })()

      const packageManager = await selectPackageManager()

      // console.log({ name, packageManager, finalTemplate })

      const force = await (async () => {
        if (name !== '.' && existsSync(name)) {
          const force = await confirm({
            message: `Directory ${name} already exists. Overwrite?`,
          })
          return force
        }
      })()

      const tasks = [
        {
          name: 'Cloning template',
          run: async () => {
            const emitter = tiged(finalTemplate, {
              disableCache: true,
              force: force || name === '.',
            })

            // emitter.on('info', (info) => {
            //    console.log(info.message);
            // })

            await emitter.clone(name)
          },
        },
      ]
      await runTasks(tasks)
      console.log(`Your template is ready!`)
    })
