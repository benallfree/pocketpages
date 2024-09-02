import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

export const pkg = (key: string, value?: {}) => {
  const PACKAGE_JSON_PATH = path.join('package.json')
  if (!existsSync(PACKAGE_JSON_PATH)) {
    console.error(
      'No package.json found. Please run this command in the root of your project.',
    )
    process.exit(1)
  }
  const parsed = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf-8'))
  if (value) {
    parsed[key] = value
    writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(parsed, null, 2))
  }
  return parsed[key]
}
