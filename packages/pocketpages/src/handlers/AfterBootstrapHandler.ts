import { forEach, keys } from '@s-libs/micro-dash'
import { error, info } from 'pocketbase-log'
import { fs } from 'pocketbase-node'
import { dbg } from '../lib/debug'
import { pagesRoot } from '../lib/helpers'
import { loadPlugins } from '../lib/loadPlugins'
import { Cache, PagesConfig, PagesInitializerFunc } from '../lib/types'
import { globalApi } from '../lib/globalApi'

export type Route = {
  relativePath: string
  absolutePath: string
  fingerprint: string
  assetPrefix: string
  segments: {
    nodeName: string
    paramName?: string
  }[]
  isStatic: boolean
  middlewares: string[]
  loaders: Partial<{
    load: string
    get: string
    post: string
    patch: string
    put: string
    delete: string
  }>
  layouts: string[]
}

export const LOADER_METHODS = [
  'load',
  'get',
  'post',
  'put',
  'patch',
  'delete',
] as const

export const AfterBootstrapHandler: PagesInitializerFunc = (e) => {
  info(`pocketpages startup`)

  if (!fs.existsSync(pagesRoot)) {
    throw new Error(
      `${pagesRoot} must exist. Did you launch pocketbase with --dir or --hooksDir`
    )
  }

  const VALID_CONFIG_KEYS = ['plugins', 'debug'] as const

  /**
   * Load the config file
   */
  const configPath = $filepath.join(pagesRoot, `+config.js`)
  // dbg({ configPath })
  const config: PagesConfig = {
    plugins: [`pocketpages-plugin-ejs`],
    debug: false,
    ...(() => {
      try {
        const mod = require(configPath)
        if (typeof mod === 'function') {
          return mod(globalApi) as Partial<PagesConfig>
        }
        return mod as Partial<PagesConfig>
      } catch (e) {
        error(`Error loading config file: ${e}`)
        return {}
      }
    })(),
  }
  if (config.debug) {
    $app.store().set('__pocketpages_debug', true)
  }
  keys(config).forEach((key) => {
    if (
      !VALID_CONFIG_KEYS.includes(key as (typeof VALID_CONFIG_KEYS)[number])
    ) {
      throw new Error(`Invalid config key: ${key}`)
    }
  })

  const physicalFiles: string[] = []
  $filepath.walkDir(pagesRoot, (path, d, err) => {
    const isDir = d.isDir()
    if (isDir) {
      return
    }
    physicalFiles.push(path.slice(pagesRoot.length + 1))
  })
  dbg({ physicalFiles })

  const routableFiles = physicalFiles.filter((f) => {
    // Check if file name starts with +
    const notRoutable = [/^[-+_]/]
    const pathParts = $filepath.toSlash(f).split('/')
    return !pathParts.some((part) => notRoutable.some((r) => r.test(part)))
  })

  dbg({ routableFiles })

  const plugins = loadPlugins({
    config,
    routes: [],
  })

  const routes: Route[] = routableFiles
    .map((relativePath) => {
      // dbg(`Examining route`, relativePath)
      const partsWithoutGroupNames = $filepath
        .toSlash(relativePath)
        .split('/')
        .filter((p) => !p.startsWith(`(`))
      const absolutePath = $filepath.join(pagesRoot, relativePath)
      // dbg({ relativePath, absolutePath, partsWithoutGroupNames })

      // dbg({ parts })
      const content = toString($os.readFile(absolutePath))
      const contentSha = $security.sha256(content)

      const route: Route = {
        relativePath,
        absolutePath,
        fingerprint: contentSha,
        assetPrefix:
          partsWithoutGroupNames[partsWithoutGroupNames.length - 2] ?? '',
        segments: partsWithoutGroupNames.map((part) => {
          return {
            nodeName: part,
            paramName: part.match(/\[.*\]/)
              ? part.replace(/\[(.*)\].*$/g, '$1')
              : undefined,
          }
        }),
        middlewares: [],
        layouts: [],
        loaders: {},
        isStatic: false,
      }

      route.isStatic = !plugins.some((p) =>
        p.handles?.({ route, filePath: absolutePath })
      )

      if (route.isStatic) {
        // If the route is not handled, it means it's a static file
        // and we can serve it directly
        return route
      }

      const lastSegment = route.segments[route.segments.length - 1]!
      lastSegment.nodeName = $filepath
        .base(lastSegment.nodeName)
        .slice(0, -$filepath.ext(lastSegment.nodeName).length)

      /**
       * Calculate layouts
       */
      {
        const pathParts = $filepath
          .toSlash($filepath.dir(relativePath))
          .split(`/`)
          .filter((node) => node !== '.')
          .filter((p) => !!p)
        // dbg(`layout`, { pathParts }, $filepath.dir(relativePath))
        do {
          const maybeLayouts = $filepath.glob(
            $filepath
              .join(pagesRoot, ...pathParts, `+layout.*`)
              // Escape glob [] syntax used in parameter routing
              .replace('[', '\\[')
              .replace(']', '\\]')
          )
          // dbg({ pathParts, maybeLayouts })
          if (maybeLayouts && maybeLayouts.length > 0) {
            if (maybeLayouts.length > 1) {
              throw new Error(`Multiple layouts found for ${relativePath}`)
            }
            const maybeLayout = maybeLayouts[0]!
            route.layouts.push(maybeLayout)
            // dbg(`layout found ${maybeLayout}`)
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
          .toSlash($filepath.dir(relativePath))
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
  // dbg({ routes })

  // dbg({ config })

  const cache: Cache = { routes, config }
  // dbg({ cache })
  $app.store<Cache>().set(`pocketpages`, cache)
}
