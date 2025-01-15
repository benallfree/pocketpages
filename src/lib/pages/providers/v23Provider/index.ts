import type { IPagesProvider } from '../..'

export const v23Provider = (): IPagesProvider => ({
  boot: () => {
    onBootstrap((e) => {
      e.next()
      require(`${__hooks}/pocketpages.pb`).AfterBootstrapHandler()
    })

    routerUse((e) => {
      return require(`${__hooks}/pocketpages.pb`).v23MiddlewareWrapper(e)
    })
  },
})
