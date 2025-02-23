import { forEach, merge } from '@s-libs/micro-dash'
import type { SerializeOptions } from 'cookie'
import * as cookie from 'cookie'
import { error, info } from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { fingerprint as applyFingerprint } from 'src/lib/fingerprint'
import { globalApi } from 'src/lib/globalApi'
import type { PagesResponse } from 'src/lib/types'
import { default as parse, default as URL } from 'url-parse'
import { setAuthFromHeaderOrCookie } from '../lib/auth'
import { dbg } from '../lib/debug'
import { parseSlots, renderFile } from '../lib/ejs'
import { echo, mkMeta, mkResolve, pagesRoot } from '../lib/helpers'
import { marked } from '../lib/marked'
import { resolveRoute } from '../lib/resolveRoute'
import {
  AuthData,
  AuthOptions,
  Cache,
  OAuth2ProviderInfo,
  OAuth2RequestOptions,
  OAuth2SignInOptions,
  PagesMethods,
  PagesMiddlewareFunc,
  PagesNextFunc,
  PagesRequest,
  PagesRequestContext,
  RedirectOptions,
} from '../lib/types'

export type SseFilter = (clientId: string, client: any) => boolean

export const MiddlewareHandler: PagesMiddlewareFunc = (e) => {
  const next: PagesNextFunc = () => {
    e.next()
  }
  if (!e.request) {
    dbg(`No request, passing on to PocketBase`)
    return next()
  }

  if (!e.request.url) {
    dbg(`No URL, passing on to PocketBase`)
    return next()
  }

  const request: PagesRequest = {
    auth: e.auth,
    method: e.request.method.toUpperCase() as PagesMethods,
    url: parse(e.request.url.toString()),
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

  const response: PagesResponse = {
    file: (path: string) => {
      return e.fileFS($os.dirFS($filepath.dir(path)), $filepath.base(path))
    },
    write: (s: string) => {
      e.response.write(s)
    },
    redirect: (path: string, status = 302) => {
      e.redirect(status, path)
    },
    json: (status: number, data: any) => {
      e.json(status, data)
    },
    html: (status: number, data: string) => {
      e.html(status, data)
    },
    header: (name: string, value?: string) => {
      if (value === undefined) {
        return e.response.header().get(name) || ''
      }
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
      response.header(`Set-Cookie`, serialized)
      return serialized
    },
  }

  setAuthFromHeaderOrCookie(request)

  const { routes, config } = $app.store<Cache>().get(`pocketpages`)

  const { method, url } = request

  dbg(`pocketpages handler`)

  dbg(`Pages middleware request: ${method} ${url}`)

  const resolvedRoute = resolveRoute(url, routes)

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

  /**
   * If the file exists but is not a preprocessor file, skip PocketPages and serve statically
   */
  if (route.isStatic) {
    dbg(`Serving static file ${absolutePath}`)
    return response.file(absolutePath)
  }

  /*
    At this point, we have a route PocketPages needs to handle.
    */
  try {
    dbg(`Found a matching route`, { resolvedRoute })

    const DefaultSseFilter: SseFilter = (clientId: string, client: any) => {
      return api.auth?.id ? client.get('auth')?.id === api.auth?.id : true
    }

    const deferredSse = {
      topic: '',
      filter: DefaultSseFilter,
    }

    const _sseSend = (
      name: string,
      data: string,
      filter: SseFilter = DefaultSseFilter
    ) => {
      const payload = new SubscriptionMessage({
        name,
        data,
      })

      const clients = $app.subscriptionsBroker().clients()

      const filteredClients = Object.entries(clients).filter(
        ([clientId, client]) =>
          client.hasSubscription(name) && filter(clientId, client)
      )

      filteredClients.forEach(([clientId, client]) => {
        client.send(payload)
      })
    }

    const api: PagesRequestContext<any> = {
      ...globalApi,
      params,
      echo: (...args) => {
        const s = echo(...args)
        response.write(s)
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
        const parsed = globalApi.url(path)
        parsed.query.__flash = options.message
        response.redirect(parsed.toString(), options.status)
      },
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
        const assetRoute = resolveRoute(new URL(fullAssetPath), routes)
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
      resolve: mkResolve($filepath.dir(absolutePath)),
      registerWithPassword: (
        email: string,
        password: string,
        options?: Partial<AuthOptions>
      ) => {
        globalApi.createUser(email, password, options)
        const authData = api.signInWithPassword(email, password, options)
        return authData
      },
      signInWithPassword: (
        email: string,
        password: string,
        options?: Partial<AuthOptions>
      ) => {
        const authData = globalApi
          .pb()
          .collection(options?.collection ?? 'users')
          .authWithPassword(email, password) as AuthData

        api.signInWithToken(authData.token)
        return authData
      },
      signInAnonymously: (options?: Partial<AuthOptions>) => {
        const { user, email, password } = globalApi.createAnonymousUser()

        const authData = api.signInWithPassword(email, password, options)
        return authData
      },
      signInWithOTP: (
        otpId: string,
        password: string,
        options?: Partial<AuthOptions>
      ) => {
        const pb = globalApi.pb()
        const authData = pb
          .collection(options?.collection ?? 'users')
          .authWithOTP(otpId, password.toString())
        api.signInWithToken(authData.token)
        // TODO set user to verfied
        return authData as AuthData
      },
      requestOAuth2Login: (
        providerName: string,
        options?: Partial<OAuth2RequestOptions>
      ) => {
        const pb = globalApi.pb()
        const methods = pb
          .collection(options?.collection ?? 'users')
          .listAuthMethods()

        const { providers } = methods.oauth2

        const provider = providers.find((p) => p.name === providerName)

        if (!provider) {
          throw new Error(`Provider ${providerName} not found`)
        }

        const redirectUrl = `${$app.settings().meta.appURL}${options?.redirectPath ?? '/auth/oauth/confirm'}`

        const authUrl = provider.authURL + redirectUrl

        response.cookie(options?.cookieName ?? 'pp_oauth_state', {
          ...globalApi.pick(
            provider,
            'name',
            'state',
            'codeChallenge',
            'codeVerifier'
          ),
          redirectUrl,
        })

        if (options?.autoRedirect ?? true) {
          response.redirect(authUrl)
        }
        return authUrl
      },
      signInWithOAuth2: (
        state: string,
        code: string,
        options?: Partial<OAuth2SignInOptions>,
        _storedProviderInfo?: OAuth2ProviderInfo
      ) => {
        const storedProvider =
          _storedProviderInfo ??
          api.request.cookies<OAuth2ProviderInfo>(
            options?.cookieName ?? 'pp_oauth_state'
          )

        if (!storedProvider) {
          throw new Error('No stored provider info found')
        }

        if (storedProvider.state !== state) {
          throw new Error(`State parameters don't match.`)
        }

        const authData = globalApi
          .pb()
          .collection(options?.collection ?? 'users')
          .authWithOAuth2Code(
            storedProvider.name,
            code,
            storedProvider.codeVerifier,
            storedProvider.redirectUrl,
            // pass any optional user create data
            {
              emailVisibility: false,
            }
          )

        api.signInWithToken(authData.token)
        return authData as AuthData
      },
      signOut: () => {
        response.cookie(`pb_auth`, '')
      },
      signInWithToken: (token: string) => {
        response.cookie(`pb_auth`, token)
      },
      send: (
        topic: string,
        messageOrFilter: string | SseFilter = DefaultSseFilter,
        filter: SseFilter = DefaultSseFilter
      ) => {
        const isDeferred = typeof messageOrFilter === 'function'
        if (isDeferred) {
          deferredSse.topic = topic
          deferredSse.filter = messageOrFilter
          info('Deferred SSE', { deferredSse })
          return
        }
        return _sseSend(topic, messageOrFilter, filter)
      },
    }

    let data = {}
    route.middlewares.forEach((maybeMiddleware) => {
      dbg(`Executing middleware ${maybeMiddleware}`)
      data = merge(data, require(maybeMiddleware)({ ...api, data }))
    })

    // Execute loaders
    {
      const methods = ['load', method.toLowerCase()]
      forEach(methods, (method) => {
        const loaderFname = route.loaders[method as keyof typeof route.loaders]
        if (!loaderFname) return
        dbg(`Executing loader ${loaderFname}`)
        data = merge(data, require(loaderFname)({ ...api, data }))
      })
    }

    api.data = data
    dbg(`Final api:`, { params: api.params, data: api.data })

    //@ts-ignore
    delete api.echo

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

    if (deferredSse.topic) {
      _sseSend(deferredSse.topic, JSON.stringify(content), deferredSse.filter)
      return response.json(200, { sse: 'ok' })
    }

    // dbg(`Final result`, str)
    return response.html(200, content)
  } catch (e) {
    error(e)
    const message = (() => {
      const m = `${e}`
      if (m.includes('Value is not an object'))
        return `${m} - are you referencing a symbol missing from require() or resolve()?`
      return `${e}`
    })()
    if (e instanceof BadRequestError) {
      return response.html(400, message)
    }
    return response.html(
      500,
      `<html><body><h1>PocketPages Error</h1><pre><code>${message}\n${
        e instanceof Error
          ? e.stack
              ?.replaceAll(pagesRoot, '/' + $filepath.base(pagesRoot))
              .replaceAll(__hooks, '')
          : ''
      }</code></pre></body></html>`
    )
  }
}
