onAfterBootstrap((e) => {
  console.log(`***onAfterBootstrap`)

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
  console.log(`***routerUse`)
  return (c) => {
    return next(c)
  }
})

routerUse((next) => {
  try {
    console.log(`***routerUse`)
    return require(`pocketpages`).MiddlewareHandler(next)
  } catch (e) {
    console.log(
      `WARNING: pocketpages module not found, attempting to load local`,
    )
  }
  return require(`./lib`).MiddlewareHandler(next)
})
