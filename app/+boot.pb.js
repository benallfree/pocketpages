/// <reference path="../pb_data/types.d.ts" />

onAfterBootstrap((e) => {
  return require(`./pocketpages`).AfterBootstrapHandler(e)
})

routerUse((next) => {
  return require(`./pocketpages`).MiddlewareHandler(next)
})
