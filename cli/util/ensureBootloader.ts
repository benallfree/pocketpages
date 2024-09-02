import { copyFileSync } from 'fs'
import { join } from 'path'
import { CLI_ROOT } from '..'

export const ensureBootloader = () => {
  const sourcePath = CLI_ROOT('..', 'lib', '+boot.pb.js')
  const destinationPath = join('app', '+pocketpages.pb.js')
  copyFileSync(sourcePath, destinationPath)
}
