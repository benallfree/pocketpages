import { default as URL } from 'url-parse'

export const pagesRoot = $filepath.join(__hooks, `pages`)

export const requirePrivate = (path: string) =>
  require($filepath.join(pagesRoot, `_private`, path))

export const url = (path: string) => new URL(path, true)

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
