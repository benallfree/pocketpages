#!/usr/bin/env tsx

import { Command, program } from 'commander'
import { copyFileSync } from 'fs'
import { gobot } from 'gobot'
import path from 'path'
import { version } from '../package.json'
import { NewCommand } from './commands/NewCommand'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

program
  .version(version)
  .description('PocketPages CLI')
  .addCommand(
    new Command('dev').action(async () => {
      const sourcePath = path.join(__dirname, '..', 'lib', '+boot.pb.js')
      const destinationPath = path.join('app', '+pocketpages.pb.js')
      copyFileSync(sourcePath, destinationPath)
      const bot = await gobot(`pocketbase`)
      await bot.run([
        `serve`,
        `--dev`,
        `--http=0.0.0.0:8090`,
        `--dir=${`pb_data`}`,
        `--hooksDir=${`app`}`,
        `--migrationsDir=pb_migrations`,
      ])
    }),
  )
  .addCommand(NewCommand())

  .parseAsync(process.argv)
