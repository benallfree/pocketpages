onAfterBootstrap((e) => {
  try {
    return require(`pocketpages`).AfterBootstrapHandler(e)
  } catch (e) {
    console.warn(e)
  }
  return require(`./lib`).AfterBootstrapHandler(e)
})

routerUse((next) => {
  try {
    return require(`pocketpages`).MiddlewareHandler(next)
  } catch (e) {
    console.warn(e)
  }
  return require(`./lib`).MiddlewareHandler(next)
})
