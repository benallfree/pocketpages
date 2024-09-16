import * as log from 'pocketbase-log'
import { dbg } from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import ejs from 'pocketbase-ejs'
import { marked } from 'marked'
import { fs, path } from 'pocketbase-node'
import { merge } from '@s-libs/micro-dash'
import URL from 'url-parse'
import URLParse from 'url-parse'

export type PageDataLoaderFunc = (
  context: Omit<PagesContext<any>, 'data'>
) => object

export type PagesContext<T> = {
  ctx: echo.Context
  params: Record<string, string>
  log: typeof log
  asset: (path: string) => string
  url: (path: string) => URLParse<Record<string, string>>
  requirePrivate: (path: string) => any
  data?: T
  stringify: typeof stringify
}

export type PagesConfig = {
  preprocessorExts: string[]
}

type Route = {
  relativePath: string
  segments: {
    nodeName: string
    paramName?: string
  }[]
}

type Cache = { pagesRoot: string; routes: Route[] }

const pagesRoot = $filepath.join(__hooks, `pages`)

const oldCompile = ejs.compile
ejs.compile = (template, opts) => {
  const fn = oldCompile(template, { ...opts })

  if ($filepath.ext(opts.filename) === '.md') {
    return (data) => {
      // dbg(`***compiling markdown ${opts.filename}`, { data, opts }, fn(data))
      const res = marked(fn(data))
      // dbg(`***compiled markdown ${opts.filename}`, { data, opts, res })
      return res
    }
  }
  return fn
}
ejs.cache = {
  set: function (key, val) {
    // dbg(`setting cache`, { key, val })
    $app.store().set(`ejs.${key}`, val)
  },
  get: function (key) {
    // dbg(`getting cache`, { key })
    return $app.store().get(`ejs.${key}`)
  },
  remove: function (key) {
    // dbg(`removing cache`, { key })
    $app.store().remove(`ejs.${key}`)
  },
  reset: function () {
    throw new Error(`resetting cache not supported`)
  },
}

const oldResolveInclude = ejs.resolveInclude
ejs.resolveInclude = function (name: string, filename: string, isDir: boolean) {
  if (filename === '/') {
    return path.resolve(pagesRoot, name)
  }
  return oldResolveInclude(name, filename, isDir)
}

const asset = (path: string) => {
  if (!$app.isDev()) return path
  const parsed = new URL(path, true)
  parsed.query.__cache = Date.now().toString()
  return parsed.toString()
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const id = tokens[0].raw
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading/trailing spaces
        .replace(/[^a-z0-9\-_ ]/g, '') // Remove invalid characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      // dbg({ tokens, depth, id })
      return `<h${depth} id="${id}">${this.parser.parseInline(
        tokens
      )}</h${depth}>\n`
    },
    image({ href, title, text }) {
      return `<img src="${asset(href)}" alt="${text}" title="${title}" />`
    },
  },
})

export const AfterBootstrapHandler = (e: core.BootstrapEvent) => {
  dbg(`pocketpages startup`)

  if (!fs.existsSync(pagesRoot)) {
    throw new Error(
      `${pagesRoot} must exist. Did you launch pocketbase with --hooksDir`
    )
  }

  const physicalFiles = []
  $filepath.walkDir(pagesRoot, (path, d, err) => {
    const isDir = d.isDir()
    if (isDir) {
      return
    }
    physicalFiles.push(path.slice(pagesRoot.length + 1))
  })

  const addressableFiles = physicalFiles.filter(
    (f) =>
      !$filepath.base(f).startsWith(`+`) && !$filepath.base(f).startsWith(`_`)
  )

  // dbg({ addressableFiles })

  const routes: Route[] = addressableFiles
    .map((f) => {
      // dbg(`Examining route`, f)
      const parts = f.split('/').filter((p) => !p.startsWith(`(`))
      // dbg({ parts })
      const route: Route = {
        relativePath: f,
        segments: parts.map((part) => {
          return {
            nodeName: part,
            paramName: part.match(/\[.*\]/)
              ? part.replace(/\[(.*)\]/g, '$1')
              : undefined,
          }
        }),
      }
      return route
    })
    .filter((r) => r.segments.length > 0)

  const cache: Cache = { pagesRoot, routes }
  // dbg({ data })
  $app.store<Cache>().set(`pocketpages`, cache)
}

