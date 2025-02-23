export * as log from 'pocketbase-log'
export { stringify } from 'pocketbase-stringify'
export { AfterBootstrapHandler } from './handlers/AfterBootstrapHandler'
export { MiddlewareHandler } from './handlers/MiddlewareHandler'
export { globalApi } from './lib/globalApi'
export { moduleExists } from './lib/helpers'
export * from './lib/types'

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
