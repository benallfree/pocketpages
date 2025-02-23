import { forEach, keys, merge, pick, shuffle, values } from '@s-libs/micro-dash'

import { PluginFactory } from '../../../pocketpages/src/lib/types'

const microDashPluginFactory: PluginFactory = (config) => {
  const { global } = config
  global.forEach = forEach
  global.keys = keys
  global.values = values
  global.merge = merge
  global.pick = pick
  global.shuffle = shuffle
  return {}
}

export default microDashPluginFactory
