///. <reference path="../../../../../node_modules/pocketbase-jsvm/index-v22.d.ts" />

import type { IPagesProvider } from '../..'

export const v22Provider = (): IPagesProvider => ({
  boot: () => {
    onAfterBootstrap(() => {
      return require(`pocketpages/dist/main`).AfterBootstrapHandler()
    })

    routerUse((next) => {
      return require(`pocketpages/dist/main`).v22MiddlewareWrapper(next)
    })
  },
})
