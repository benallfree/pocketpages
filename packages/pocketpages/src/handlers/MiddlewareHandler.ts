import { merge } from '@s-libs/micro-dash'
import type { SerializeOptions } from 'cookie'
import * as cookie from 'cookie'
import { error } from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { fingerprint as applyFingerprint } from 'src/lib/fingerprint'
import { globalApi } from 'src/lib/globalApi'
import { default as parseUrl } from 'url-parse'
import { dbg } from '../lib/debug'
import { echo, mkMeta, mkResolve, pagesRoot } from '../lib/helpers'
import { loadPlugins } from '../lib/loadPlugins'
import { resolveRoute } from '../lib/resolveRoute'
import {
  Cache,
  MiddlewareLoaderFunc,
  PagesMethods,
  PagesMiddlewareFunc,
  PagesNextFunc,
  PagesRequest,
  PagesRequestContext,
  PagesResponse,
  Plugin,
  RedirectOptions,
} from '../lib/types'

const escapeXml = (unsafe: string = '') => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}

export const parseSlots = (input: string) => {
  const regex = /<!--\s*slot:(\w+)\s*-->([\s\S]*?)(?=<!--\s*slot:\w+\s*-->|$)/g
  const slots: Record<string, string> = {}
  let lastIndex = 0
  let cleanedContent = ''
  let match: RegExpExecArray | null

  while ((match = regex.exec(input)) !== null) {
    const name = match[1]
    const content = match[2]?.trim()
    if (name && content) {
      slots[name] = content
      // Add the content between the last match and this slot tag
      cleanedContent += input.slice(lastIndex, match.index)
      lastIndex = match.index + match[0].length
    }
  }
  // Add any remaining content after the last slot
  cleanedContent += input.slice(lastIndex)

  return {
    slots,
    content: cleanedContent.trim(),
  }
}

const defaultResponder: Plugin = {
  name: 'builtin',
  onResponse: ({ content, api, route }) => {
    const { response } = api
    response.html(200, content)
    return true
  },
}

