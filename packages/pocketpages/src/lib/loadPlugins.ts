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
import { dbg as systemDbg } from './debug'
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
  // dbg(`factory`, { factory })
  return factory
}

export const loadPlugins = (cache: Cache): Plugin[] => {
  const { config, routes } = cache

  return [
    ...config.plugins.map((pluginConfigItem) => {
      try {
        const normalizedPlugin = normalizePlugin(pluginConfigItem)

        const extra = omit(normalizedPlugin, 'fn') as PluginOptions

        // The factory may call dbg() before it returns the plugin, so the
        // label can't depend on the plugin object existing yet.
        let label =
          typeof pluginConfigItem === 'string'
            ? pluginConfigItem
            : typeof pluginConfigItem === 'object' &&
                typeof (pluginConfigItem as any).name === 'string'
              ? (pluginConfigItem as any).name
              : 'plugin'

        const factoryConfig: PluginFactoryConfig = {
          pagesRoot,
          config,
          globalApi,
          routes,
          dbg: (...args: any[]) =>
            extra.debug
              ? globalApi.dbg(`[${label}]`, ...args)
              : systemDbg(`[${label}]`, ...args),
        }
        const plugin = normalizedPlugin.fn(factoryConfig, extra)
        label = plugin.name
        systemDbg(`loaded plugin ${plugin.name}`)
        return plugin
      } catch (e) {
        error(`${e}`, pluginConfigItem)
        throw e
      }
    }),
  ]
}
