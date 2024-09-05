import { select } from '@inquirer/prompts'
import { spawnSync } from 'child_process'
import commandExists from 'command-exists'

export function runPackageManagerInstall(packageManager: string) {
  const result = spawnSync(`${packageManager}`, ['install'], {
    stdio: 'pipe', // Capture stdout and stderr
    encoding: 'utf-8', // Ensure the output is in string format
  })

  const stdout = result.stdout
  const stderr = result.stderr

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    console.error(`Error during ${packageManager} install:`, stderr)
  } else {
  }
}

interface PackageManager {
  name: string
  command: string
}

export async function selectPackageManager(): Promise<string> {
  const managers: PackageManager[] = [
    { name: 'bun', command: 'bun' },
    { name: 'pnpm', command: 'pnpm' },
    { name: 'yarn', command: 'yarn' },
    { name: 'npm', command: 'npm' },
  ]

  let defaultManager: string | undefined

  for (const manager of managers) {
    if (commandExists.sync(manager.command)) {
      defaultManager = manager.name
      break
    }
  }

  const choices = managers.map((manager) => ({
    name: manager.name,
    value: manager.name,
  }))

  const chosenManager = await select({
    message: 'Select your preferred package manager:',
    choices,
    default: defaultManager,
  })

  return chosenManager
}
