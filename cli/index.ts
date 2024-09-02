#!/usr/bin/env tsx

import { Command, program } from 'commander'
import { dirname, join } from 'path'
import pbPkg from 'pocketbase-bin/package.json'
import { version } from '../package.json'
import { NewCommand } from './commands/NewCommand'
import { InitCommand } from './InitCommand'
import { ServeCommand } from './ServeCommand'

export const CLI_ROOT = (...paths: string[]) =>
  join(dirname(new URL(import.meta.url).pathname), ...paths)

program
  .description('PocketPages CLI')
  .helpOption(false)
  .addCommand(
    new Command(`version`).action(async () => {
      console.log(`PocketPages v${version}`)
      console.log(`PocketBase v${pbPkg.pocketbase.version}`)
    }),
  )
  .addCommand(NewCommand())
  .addCommand(ServeCommand())
  .addCommand(InitCommand())

  .parseAsync(process.argv)
