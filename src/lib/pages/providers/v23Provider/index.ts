import type { IPagesProvider } from '../..'

export const v23Provider = (): IPagesProvider => ({
  boot: () => {
    onBootstrap((e) => {
      require(`${__hooks}/pocketpages.pb`).AfterBootstrapHandler()
      e.next()
    })

    routerUse((e) => {
      return require(`${__hooks}/pocketpages.pb`).v23MiddlewareWrapper(e)
    })
  },
})
