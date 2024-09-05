import { exec } from 'child_process'
import { Command } from 'commander'
import { binPath } from 'gobot-pocketbase'
import { POCKETPAGES_MOTHERSHIP_URL } from './LoginCommand'
import { ensureBootloader } from './util/ensureBootloader'

export const ServeCommand = () =>
  new Command('serve')
    .description(`Run PocketPages in production mode`)
    .option(`--host <host>`, `Host address to listen on`, `0.0.0.0`)
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
    .allowUnknownOption()
    .helpOption(false)
    .action(async (options) => {
      const { host, dir, hooksDir, migrationsDir, publicDir, port, dev } =
        options

      await ensureBootloader()

      const proc = exec(
        [
          binPath,
          `serve`,
          dev ? `--dev` : '',
          `--http=${host}:${port}`,
          `--dir=${dir}`,
          `--hooksDir=${hooksDir}`,
          `--migrationsDir=${migrationsDir}`,
          `--publicDir=${publicDir}`,
        ]
          .filter(Boolean)
          .join(' '),
        // { stdio: 'inherit' },
      )
      proc.stdout?.pipe(process.stdout)
      proc.stderr?.pipe(process.stderr)
      console.log(`Now serving on ${POCKETPAGES_MOTHERSHIP_URL()}`)
    })