export const MiddlewareHandler: PagesMiddlewareFunc = (e) => {
  const next: PagesNextFunc = () => {
    e.next()
  }
  if (!e.request) {
    dbg(`No request, passing on to PocketBase`)
    return next()
  }

  const { method, url } = e.request

  // dbg({ method, url })

  if (!url) {
    dbg(`No URL, passing on to PocketBase`)
    return next()
  }

  dbg(`Pages middleware request: ${method} ${url}`)

  const request: PagesRequest = {
    event: e,
    auth: e.auth,
    method: method.toUpperCase() as PagesMethods,
    url: globalApi.url(url.string()),
    formData: () => e.requestInfo().body,
    body: () => e.requestInfo().body,
    header: (name: string) => {
      return e.request?.header.get(name) || ''
    },
    cookies: (() => {
      let parsed: Record<string, any>

      const tryParseJson = (value: string | undefined) => {
        if (!value) return value
        try {
          return JSON.parse(value)
        } catch {
          return value
        }
      }

      const cookieFunc = <T = Record<string, any>>(name?: string): T => {
        if (!parsed) {
          const cookieHeader = request.header('Cookie')
          const rawParsed = cookie.parse(cookieHeader || '')
          // Parse all values once during initialization
          parsed = Object.fromEntries(
            Object.entries(rawParsed).map(([key, value]) => [
              key,
              tryParseJson(value),
            ])
          )
        }

        if (name === undefined) {
          return parsed as T
        }
        return parsed[name] as T
      }

      return cookieFunc as {
        <T = Record<string, any>>(): T
        <T>(name: string): T
      }
    })(),
  }

  // Set once a complete response (redirect, json, html, file) has been sent.
  // Middleware, loaders and rendering stop as soon as this is true, so a
  // guard that calls redirect() can't fall through to +post.js etc.
  let responded = false
  // Set once anything has been streamed with write()/echo (e.g. datastar SSE).
  let wroteBody = false

  const response: PagesResponse = {
    file: (path: string) => {
      responded = true
      return e.fileFS($os.dirFS($filepath.dir(path)), $filepath.base(path))
    },
    write: (s: string) => {
      wroteBody = true
      e.response.write(s)
    },
    redirect: (path: string, status = 302) => {
      responded = true
      e.redirect(status, path)
    },
    json: (status: number, data: any) => {
      responded = true
      e.json(status, data)
    },
    html: (status: number, data: string) => {
      responded = true
      e.html(status, data)
    },
    header: (name: string, value?: string) => {
      if (value === undefined) {
        return e.response.header().get(name) || ''
      }
      dbg(`header: ${name} ${value}`)
      e.response.header().set(name, value)
      return value
    },
    cookie: <T>(
      name: string,
      value: T,
      options: Partial<SerializeOptions> = {}
    ) => {
      const _options = {
        path: '/',
        ...options,
      }
      const stringifiedValue = (() => {
        if (typeof value !== 'string') {
          return stringify(value)
        }
        return value
      })()
      const serialized = cookie.serialize(name, stringifiedValue, _options)
      // Append, don't replace: a response may set several cookies.
      dbg(`cookie: ${serialized}`)
      e.response.header().add(`Set-Cookie`, serialized)
      return serialized
    },
  }

  const cache = $app.store<Cache>().get(`pocketpages`)
  const { routes, config } = cache

  const plugins = loadPlugins(cache)
  plugins.forEach((plugin) => plugin.onRequest?.({ request, response }))

  const resolvedRoute = resolveRoute(request.url, routes)

  /**
   * If it doesn't match any known route, pass it on
   */
  if (!resolvedRoute) {
    // Otherwise, pass it on to PocketBase to handle
    dbg(`No route matched for ${url}, passing on to PocketBase`)
    return next()
  }

  const { route, params } = resolvedRoute
  const { absolutePath, relativePath } = route

  try {
    /**
     * If the file exists but no plugin handles it, serve statically
     */
    if (route.isStatic) {
      dbg(`Serving static file ${absolutePath}`)
      return response.file(absolutePath)
    }

    /*
    At this point, we have a route PocketPages needs to handle.
    */
    // dbg(`Found a matching route`, { resolvedRoute })

    const api: PagesRequestContext<any> = {
      ...globalApi,
      params,
      echo: (...args) => {
        const s = echo(...args)
        response.write(s)
        dbg(`echo: ${s}`)
        return s
      },
      formData: request.formData,
      body: request.body,
      auth: request.auth,
      request,
      response,
      redirect: (path, _options) => {
        const options: RedirectOptions = {
          status: 302,
          message: '',
          ..._options,
        }
        if (!options.message) {
          return response.redirect(path, options.status)
        }
        // Use raw query strings here; globalApi.url() JSON-parses values,
        // which would mangle them on the way back out.
        const parsed = parseUrl(path, true)
        parsed.query.__flash = options.message
        response.redirect(parsed.toString(), options.status)
      },
      slot: '',
      slots: {},
      asset: (path) => {
        const shortAssetPath = path.startsWith('/')
          ? path
          : $filepath.join(route.assetPrefix, path)
        // Must be rooted: resolveRoute() strips the leading `/` from pathname.
        const fullAssetPath = path.startsWith('/')
          ? path
          : '/' +
            $filepath.toSlash(
              $filepath.join(
                ...route.segments.slice(0, -2).map((s) => s.nodeName),
                route.assetPrefix,
                path
              )
            )
        const assetRoute = resolveRoute(globalApi.url(fullAssetPath), routes)
        // dbg({ fullAssetPath, shortAssetPath, assetRoute })
        if (!assetRoute) {
          return `${shortAssetPath}`
        }
        return applyFingerprint(shortAssetPath, assetRoute.route.fingerprint)
      },
      meta: mkMeta(),
      resolve: mkResolve($filepath.dir(absolutePath)),
    }

    plugins.forEach((plugin) => plugin.onExtendContextApi?.({ api, route }))

    let data = {}
    let idx = 0

    _next()

    function _next(extra: object = {}) {
      if (responded) {
        dbg(`Response already sent by middleware, stopping`)
        return
      }
      data = merge(data, extra ?? {})

      if (idx >= route.middlewares.length) {
        return done()
      }

      const maybeMiddleware = route.middlewares[idx++] as string
      const middlewareFn: MiddlewareLoaderFunc = require(maybeMiddleware)

      dbg(`Executing middleware ${maybeMiddleware}`)
      if (middlewareFn.length < 2) {
        _next(middlewareFn({ ...api, data }))
      } else {
        middlewareFn({ ...api, data }, _next)
      }
    }

    function done() {
      // Execute loaders
      {
        const methods = ['load', method.toLowerCase()]
        for (const loaderMethod of methods) {
          const loaderFname =
            route.loaders[loaderMethod as keyof typeof route.loaders]
          if (!loaderFname) continue
          dbg(`Executing loader ${loaderFname}`)
          data = merge(data, require(loaderFname)({ ...api, data }) ?? {})
          if (responded) {
            dbg(`Response already sent by loader, stopping`)
            return
          }
        }
      }

      api.data = data
      // dbg(`Final api:`, { params: api.params, data: api.data })

      let content = plugins.reduce((content, plugin) => {
        return (
          plugin.onRender?.({
            content,
            api,
            route,
            filePath: absolutePath,
            plugins,
          }) ?? content
        )
      }, '')

      // The template sent its own response (redirect, json, ...)
      if (responded) return

      // If the content type is not text/html, we don't need to parse it or render it in a layout
      const contentType = response.header('Content-Type')
      dbg(`Content-Type: ${contentType}`)
      const mimeType = (contentType || '').split(';')[0]!.trim().toLowerCase()
      if (mimeType && mimeType !== 'text/html') {
        dbg(`Skipping layout for non-HTML content`, content)
        // Streamed bodies (e.g. datastar SSE via echo) are already written.
        if (!wroteBody) {
          responded = true
          e.string(200, content)
        }
        return
      }

      // Only objects/arrays are treated as JSON, so a page that happens to
      // render `42` or `true` is still served as HTML.
      const trimmed = content.trim()
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          dbg(`Attempting to parse as JSON`)
          const parsed = JSON.parse(trimmed)
          response.json(200, parsed)
          return
        } catch (e) {
          dbg(`Not JSON`)
        }
      }

      /**
       * Render the content in the layout
       */
      route.layouts.forEach((layoutPath) => {
        const res = parseSlots(content)
        api.slots = res.slots
        api.slot = res.slots.default || res.content
        content = plugins.reduce((content, plugin) => {
          return (
            plugin.onRender?.({
              content,
              api,
              route,
              filePath: layoutPath,
              plugins,
            }) ?? content
          )
        }, content)
      })

      for (const plugin of [...plugins, defaultResponder]) {
        if (plugin.onResponse?.({ content, api, route })) {
          return
        }
      }
      throw new Error(`No plugin handled the response`)
    }
  } catch (e) {
    error(e)

    if (e instanceof BadRequestError) {
      const message = config.debug ? `${e}` : 'Bad Request'
      return response.html(400, message)
    }

    // In production, don't leak error details or stack traces
    if (config.debug) {
      const message = (() => {
        const m = `${e}`
        if (m.includes('Value is not an object'))
          return `${m} - are you referencing a symbol missing from require() or resolve()?`
        return `${e}`
      })()
      const stackTrace =
        e instanceof Error
          ? e.stack
              ?.replaceAll(pagesRoot, '/' + $filepath.base(pagesRoot))
              .replaceAll(__hooks, '')
          : ''
      return response.html(
        500,
        `<html><body><h1>PocketPages Error</h1><pre><code>${escapeXml(message)}\n${escapeXml(stackTrace)}</code></pre></body></html>`
      )
    } else {
      // Generic error message in production
      return response.html(
        500,
        `<html><body><h1>Internal Server Error</h1><p>Something went wrong. Please try again later.</p></body></html>`
      )
    }
  }
}
