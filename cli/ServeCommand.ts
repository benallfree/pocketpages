import { Command } from 'commander'
import { copyFileSync } from 'fs'
import { gobot } from 'gobot'
import path from 'path'
import { __dirname } from '.'

export const ServeCommand = () =>
  new Command('serve')
    .description(`Run PocketPages in production mode`)
    .option(`--http <http>`, `HTTP address to listen on`, `0.0.0.0`)
    .option(`--port <port>`, `HTTP port to listen on`, `8090`)
    .option(`--dir <dir>`, `Directory for data storage`, `pb_data`)
    .option(`--hooksDir <hooksDir>`, `Directory for hooks`, `pb_hooks`)
    .option(`--dev`, `Run in development mode`, false)
    .option(
      `--migrationsDir <migrationsDir>`,
      `Directory for migrations`,
      `pb_migrations`,
    )
    .option(
      `--publicDir <publicDir>`,
      `Directory for public files`,
      `pb_public`,
    )
    .action(async (options) => {
      const { http, dir, hooksDir, migrationsDir, publicDir, port, dev } =
        options
      const sourcePath = path.join(__dirname, '..', 'lib', '+boot.pb.js')
      const destinationPath = path.join('app', '+pocketpages.pb.js')
      copyFileSync(sourcePath, destinationPath)
      const bot = await gobot(`pocketbase`)
      await bot.run(
        [
          `serve`,
          dev ? `--dev` : '',
          `--http=${http}:${port}`,
          `--dir=${dir}`,
          `--hooksDir=${hooksDir}`,
          `--migrationsDir=${migrationsDir}`,
          `--publicDir=${publicDir}`,
        ].filter(Boolean),
      )
    })
