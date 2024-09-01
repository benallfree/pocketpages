#!/usr/bin/env tsx

import { program, Command } from 'commander'
import { version } from '../package.json'
import { gobot } from 'gobot'
import path from 'path'
import { copyFileSync } from 'fs'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

program
  .version(version)
  .description('PocketPages CLI')
  .addCommand(
    new Command('dev').action(async () => {
      const sourcePath = path.join(
        __dirname,
        '..',
        'pocketpages',
        '+boot.pb.js'
      )
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
    })
  )

  .parseAsync(process.argv)
