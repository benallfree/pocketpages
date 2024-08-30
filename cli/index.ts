#!/usr/bin/env tsx

import { Command } from 'commander'
import { version } from '../package.json'
import { gobot } from 'gobot'
import { join, resolve } from 'path'
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// Source directories and corresponding destination directories
const pathsToWatch = [
  {
    src: resolve('app/pages'),
    dest: resolve('.pocketpages/pb_hooks/pages'),
  },
]

// Ensure the destination directories exist
pathsToWatch.forEach(({ dest }) => fs.mkdirSync(dest, { recursive: true }))

// Function to copy a file from source to destination
const copyFile = (srcPath: string, destPath: string): void => {
  const destFolder = path.dirname(destPath)
  fs.mkdirSync(destFolder, { recursive: true })
  console.log(`Copying ${srcPath} to ${destPath}`)
  fs.copyFile(srcPath, destPath, (err) => {
    if (err) {
      console.error(`Error copying file from ${srcPath} to ${destPath}:`, err)
    } else {
      console.log(`Copied ${srcPath} to ${destPath}`)
    }
  })
}

// Function to copy all files recursively from a directory
const copyAllFiles = (srcDir: string, destDir: string): void => {
  const files = fs.readdirSync(srcDir, { withFileTypes: true })

  files.forEach((file) => {
    const srcPath = path.join(srcDir, file.name)
    const destPath = path.join(destDir, path.relative(srcDir, srcPath))

    if (file.isDirectory()) {
      copyAllFiles(srcPath, destPath)
    } else {
      copyFile(srcPath, destPath)
    }
  })
}

// Watcher function
const watchFiles = (srcDir: string, destDir: string): void => {
  fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
    if (filename) {
      const srcPath = path.join(srcDir, filename)
      const destPath = path.join(destDir, path.relative(srcDir, srcPath))

      if (eventType === 'change' || eventType === 'rename') {
        copyFile(srcPath, destPath)
      }
    }
  })

  console.log(`Watching for changes in ${srcDir}`)
}

const program = new Command()

const ROOT = (...paths: string[]) => join(`.pocketpages`, ...paths)

program
  .version(version)
  .description('PocketPages CLI')
  .addCommand(
    new Command('dev').action(async () => {
      copyAllFiles(join(__dirname, `..`, `lib`), ROOT(`pb_hooks`))

      pathsToWatch.forEach(({ src, dest }) => {
        copyAllFiles(src, dest)
      })

      // Start watching the source directories
      pathsToWatch.forEach(({ src, dest }) => watchFiles(src, dest))

      const bot = await gobot(`pocketbase`)
      await bot.run([
        `serve`,
        `--dev`,
        `--http=0.0.0.0:8090`,
        `--dir=${ROOT(`pb_data`)}`,
        `--hooksDir=${ROOT(`pb_hooks`)}`,
        `--migrationsDir=app/pb_migrations`,
      ])
    })
  )
  .parseAsync(process.argv)
