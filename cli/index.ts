#!/usr/bin/env tsx

import { program } from 'commander'
import path from 'path'
import { version } from '../package.json'
import { NewCommand } from './commands/NewCommand'
import { DevCommand } from './DevCommand'
import { ServeCommand } from './ServeCommand'

export const __dirname = path.dirname(new URL(import.meta.url).pathname)

program
  .version(version)
  .description('PocketPages CLI')
  .addCommand(DevCommand())
  .addCommand(NewCommand())
  .addCommand(ServeCommand())

  .parseAsync(process.argv)
