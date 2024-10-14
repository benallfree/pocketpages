/// <reference types="node" />
import { writeFileSync } from 'fs'
import { ensureDirSync } from 'fs-extra'
import { dirname } from 'path'
import { files } from './plugin'

const fileList = files()

for (const [file, content] of Object.entries(fileList)) {
  console.log(`Writing ${file}`)
  ensureDirSync(dirname(file))
  writeFileSync(file, content)
}

console.log(`PocketPages initialized successfully! Happy coding! 🎉`)
