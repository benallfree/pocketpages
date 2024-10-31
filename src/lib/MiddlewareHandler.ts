import { forEach, merge } from '@s-libs/micro-dash'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { default as URL } from 'url-parse'
import { parseSlots, renderFile } from './ejs'
import { echo, mkMeta, mkRequirePrivate, pagesRoot, safeLoad } from './helpers'
import { marked } from './marked'
import { fingerprint as applyFingerprint, parseRoute } from './parseRoute'
import { Cache, PagesApi } from './types'

const { dbg } = log

export const MiddlewareHandler: echo.MiddlewareFunc = (next) => {
  const { routes, config } = $app.store<Cache>().get(`pocketpages`)

  dbg(`pocketpages handler`)

  return (c) => {
    dbg(`Pages middleware request: ${c.request().method} ${c.request().url}`)

    const { url } = c.request()

    if (!url) {
      dbg(`No URL, passing on to PocketBase`)
      return next(c)
    }

    const urlPath = url.path.slice(1)

    /**
     * If the URL path starts with 'api' or '_', skip PocketPages
     */
    {
      const firstPart =
        urlPath
          .split('/')
          .filter((p) => p)
          .shift() || ''
      if (['api', '_'].includes(firstPart)) {
        return next(c)
      }
    }
    // dbg({ urlPath })

    const parsedRoute = parseRoute(urlPath, routes)

    /**
     * If it doesn't match any known route, pass it on
     */
    if (!parsedRoute) {
      // Otherwise, pass it on to PocketBase to handle
      dbg(`No route matched for ${urlPath}, passing on to PocketBase`)
      return next(c)
    }

    const { route, params } = parsedRoute
    const { absolutePath, relativePath } = route

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

      const api: PagesApi<any> = {
        ctx: c,
        params,
        echo: (...args) => {
          const s = echo(...args)
          c.response().write(s)
          return s
        },
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
        stringify,
        url: (path: string) => new URL(path, true),
        requirePrivate: mkRequirePrivate($filepath.dir(absolutePath)),
        ...log,
      }

      let data = {}
      route.middlewares.forEach((maybeMiddleware) => {
        dbg(`Executing middleware ${maybeMiddleware}`)
        data = merge(
          data,
          safeLoad(maybeMiddleware, () =>
            require(maybeMiddleware)({ ...api, data })
          )
        )
      })

      // Execute loaders
      {
        const methods = ['load', c.request().method.toLowerCase()]
        forEach(methods, (method) => {
          const loaderFname =
            route.loaders[method as keyof typeof route.loaders]
          if (!loaderFname) return
          dbg(`Executing loader ${loaderFname}`)
          data = merge(
            data,
            safeLoad(loaderFname, () => require(loaderFname)({ ...api, data }))
          )
        })
      }

      api.data = data
      dbg(`Final api:`, { params: api.params, data: api.data })

      api.echo = echo

      /**
       * Run the content through the EJS preprocessor
       */
      dbg(`Rendering file`, { absolutePath })
      var content = renderFile(absolutePath, api)

      /**
       * Run the content through the Markdown preprocessor
       */
      if (route.isMarkdown) {
        dbg(`Markdown file`, { absolutePath })
        const res = marked(content, api)
        content = res.content

        forEach(res.frontmatter, (value, key) => {
          api.meta(key, value)
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
        const res = parseSlots(content)
        api.slots = res.slots
        api.slot = res.slots.default || res.content
        content = renderFile(layoutPath, api)
      })

      // dbg(`Final result`, str)
      return c.html(200, content)
    } catch (e) {
      return c.html(
        500,
        `<html><body><h1>PocketPages Error</h1><pre><code>${
          e instanceof Error ? e.stack?.replaceAll(pagesRoot, '') : e
        }</code></pre></body></html>`
      )
    }
  }
}
