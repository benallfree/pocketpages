onAfterBootstrap((e) => {
  try {
    return require(`pocketpages`).AfterBootstrapHandler(e)
  } catch (e) {
    console.log(
      `WARNING: pocketpages module not found, attempting to load local`,
    )
  }
  return require(`./lib`).AfterBootstrapHandler(e)
})

routerUse((next) => {
  try {
    return require(`pocketpages`).MiddlewareHandler(next)
  } catch (e) {
    console.log(
      `WARNING: pocketpages module not found, attempting to load local`,
    )
  }
  return require(`./lib`).MiddlewareHandler(next)
})
