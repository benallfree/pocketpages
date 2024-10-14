#!/usr/bin/env node
/// <reference types="node" />
import { Command, program } from 'commander'
import { writeFileSync } from 'fs'
import { ensureDirSync } from 'fs-extra'
import { dirname } from 'path'
import { version } from '../package.json'
import { files } from './plugin'

program
  .name('pocketpages')
  .version(version)
  .addCommand(
    new Command('init').action(async () => {
      const fileList = files()

      for (const [file, content] of Object.entries(fileList)) {
        console.log(`Writing ${file}`)
        ensureDirSync(dirname(file))
        writeFileSync(file, content)
      }

      console.log(`PocketPages initialized successfully! Happy coding! 🎉`)
    })
  )

program.parseAsync(process.argv)
