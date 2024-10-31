import { forEach, merge } from '@s-libs/micro-dash'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { default as URL } from 'url-parse'
import { parseSlots, renderFile } from './ejs'
import { echo, mkMeta, mkrequire, pagesRoot, safeLoad } from './helpers'
import { marked } from './marked'
import { PagesMiddlewareFunc } from './pages'
import { fingerprint as applyFingerprint, parseRoute } from './parseRoute'
import { Cache, PagesApi } from './types'

const { dbg } = log

export const MiddlewareHandler: PagesMiddlewareFunc = (
  request,
  response,
  next
) => {
  const { routes, config } = $app.store<Cache>().get(`pocketpages`)

  const { method, url } = request

  dbg(`pocketpages handler`)

  dbg(`Pages middleware request: ${method} ${url}`)

  const urlPath = url.pathname.slice(1)

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
      return next()
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
    return next()
  }

  const { route, params } = parsedRoute
  const { absolutePath, relativePath } = route

  /**
   * If the file exists but is not a preprocessor file, skip PocketPages and serve statically
   */
  if (!route.shouldPreProcess) {
    dbg(`Serving static file ${absolutePath}`)
    return response.file(absolutePath)
  }

  /*
    At this point, we have a route PocketPages needs to handle.
    */
  try {
    dbg(`Found a matching route`, { parsedRoute })

    const api: PagesApi<any> = {
      params,
      echo: (...args) => {
        const s = echo(...args)
        response.write(s)
        return s
      },
      formData: request.formData,
      request,
      response,
      redirect: response.redirect,
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
      require: mkrequire($filepath.dir(absolutePath)),
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
      const methods = ['load', method]
      forEach(methods, (method) => {
        const loaderFname = route.loaders[method as keyof typeof route.loaders]
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
      return response.json(200, parsed)
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
    return response.html(200, content)
  } catch (e) {
    return response.html(
      500,
      `<html><body><h1>PocketPages Error</h1><pre><code>${
        e instanceof Error ? e.stack?.replaceAll(pagesRoot, '') : e
      }</code></pre></body></html>`
    )
  }
}
