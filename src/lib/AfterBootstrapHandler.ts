import { forEach } from '@s-libs/micro-dash'
import { dbg } from 'pocketbase-log'
import { fs } from 'pocketbase-node'
import { pagesRoot } from './helpers'
import { PagesInitializerFunc } from './pages'
import { Cache, PagesConfig } from './types'

export type Route = {
  relativePath: string
  absolutePath: string
  fingerprint: string
  shouldPreProcess: boolean
  assetPrefix: string
  segments: {
    nodeName: string
    paramName?: string
  }[]
  middlewares: string[]
  loaders: Partial<{
    load: string
    get: string
    post: string
    put: string
    delete: string
  }>
  isMarkdown: boolean
  isEjs: boolean
  layouts: string[]
}

export const LOADER_METHODS = ['load', 'get', 'post', 'put', 'delete'] as const

export const AfterBootstrapHandler: PagesInitializerFunc = () => {
  dbg(`pocketpages startup`)

  if (!fs.existsSync(pagesRoot)) {
    throw new Error(
      `${pagesRoot} must exist. Did you launch pocketbase with --dir or --hooksDir`
    )
  }

  /**
   * Load the config file
   */
  const configPath = $filepath.join(pagesRoot, `+config.js`)
  // dbg({ configPath })
  const config: PagesConfig = {
    preprocessorExts: ['.ejs', '.md'],
    ...(() => {
      try {
        return require(configPath) as Partial<PagesConfig>
      } catch (e) {
        return {}
      }
    })(),
  }

  const physicalFiles: string[] = []
  $filepath.walkDir(pagesRoot, (path, d, err) => {
    const isDir = d.isDir()
    if (isDir) {
      return
    }
    physicalFiles.push(path.slice(pagesRoot.length + 1))
  })
  dbg({ physicalFiles })

  const addressableFiles = physicalFiles.filter((f) => {
    // Check if file name starts with +
    if ($filepath.base(f).startsWith('+')) {
      return false
    }

    // Check if any path segment is _private
    const pathParts = f.split('/')
    return !pathParts.some((part) => part === '_private')
  })
  dbg({ addressableFiles })

  const routes: Route[] = addressableFiles
    .map((relativePath) => {
      dbg(`Examining route`, relativePath)
      const parts = relativePath.split('/').filter((p) => !p.startsWith(`(`))
      const absolutePath = $filepath.join(pagesRoot, relativePath)
      dbg({ relativePath, absolutePath, parts })

      // dbg({ parts })
      const content = toString($os.readFile(absolutePath))
      const route: Route = {
        relativePath,
        absolutePath,
        fingerprint: $security.sha256(content).slice(0, 8),
        assetPrefix: parts[parts.length - 2] ?? '',
        isMarkdown: relativePath.endsWith('.md'),
        isEjs: relativePath.endsWith('.ejs'),
        shouldPreProcess: config.preprocessorExts.some((ext) =>
          relativePath.endsWith(ext)
        ),
        segments: parts.map((part) => {
          return {
            nodeName: part,
            paramName: part.match(/\[.*\]/)
              ? part.replace(/\[(.*)\]/g, '$1')
              : undefined,
          }
        }),
        middlewares: [],
        layouts: [],
        loaders: {},
      }

      if (!route.shouldPreProcess) {
        return route
      }

      /**
       * Calculate layouts
       */
      {
        const pathParts = $filepath
          .dir(relativePath)
          .split(`/`)
          .filter((node) => node != '.')
          .filter((p) => !!p)
        dbg(`layout`, { pathParts }, $filepath.dir(relativePath))
        do {
          const maybeLayout = $filepath.join(
            pagesRoot,
            ...pathParts,
            `+layout.ejs`
          )
          dbg({ pathParts, maybeLayout })
          if (fs.existsSync(maybeLayout, 'file')) {
            route.layouts.push(maybeLayout)
            dbg(`layout found`)
          }
          if (pathParts.length === 0) {
            break
          }
          pathParts.pop()
        } while (true)
      }

      /**
       * Calculate middlewares
       */
      {
        const pathParts = $filepath
          .dir(relativePath)
          .split(`/`)
          .filter((p) => !!p)
        const current = [pagesRoot]
        do {
          const maybeMiddleware = $filepath.join(...current, `+middleware.js`)
          // dbg({ maybeMiddleware, current })
          if (fs.existsSync(maybeMiddleware, 'file')) {
            route.middlewares.push(maybeMiddleware)
            // dbg(`middleware found`)
          }
          if (pathParts.length === 0) {
            break
          }
          current.push(pathParts.shift()!)
        } while (true)
      }

      {
        forEach(LOADER_METHODS, (method) => {
          const maybeLoad = $filepath.join(
            pagesRoot,
            $filepath.dir(route.relativePath),
            `+${method}.js`
          )
          if (fs.existsSync(maybeLoad)) {
            route.loaders[method] = maybeLoad
          }
        })
      }

      return route
    })
    .filter((r) => r.segments.length > 0)
  dbg({ routes })

  // dbg({ config })

  const cache: Cache = { routes, config }
  dbg({ cache })
  $app.store<Cache>().set(`pocketpages`, cache)
}
