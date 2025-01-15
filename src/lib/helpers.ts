import { stringify } from 'pocketbase-stringify'
import {} from 'url-parse'

export const pagesRoot = $filepath.join(__hooks, `pages`)

export const mkrequire = (rootPath: string) => (path: string) => {
  // Handle absolute paths (starting with /)
  if (path.startsWith('/')) {
    const finalPath = $filepath.join(pagesRoot, '_private', path)
    try {
      return require(finalPath)
    } catch (e) {
      throw new Error(`No module '${finalPath}' found`)
    }
  }

  // Handle relative paths by searching up the directory tree
  let currentPath = rootPath
  while (currentPath.length >= pagesRoot.length) {
    try {
      return require($filepath.join(currentPath, '_private', path))
    } catch (e) {
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

  // This should never be reached due to the while condition, but TypeScript might want it
  throw new Error(`No module '${path}' found in any parent _private directory`)
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

export const safeLoad = (fname: string, handler: () => any) => {
  try {
    return handler()
  } catch (e) {
    throw new Error(
      `${fname} failed to load with: ${e instanceof Error ? e.stack : e}`
    )
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
