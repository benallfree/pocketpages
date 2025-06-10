import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { AfterBootstrapHandler } from './handlers/AfterBootstrapHandler'
import { MiddlewareHandler } from './handlers/MiddlewareHandler'
import { globalApi } from './lib/globalApi'
import { moduleExists } from './lib/helpers'
export type * from './lib/types'

const isInHandler = typeof onBootstrap === 'undefined'

if (!isInHandler) {
  onBootstrap((e) => {
    e.next()
    require(`pocketpages`).AfterBootstrapHandler(e)
  })

  routerUse((e) => {
    require(`pocketpages`).MiddlewareHandler(e)
  })
}
// Export all functions and modules using export = for CommonJS compatibility
// @ts-expect-error
export = {
  AfterBootstrapHandler,
  MiddlewareHandler,
  globalApi,
  log,
  moduleExists,
  stringify,
}
