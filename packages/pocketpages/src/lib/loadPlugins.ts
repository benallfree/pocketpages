import { omit } from '@s-libs/micro-dash'
import { error } from 'pocketbase-log'
import { globalApi } from 'src/lib/globalApi'
import {
  Cache,
  Plugin,
  PluginConfigItem,
  PluginConfigItemShortHand,
  PluginFactory,
  PluginFactoryConfig,
  PluginOptions,
} from 'src/lib/types'
import { dbg } from './debug'
import { pagesRoot } from './helpers'

const normalizePlugin = (
  plugin: PluginConfigItemShortHand
): PluginConfigItem => {
  if (typeof plugin === 'string') {
    return { debug: false, fn: loadFactory(plugin) }
  }
  if (typeof plugin === 'function') {
    return { debug: false, fn: plugin }
  }
  if (typeof plugin === 'object' && 'fn' in plugin) {
    return { debug: false, fn: plugin.fn!, ...plugin }
  }
  if (typeof plugin === 'object' && 'name' in plugin) {
    return {
      debug: false,
      ...omit(plugin, 'name'),
      fn: loadFactory(plugin.name),
    }
  }
  throw new Error('Invalid plugin config')
}

const loadFactory = (plugin: string) => {
  const factory = (() => {
    const module = require(plugin)
    return (module.default ?? module) as PluginFactory
  })()
  dbg(`factory`, { factory })
  return factory
}

export const loadPlugins = (cache: Cache): Plugin[] => {
  const { config, routes } = cache

  return [
    ...config.plugins.map((plugin) => {
      const normalizedPlugin = normalizePlugin(plugin)

      const extra = omit(normalizedPlugin, 'fn') as PluginOptions

      const factoryConfig: PluginFactoryConfig = {
        pagesRoot,
        config,
        globalApi,
        routes,
        dbg: extra.debug ? globalApi.dbg : dbg,
      }

      dbg(`loading plugin`, { factoryConfig, extra, plugin })
      try {
        return normalizedPlugin.fn(factoryConfig, extra)
      } catch (e) {
        error(`error loading plugin`, { plugin, error: e })
        throw e
      }
    }),
  ]
}