export const MiddlewareHandler: echo.MiddlewareFunc = (next) => {
  const { pagesRoot, routes } = $app.store<Cache>().get(`pocketpages`)
  // dbg(`pocketpages handler`)

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
  // dbg({ config })

  return (c) => {
    dbg(`Pages middleware request: ${c.request().method} ${c.request().url}`)
    const safeLoad = (fname, handler) => {
      try {
        return handler()
      } catch (e) {
        throw new Error(`${fname} failed to load with: ${e.stack}`)
      }
    }

    const { url } = c.request()
    const params = {}

    const urlPath = url.path.slice(1)

    /**
     * If the URL path starts with 'api' or '_', skip PocketPages
     */
    {
      const firstPart = urlPath
        .split('/')
        .filter((p) => p)
        .shift()
      if (['api', '_'].includes(firstPart)) {
        return next(c)
      }
    }
    // dbg({ urlPath })

    /**
     * If the URL path is a static file, serve it
     */
    const physicalFname = $filepath.join(pagesRoot, urlPath)
    // dbg({ physicalFname })
    if (fs.existsSync(physicalFname, 'file')) {
      dbg(`Found a file at ${physicalFname}`)
      return c.file(physicalFname)
    }

    const matchedRoute = (() => {
      const tryFnames = [
        `${urlPath}`,
        `${urlPath}.ejs`,
        `${urlPath}.md`,
        `${urlPath}/index.ejs`,
        `${urlPath}/index.md`,
      ]
      // dbg({ tryFnames })
      for (const maybeFname of tryFnames) {
        const parts = maybeFname.split('/').filter((p) => p)
        // dbg({ parts })

        // dbg({ routes })
        const routeCandidates = routes.filter(
          (r) => r.segments.length === parts.length
        )
        // dbg({ routeCandidates })
        for (const route of routeCandidates) {
          const matched = route.segments.every((segment, i) => {
            if (segment.paramName) {
              params[segment.paramName] = parts[i]
              return true
            }
            return segment.nodeName === parts[i]
          })
          if (matched) {
            // dbg(`Matched route`, route)
            return route
          }
        }
      }
      return null
    })()

    /**
     * If it doesn't match any known route, pass it on
     */
    if (!matchedRoute) {
      return next(c)
    }
    try {
      dbg(`Found a matching route`, { matchedRoute, params })

      const fname = $filepath.join(pagesRoot, matchedRoute.relativePath)

      dbg(`Entry point filename is ${fname}`)

      /**
       * If the file exists but is not a preprocessor file, skip PocketPages and serve statically
       */
      const allowedExts = config.preprocessorExts
      const ext = $filepath.ext(fname)

      if (!allowedExts.includes(ext)) {
        dbg(`Not a preprocessor file, serving statically`)
        return c.file(fname)
      }

      const [nodeName] = $filepath.base(fname).split('.')
      if (
        urlPath.length > 0 &&
        nodeName === 'index' &&
        !urlPath.endsWith('/')
      ) {
        // dbg(`Redirecting to ${urlPath}/`)
        return c.redirect(302, `/${urlPath}/`)
      }

      const requirePrivate = (path) =>
        require($filepath.join(pagesRoot, `_private`, path))

      const context: PagesContext<any> = {
        ctx: c,
        params,
        log,
        asset,
        url: (path: string) => new URL(path, true),
        requirePrivate,
        stringify,
      }

      let data = {}
      {
        const pathParts = $filepath
          .dir(fname.slice(pagesRoot.length + 1))
          .split(`/`)
          .filter((p) => !!p)
        dbg(`middleware`, { pathParts })
        const current = [pagesRoot]

        do {
          const maybeMiddleware = $filepath.join(...current, `+middleware.js`)
          dbg({ maybeMiddleware })
          if (fs.existsSync(maybeMiddleware, 'file')) {
            dbg(`middleware found`)
            data = merge(
              data,
              safeLoad(maybeMiddleware, () =>
                require(maybeMiddleware)({ ...context, data })
              )
            )
            dbg(`data after ${maybeMiddleware}`, data)
          }
          if (pathParts.length === 0) {
            break
          }
          current.push(pathParts.shift())
        } while (true)
        dbg(`final middleware data`, data)
      }
      {
        const maybeLoad = $filepath.join(
          pagesRoot,
          $filepath.dir(matchedRoute.relativePath),
          `+load.js`
        )
        if (fs.existsSync(maybeLoad)) {
          data = merge(
            data,
            safeLoad(maybeLoad, () => require(maybeLoad)({ ...context, data }))
          )
        }
      }
      context.data = data
      dbg(`Final context:`, { params: context.params, data: context.data })
      const renderInLayout = (fname, slot) => {
        // dbg(`renderInLayout`, { fname, slot })
        if (!fname.startsWith(pagesRoot)) {
          return slot
        }
        const tryFile = $filepath.join($filepath.dir(fname), `+layout.ejs`)
        const layoutExists = fs.existsSync(tryFile)
        // dbg({ tryFile, layoutExists })
        if (layoutExists) {
          // dbg(`layout found`, { tryFile })
          return safeLoad(tryFile, () => {
            const str = ejs.renderFile(
              tryFile,
              { ...context, context, slot },
              { cache: $app.isDev() }
            )
            return renderInLayout($filepath.dir(tryFile), str)
          })
        } else {
          // dbg(`layout not found`, { tryFile })
          return renderInLayout($filepath.dir(tryFile), slot)
        }
      }

      var str = safeLoad(fname, () =>
        ejs.renderFile(fname, { ...context, context }, { cache: $app.isDev() })
      )
      // dbg(`***rendering`, { fname, str })
      if (fname.endsWith('.md')) {
        str = marked(str)
      }
      try {
        const parsed = JSON.parse(str)
        return c.json(200, parsed)
      } catch (e) {}
      str = renderInLayout(fname, str)
      // dbg(`Final result`, str)
      return c.html(200, str)
    } catch (e) {
      return c.html(
        500,
        `<html><body><h1>PocketPages Error</h1>${marked(
          `\`\`\`\n${e.stack.replaceAll(pagesRoot, '')}\`\`\``
        )}</body></html>`
      )
    }
  }
}
