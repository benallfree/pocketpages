onAfterBootstrap((e) => {
  return require(`pocketpages/dist/main`).AfterBootstrapHandler(e)
})

routerUse((next) => {
  return require(`pocketpages/dist/main`).MiddlewareHandler(next)
})
