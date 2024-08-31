/// <reference path="../../pb_data/types.d.ts" />

onAfterBootstrap((e) => {
  const { dbg } = require(`${__hooks}/pocketpages/log`)

  dbg(`pocketpages startup`)

  const pagesRoot = $filepath.join(__hooks, `pages`)

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
})

function PocketPages(next) {
  const { dbg } = require(`${__hooks}/pocketpages/log`)
  const stringify = require(`${__hooks}/pocketpages/safe-stable-stringify`)

  const { pagesRoot, routes } = $app.cache().get(`pocketpages`)
  // dbg(`pocketpages handler`)

  const { existsSync, readFileSync } = require(`${__hooks}/pocketpages/fs`)
  const { marked } = require(`${__hooks}/pocketpages/marked`)

  marked.use({
    useNewRenderer: true,
    renderer: {
      heading({ tokens, depth }) {
        const id = tokens[0].text
          .toLowerCase() // Convert to lowercase
          .trim() // Remove leading/trailing spaces
          .replace(/[^a-z0-9\-_ ]/g, '') // Remove invalid characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        // dbg({ tokens, depth, id })
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`
      },
    },
  })
  const ejs = require(`${__hooks}/pocketpages/ejs`)
  const oldCompile = ejs.compile
  ejs.compile = (template, opts) => {
    const fn = oldCompile(template, { ...opts })

    if ($filepath.ext(opts.filename) === '.md') {
      return (data) => {
        // dbg(`***compiling markdown ${opts.filename}`, { data, opts }, fn(data))
        return marked(fn(data))
      }
    }
    return fn
  }

  return (/** @type {echo.Context} */ c) => {
    const safeLoad = (fname, handler) => {
      try {
        return handler()
      } catch (e) {
        throw new Error(`${fname} failed to load with: ${e.stack}`)
      }
    }

    try {
      const { url } = c.request()
      const params = {}

      const urlPath = url.path.slice(1)
      dbg({ urlPath })

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

      /**
       * If the URL path is a static file, serve it
       */
      const physicalFname = $filepath.join(pagesRoot, urlPath)
      if (existsSync(physicalFname)) {
        // dbg(`Found a file at ${physicalFname}`)
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
          dbg({ parts })

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

      if (!matchedRoute) {
        return next(c)
      }
      dbg(`Found a matching route`, { matchedRoute, params })

      const fname = $filepath.join(pagesRoot, matchedRoute.relativePath)
      dbg(`Entry point filename is`, { fname })

      const requirePrivate = (path) =>
        require($filepath.join(pagesRoot, `_private`, path))
      const context = { ctx: c, params, dbg, requirePrivate, stringify }
      context.context = context

      {
        const maybeLoad = $filepath.join(
          pagesRoot,
          $filepath.dir(matchedRoute.relativePath),
          `+load.js`
        )
        if (existsSync(maybeLoad)) {
          context.data = safeLoad(maybeLoad, () => require(maybeLoad)(context))
        }
      }
      dbg({ context })
      const renderInLayout = (fname, slot) => {
        // dbg(`renderInLayout`, { fname, slot })
        if (!fname.startsWith(pagesRoot)) {
          return slot
        }
        const tryFile = $filepath.join($filepath.dir(fname), `+layout.ejs`)
        const layoutExists = existsSync(tryFile)
        // dbg({ tryFile, layoutExists })
        if (layoutExists) {
          // dbg(`layout found`, { tryFile })
          return safeLoad(tryFile, () => {
            const str = ejs.renderFile(tryFile, { ...context, slot })
            return renderInLayout($filepath.dir(tryFile), str)
          })
        } else {
          // dbg(`layout not found`, { tryFile })
          return renderInLayout($filepath.dir(tryFile), slot)
        }
      }

      var str = safeLoad(fname, () => ejs.renderFile(fname, context))
      // dbg(`***rendering`, { fname, str })
      if (fname.endsWith('.md')) {
        str = marked(str)
      }
      try {
        const parsed = JSON.parse(str)
        return c.json(200, parsed)
      } catch (e) {}
      str = renderInLayout(fname, str)
      return c.html(200, str)
    } catch (e) {
      return c.html(
        500,
        `<html><body><h1>PocketPages Error</h1>${marked(`\`\`\`\n${e.stack.replaceAll(pagesRoot, '')}\`\`\``)}</body></html>`
      )
    }
  }
}

routerUse(PocketPages)
