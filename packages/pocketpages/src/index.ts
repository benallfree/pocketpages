export * as log from 'pocketbase-log'
export { stringify } from 'pocketbase-stringify'
export { AfterBootstrapHandler } from './handlers/AfterBootstrapHandler'
export { MiddlewareHandler } from './handlers/MiddlewareHandler'
export { globalApi } from './lib/globalApi'
export { moduleExists } from './lib/helpers'
export * from './lib/types'

import { Cache } from './lib/types'
import { fingerprint } from './lib/fingerprint'

const isInHandler = typeof onBootstrap === 'undefined'

if (!isInHandler) {
  require(`pocketpages`).AfterBootstrapHandler()

  // TODO: Remove me
  routerAdd('GET', '/api/pocketpages', (e) => {
    return e.json(200, $app.store<Cache>().get(`pocketpages`))
  })

  const { routes } = $app.store<Cache>().get(`pocketpages`)

  routes.forEach((route) => {
    const nodeNames = route.segments.map(({ nodeName }) => nodeName)

    if (nodeNames[nodeNames.length - 1] === "index") {
      nodeNames.pop()
    }

    const paths = [
      '/' + nodeNames.join('/'),
      nodeNames.length > 0 ? '/' + nodeNames.join('/') + '/{$}' : '/{$}',
    ]

    if (route.isStatic) {
      nodeNames.push(fingerprint(nodeNames.pop() as string, route.fingerprint))
      paths.push('/' + nodeNames.join('/'))
    }

    paths.forEach((path) => {
      console.log(path)

      routerAdd('GET', path, (e) => {
        require(`pocketpages`).MiddlewareHandler(e)
      })

      if (route.loaders.delete) {
        routerAdd('DELETE', path, (e) => {
          require(`pocketpages`).MiddlewareHandler(e)
        })
      }

      if (route.loaders.post) {
        routerAdd('POST', path, (e) => {
          require(`pocketpages`).MiddlewareHandler(e)
        })
      }

      if (route.loaders.put) {
        routerAdd('PUT', path, (e) => {
          require(`pocketpages`).MiddlewareHandler(e)
        })
      }

      if (route.loaders.patch) {
        routerAdd('PATCH', path, (e) => {
          require(`pocketpages`).MiddlewareHandler(e)
        })
      }
    })
  })
}
