onAfterBootstrap((e) => {
  return require(`pocketpages`).AfterBootstrapHandler(e)
})

routerUse((next) => {
  return require(`pocketpages`).MiddlewareHandler(next)
})
