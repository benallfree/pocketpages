import { fs } from 'pocketbase-node'
import { stringify } from 'pocketbase-stringify'
import { ResolveOptions } from './types'

export const pagesRoot = $filepath.join(__hooks, `pages`)

const SAFE_HEADER = `if (typeof module === 'undefined') { module = { exports: {} } };`
const exts = ['', '.js', '.json']

export const moduleExists = (path: string) => {
  for (let i = 0; i < exts.length; i++) {
    if (fs.existsSync(path + exts[i])) {
      return true
    }
  }
  return false
}

const simulateRequire = (path: string) => {
  for (let i = 0; i < exts.length; i++) {
    try {
      return fs.readFileSync(path + exts[i], 'utf-8')
    } catch (e) {
      continue
    }
  }
  throw new Error(`No module '${path}' found`)
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const mkResolve =
  (rootPath: string) => (path: string, options?: Partial<ResolveOptions>) => {
    const _require = (path: string) => {
      if (!moduleExists(path)) {
        throw new NotFoundError(`No module '${path}' found`)
      }
      switch (options?.mode || 'require') {
        case 'raw':
          return simulateRequire(path)
        case 'require':
          return require(path)
        case 'script':
          return `<script>\n${SAFE_HEADER}\n${simulateRequire(path)}\n</script>`
        case 'style':
          return `<style>\n${simulateRequire(path)}\n</style>`
      }
    }

    // Handle absolute paths (starting with /)
    if (path.startsWith('/')) {
      const finalPath = $filepath.join(pagesRoot, '_private', path)
      try {
        return _require(finalPath)
      } catch (e) {
        throw new Error(`No module '${finalPath}' found`)
      }
    }

    // Handle relative paths by searching up the directory tree
    let currentPath = rootPath
    while (currentPath.length >= pagesRoot.length) {
      try {
        const finalPath = $filepath.join(currentPath, '_private', path)
        // console.log(`finalPath`, finalPath)
        return _require(finalPath)
      } catch (e) {
        const errorMsg = `${e}`
        // console.log(`errorMsg`, errorMsg)

        if (!(e instanceof NotFoundError)) {
          throw e
        }
        // If we're at pagesRoot and still haven't found it, throw error
        if (currentPath === pagesRoot) {
          throw new Error(
            `No module '${path}' found in _private directories from ${rootPath} up to ${pagesRoot}`
          )
        }
        // Move up one directory
        currentPath = $filepath.dir(currentPath)
      }
    }

    throw new Error(`Unreachable code reached`)
  }

export const mkMeta = () => {
  const metaData: Record<string, string> = {}
  return (key: string, value: string | undefined) => {
    if (value === undefined) {
      return metaData[key]
    }
    return (metaData[key] = value)
  }
}

export const echo = (...args: any[]) => {
  const result = args.map((arg) => {
    if (typeof arg === 'function') {
      return arg.toString()
    } else if (typeof arg === 'object') {
      return stringify(arg)
    } else if (typeof arg === 'number') {
      return arg.toString()
    }
    return `${arg}`
  })
  return result.join(' ')
}
