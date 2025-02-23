import PocketBase from 'pocketbase-js-sdk-jsvm'
import { PluginFactory, PluginOptionsBase } from 'pocketpages'

export type JSSdkPluginOptions = PluginOptionsBase & {
  host: string
}

const jsSdkPluginFactory: PluginFactory<JSSdkPluginOptions> = (
  config,
  extra
) => {
  const { global } = config
  const host = extra?.host ?? `http://localhost:8090`
  let pb: PocketBase | null = null
  global.pb = () => {
    if (pb) return pb
    pb = new PocketBase(host)
    return pb
  }

  return {}
}

export default jsSdkPluginFactory
