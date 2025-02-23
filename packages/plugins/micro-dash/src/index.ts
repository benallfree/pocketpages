import { forEach, keys, merge, pick, shuffle, values } from '@s-libs/micro-dash'

import { PluginFactory } from '../../../pocketpages/src/lib/types'

const microDashPluginFactory: PluginFactory = (config) => {
  const { globalApi } = config
  globalApi.forEach = forEach
  globalApi.keys = keys
  globalApi.values = values
  globalApi.merge = merge
  globalApi.pick = pick
  globalApi.shuffle = shuffle
  return {}
}

export default microDashPluginFactory
