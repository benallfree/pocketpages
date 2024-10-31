/// <reference path="../../../../../node_modules/pocketbase-jsvm/index-v23.d.ts" />

import type { IPagesProvider } from '../..'

export const v23Provider = (): IPagesProvider => ({
  boot: () => {
    onBootstrap((e) => {
      require(`pocketpages/dist/main`).AfterBootstrapHandler()
      e.next()
    })

    routerUse((e) => {
      return require(`pocketpages/dist/main`).v23MiddlewareWrapper(e)
    })
  },
})
