import * as log from 'pocketbase-log'
import { dbg } from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import ejs from 'pocketbase-ejs'
import { marked } from 'marked'
import { fs } from 'pocketbase-node'

const AfterBootstrapHandler = (e) => {
  dbg(`pocketpages startup`)

  const pagesRoot = $filepath.join(__hooks, `..`, `pages`)

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

  const routes = addressableFiles
    .map((f) => {
      // dbg(`Examining route`, f)
      const parts = f.split('/').filter((p) => !p.startsWith(`(`))
      // dbg({ parts })
      return {
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
    })
    .filter((r) => r.segments.length > 0)

  const data = { pagesRoot, routes }
  // dbg({ data })
  $app.cache().set(`pocketpages`, data)
}

function MiddlewareHandler(next) {
  const { pagesRoot, routes } = $app.cache().get(`pocketpages`)
  // dbg(`pocketpages handler`)

  /**
   * Load the config file
   */
  const configPath = $filepath.join(pagesRoot, `+config.js`)
  dbg({ configPath })
  const config = {
    preprocessorExts: ['.ejs', '.md'],
    ...(() => {
      try {
        return require(configPath)
      } catch (e) {
        return {}
      }
    })(),
  }
  dbg({ config })

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
    },
  })

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
      dbg(`setting cache`, { key, val })
      $app.cache().set(`ejs.${key}`, val)
    },
    get: function (key) {
      dbg(`getting cache`, { key })
      return $app.cache().get(`ejs.${key}`)
    },
    remove: function (key) {
      dbg(`removing cache`, { key })
      $app.cache().remove(`ejs.${key}`)
    },
    reset: function () {
      throw new Error(`resetting cache not supported`)
    },
  }

  return (/** @type {echo.Context} */ c) => {
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
    dbg({ urlPath })

    /**
     * If the URL path is a static file, serve it
     */
    const physicalFname = $filepath.join(pagesRoot, urlPath)
    dbg({ physicalFname })
    if (fs.existsSync(physicalFname)) {
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
        dbg(`Redirecting to ${urlPath}/`)
        return c.redirect(302, `/${urlPath}/`)
      }

      const requirePrivate = (path) =>
        require($filepath.join(pagesRoot, `_private`, path))
      type PagesContext<T> = {
        ctx: echo.Context
        params: Record<string, string>
        log: typeof log
        requirePrivate: (path: string) => any
        data?: T
        stringify: typeof stringify
      }
      const context: PagesContext<any> = {
        ctx: c,
        params,
        log,
        requirePrivate,
        stringify,
      }

      {
        const maybeLoad = $filepath.join(
          pagesRoot,
          $filepath.dir(matchedRoute.relativePath),
          `+load.js`
        )
        if (fs.existsSync(maybeLoad)) {
          context.data = safeLoad(maybeLoad, () => require(maybeLoad)(context))
        }
      }
      // dbg({ context })
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
              { cache: true }
            )
            return renderInLayout($filepath.dir(tryFile), str)
          })
        } else {
          // dbg(`layout not found`, { tryFile })
          return renderInLayout($filepath.dir(tryFile), slot)
        }
      }

      var str = safeLoad(fname, () =>
        ejs.renderFile(fname, { ...context, context }, { cache: true })
      )
      dbg(`***rendering`, { fname, str })
      if (fname.endsWith('.md')) {
        str = marked(str)
      }
      try {
        const parsed = JSON.parse(str)
        return c.json(200, parsed)
      } catch (e) {}
      str = renderInLayout(fname, str)
      dbg(`Final result`, str)
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

export { AfterBootstrapHandler, MiddlewareHandler }
