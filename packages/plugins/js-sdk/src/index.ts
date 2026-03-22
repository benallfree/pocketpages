import PocketBase from 'pocketbase-js-sdk-jsvm'
import type {
  PagesRequest,
  PluginFactory,
  PluginOptionsBase,
} from 'pocketpages'

export type JSSdkPluginOptions = PluginOptionsBase & {
  host: string
}

export type PocketBaseClientOptions = {
  auth?: core.Record
  host: string
  request?: PagesRequest
}

const toPlainObject = (value: unknown) => JSON.parse(JSON.stringify(value))

const jsSdkPluginFactory: PluginFactory<JSSdkPluginOptions> = (
  config,
  extra
) => {
  const { globalApi } = config
  const { dbg } = globalApi

  const newClient = (host: string) => {
    const pb = new PocketBase(host)
    dbg(`created new PocketBase client for ${host}`)
    return pb
  }

  const pbCache = new Map<string, PocketBase>()

  const syncAuthStore = (
    pb: PocketBase,
    host: string,
    auth?: core.Record,
    authToken?: string
  ) => {
    if (!auth) {
      pb.authStore.clear()
      dbg(`cleared PocketBase auth store for ${host}`)
      return pb
    }

    const token = authToken ?? auth.newAuthToken()
    pb.authStore.save(token, toPlainObject(auth))
    dbg(`synced PocketBase auth store for ${host}: ${auth.id} ${token}`)
    return pb
  }

  globalApi.pb = (options?: Partial<PocketBaseClientOptions>) => {
    const host = options?.host ?? extra?.host ?? `http://localhost:8090`
    const auth = options?.auth ?? options?.request?.auth
    const authToken = options?.request?.authToken
    const key = `${host}-${auth?.id}`
    const cachedPb = pbCache.get(key)
    if (cachedPb) {
      return syncAuthStore(cachedPb, host, auth, authToken)
    }
    dbg(`creating new pb client with cache key: ${key}`)
    const pb = newClient(host)
    pbCache.set(key, pb)
    return syncAuthStore(pb, host, auth, authToken)
  }

  return {
    name: 'js-sdk',
  }
}

export default jsSdkPluginFactory
