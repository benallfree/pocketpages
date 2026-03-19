import PocketBase from 'pocketbase-js-sdk-jsvm'
import type {
  PagesRequest,
  PluginFactory,
  PluginOptionsBase,
} from 'pocketpages'

export type JSSdkPluginOptions = PluginOptionsBase & {
  host: string
  passRateLimitHeaders?: boolean
}

export type PocketBaseClientOptions = {
  auth?: core.Record
  host: string
  passRateLimitHeaders?: boolean
  request?: PagesRequest
  header?: (name: string) => string | undefined
  remoteIP?: string
}

const jsSdkPluginFactory: PluginFactory<JSSdkPluginOptions> = (
  config,
  extra
) => {
  const { globalApi } = config
  const { dbg } = globalApi

  const getTrustedProxyHeaderName = () => {
    try {
      const headers = (globalThis as any).$app?.settings?.()?.trustedProxy
        ?.headers as string[] | undefined
      if (!headers || headers.length === 0) {
        return undefined
      }
      return headers[0]
    } catch {
      return undefined
    }
  }

  const getRateLimitHeaderContext = (
    options?: Partial<PocketBaseClientOptions>
  ) => {
    const passRateLimitHeaders =
      options?.passRateLimitHeaders ?? extra?.passRateLimitHeaders ?? false
    if (!passRateLimitHeaders) {
      return undefined
    }

    const headerName = getTrustedProxyHeaderName()
    if (!headerName) {
      return undefined
    }

    const getHeader =
      options?.header ??
      (options?.request
        ? (name: string) => options.request?.header(name)
        : undefined)
    const remoteIP = options?.remoteIP ?? options?.request?.event?.remoteIP?.()
    const headerValue = getHeader?.(headerName) || remoteIP
    if (!headerValue) {
      return undefined
    }

    return {
      name: headerName,
      value: headerValue,
    }
  }

  const setRateLimitHeader = (
    pb: PocketBase,
    headerContext: ReturnType<typeof getRateLimitHeaderContext>
  ) => {
    if (!headerContext) {
      return
    }

    const existingBeforeSend = pb.beforeSend
    pb.beforeSend = function (url: string, options: any) {
      const nextOptions = {
        ...options,
        headers: Object.assign({}, options?.headers, {
          [headerContext.name]: headerContext.value,
        }),
      }

      if (existingBeforeSend) {
        return existingBeforeSend(url, nextOptions)
      }

      return { url, options: nextOptions }
    }
  }

  const newClient = (
    host: string,
    auth?: core.Record,
    authToken?: string,
    headerContext?: ReturnType<typeof getRateLimitHeaderContext>
  ) => {
    const pb = new PocketBase(host)
    setRateLimitHeader(pb, headerContext)
    if (auth) {
      dbg(`auth`, typeof auth, auth)
      const token = authToken ?? auth.newAuthToken()
      pb.authStore.save(token, JSON.parse(JSON.stringify(auth)))
      dbg(
        `created new PocketBase client for ${host} with saved auth: ${auth.id} ${token}`
      )
    } else {
      dbg(`created new PocketBase client for ${host}`)
    }
    return pb
  }

  const pbCache = new Map<string, PocketBase>()

  globalApi.pb = (options?: Partial<PocketBaseClientOptions>) => {
    const host = options?.host ?? extra?.host ?? `http://localhost:8090`
    const auth = options?.auth ?? options?.request?.auth
    const authToken = options?.request?.authToken
    const headerContext = getRateLimitHeaderContext(options)
    if (headerContext) {
      dbg(
        `creating uncached pb client for forwarded header ${headerContext.name}`
      )
      return newClient(host, auth, authToken, headerContext)
    }

    const key = `${host}-${auth?.id}`
    if (pbCache.has(key)) {
      return pbCache.get(key)
    }
    dbg(`creating new pb client for ${key}`)
    const pb = newClient(host, auth, authToken, headerContext)
    pbCache.set(key, pb)
    return pb
  }

  return {
    name: 'js-sdk',
  }
}

export default jsSdkPluginFactory
