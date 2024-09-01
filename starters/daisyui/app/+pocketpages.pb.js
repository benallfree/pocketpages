onAfterBootstrap((e) => {
  return require(`../../../lib`).AfterBootstrapHandler(e)
})

routerUse((next) => {
  return require(`../../../lib`).MiddlewareHandler(next)
})
