import { forEach, merge } from '@s-libs/micro-dash'
import { dbg } from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { parseSlots, renderFile } from './ejs'
import { mkMeta, pagesRoot, safeLoad } from './helpers'
import { marked } from './marked'
import { fingerprint as applyFingerprint, parseRoute } from './parseRoute'
import { Cache, PagesContext } from './types'

export const MiddlewareHandler: echo.MiddlewareFunc = (next) => {
  const { routes, config } = $app.store<Cache>().get(`pocketpages`)

  dbg(`pocketpages handler`)

  return (c) => {
    dbg(`Pages middleware request: ${c.request().method} ${c.request().url}`)

    const { url } = c.request()

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

    const parsedRoute = parseRoute(urlPath, routes)
    const { route, params } = parsedRoute
    const { absolutePath, relativePath } = route

    /**
     * If it doesn't match any known route, pass it on
     */
    if (!parsedRoute) {
      // Otherwise, pass it on to PocketBase to handle
      dbg(`No route matched for ${urlPath}, passing on to PocketBase`)
      return next(c)
    }

    /**
     * If the file exists but is not a preprocessor file, skip PocketPages and serve statically
     */
    if (!route.shouldPreProcess) {
      dbg(`Serving static file ${absolutePath}`)
      return c.file(absolutePath)
    }

    /*
    At this point, we have a route PocketPages needs to handle.
    */
    try {
      dbg(`Found a matching route`, { parsedRoute })

      const context: PagesContext<any> = {
        ctx: c,
        params,
        print: (...args) =>
          args.forEach((arg) => {
            if (typeof arg === 'function') {
              c.response().write(arg.toString())
            } else if (typeof arg === 'object') {
              c.response().write(stringify(arg))
            } else if (typeof arg === 'number') {
              c.response().write(arg.toString())
            } else {
              c.response().write(`${arg}`)
            }
          }),
        formData: $apis.requestInfo(c).data,
        request: c.request(),
        response: c.response(),
        redirect: (path, status = 302) => c.redirect(status, path),
        slot: '',
        slots: {},
        asset: (path) => {
          const shortAssetPath = path.startsWith('/')
            ? path
            : $filepath.join(route.assetPrefix, path)
          const fullAssetPath = path.startsWith('/')
            ? path
            : $filepath.join(
                ...route.segments.slice(0, -2).map((s) => s.nodeName),
                route.assetPrefix,
                path
              )
          const assetRoute = parseRoute(fullAssetPath, routes)
          dbg({ fullAssetPath, shortAssetPath, assetRoute })
          if (!assetRoute) {
            if ($app.isDev()) {
              return `${shortAssetPath}?_r=${Date.now()}`
            }
            return `${shortAssetPath}`
          }
          return applyFingerprint(shortAssetPath, assetRoute.route.fingerprint)
        },
        meta: mkMeta(),
      }

      let data = {}
      route.middlewares.forEach((maybeMiddleware) => {
        dbg(`Executing middleware ${maybeMiddleware}`)
        data = merge(
          data,
          safeLoad(maybeMiddleware, () =>
            require(maybeMiddleware)({ ...context, data })
          )
        )
      })

      // Execute loaders
      {
        const methods = ['load', c.request().method.toLowerCase()]
        forEach(methods, (method) => {
          const loaderFname = route.loaders[method]
          if (!loaderFname) return
          dbg(`Executing loader ${loaderFname}`)
          data = merge(
            data,
            safeLoad(loaderFname, () =>
              require(loaderFname)({ ...context, data })
            )
          )
        })
      }

      context.data = data
      dbg(`Final context:`, { params: context.params, data: context.data })

      context.print = (...args) => {
        const result = args.map((arg) => {
          if (typeof arg === 'function') {
            return arg.toString()
          } else if (typeof arg === 'object') {
            return stringify(arg)
          } else if (typeof arg === 'number') {
            return arg.toString()
          } else {
            return `${arg}`
          }
        })
        return result.join(' ')
      }

      /**
       * Run the content through the EJS preprocessor
       */
      dbg(`Rendering file`, { absolutePath })
      var content = renderFile(absolutePath, context)

      /**
       * Run the content through the Markdown preprocessor
       */
      if (route.isMarkdown) {
        dbg(`Markdown file`, { absolutePath })
        const res = marked(content, context)
        content = res.content
        context.slots = parseSlots(content)
        context.slot = context.slots.default || content

        forEach(res.frontmatter, (value, key) => {
          context.meta(key, value)
        })
        dbg(`markdown`, { content })
      }

      /**
       * Attempt to parse the content as JSON
       */
      try {
        dbg(`Attempting to parse as JSON`)
        const parsed = JSON.parse(content)
        return c.json(200, parsed)
      } catch (e) {
        dbg(`Not JSON`)
      }

      /**
       * Render the content in the layout
       */
      route.layouts.forEach((layoutPath) => {
        content = renderFile(layoutPath, context)
      })

      // dbg(`Final result`, str)
      return c.html(200, content)
    } catch (e) {
      return c.html(
        500,
        `<html><body><h1>PocketPages Error</h1><pre><code>${e.stack.replaceAll(pagesRoot, '')}).content
        }</body></html>`
      )
    }
  }
}
