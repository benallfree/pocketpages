/// <reference path="../../pb_data/types.d.ts" />

function PocketPages(next) {
  const dbg = (...objs) => {
    console.log(JSON.stringify(objs, null, 2))
  }

  dbg(`pocketpages`)

  const routesRoot = $filepath.join(__hooks, `..`, `routes`)

  dbg({ routesRoot })

  const { marked } = require(`${__hooks}/pocketpages/marked`)
  const ejs = require(`${__hooks}/pocketpages/ejs`)
  const { existsSync, readFileSync } = require(`${__hooks}/pocketpages/fs`)

  const files = [
    ...$filepath.glob($filepath.join(routesRoot, `**/*.ejs`)),
    ...$filepath.glob($filepath.join(routesRoot, `**/*.md`)),
    ...$filepath.glob($filepath.join(routesRoot, `*.ejs`)),
    ...$filepath.glob($filepath.join(routesRoot, `*.md`)),
  ].map((f) => f.replace(routesRoot, '').slice(1))

  dbg({ files })

  const routes = files.map((f) => {
    const parts = f.split('/')
    // dbg({ parts })
    return parts.map((part) => {
      return {
        nodeName: part,
        paramName: part.match(/\[.*\]/)
          ? part.replace(/\[(.*)\]/g, '$1')
          : null,
      }
    })
  })

  dbg({ routes })

  return (/** @type {echo.Context} */ c) => {
    const { url } = c.request()
    if (url?.path.startsWith('/_') || url?.path.startsWith(`/api`)) {
      return next(c) // proceed with the request chain
    }

    const params = {}

    const urlPath = url.path.slice(1)
    dbg({ urlPath })

    const matchedRoute = (() => {
      const exts = [
        `${urlPath}.ejs`,
        `${urlPath}.md`,
        `${urlPath}/index.ejs`,
        `${urlPath}/index.md`,
      ]
      for (const ext of exts) {
        const parts = ext.split('/').filter((p) => p)
        dbg({ parts })

        const routeCandidates = routes.filter((r) => r.length === parts.length)
        // dbg({ routeCandidates })
        for (const route of routeCandidates) {
          const matched = route.every((r, i) => {
            if (r.paramName) {
              params[r.paramName] = parts[i]
              return true
            }
            return r.nodeName === parts[i]
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
    dbg(`Found a matching route`, { matchedRoute })

    const fname = $filepath.join(
      routesRoot,
      ...matchedRoute.map((r) => r.nodeName)
    )
    dbg(`Entry point filename is`, { fname })

    const context = { ctx: c, params, dbg }

    const renderInLayout = (fname, slot) => {
      // dbg(`renderInLayout`, { fname, slot })
      if (!fname.startsWith(routesRoot)) {
        return slot
      }
      const tryFile = $filepath.join($filepath.dir(fname), `+layout.ejs`)
      const layoutExists = existsSync(tryFile)
      // dbg({ tryFile, layoutExists })
      if (layoutExists) {
        // dbg(`layout found`, { tryFile })
        try {
          const str = ejs.renderFile(tryFile, { ...context, slot })
          return renderInLayout($filepath.dir(tryFile), str)
        } catch (e) {
          throw new BadRequestError(`${e}`)
        }
      } else {
        // dbg(`layout not found`, { tryFile })
        return renderInLayout($filepath.dir(tryFile), slot)
      }
    }

    try {
      const str = (() => {
        if (fname.endsWith('.md')) {
          const md = readFileSync(fname)
          return marked(md)
        }
        if (fname.endsWith('.ejs')) {
          const str = ejs.renderFile(fname, context)
          try {
            const parsed = JSON.parse(str)
            c.json(200, parsed)
          } catch {
            return str
          }
        }
        return ''
      })()
      const finalOutput = renderInLayout(fname, str)
      return c.html(200, finalOutput)
    } catch (e) {
      throw new BadRequestError(`${e}`)
    }
  }
}

routerUse(PocketPages)
