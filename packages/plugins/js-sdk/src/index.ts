import PocketBase from 'pocketbase-js-sdk-jsvm'
import { PagesRequest, PluginFactory, PluginOptionsBase } from 'pocketpages'

export type JSSdkPluginOptions = PluginOptionsBase & {
  host: string
}

export type PocketBaseClientOptions = {
  auth?: core.Record
  host: string
  request?: PagesRequest
}

const jsSdkPluginFactory: PluginFactory<JSSdkPluginOptions> = (
  config,
  extra
) => {
  const { globalApi } = config
  const { dbg } = globalApi

  const newClient = (host: string, auth?: core.Record) => {
    const pb = new PocketBase(host)
    if (auth) {
      dbg(`auth`, typeof auth, auth)
      const token = auth.newAuthToken()
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
    const key = `${host}-${auth?.id}`
    if (pbCache.has(key)) {
      return pbCache.get(key)
    }
    dbg(`creating new pb client for ${key}`)
    const pb = newClient(host, auth)
    pbCache.set(key, pb)
    return pb
  }

  return {}
}

export default jsSdkPluginFactory
