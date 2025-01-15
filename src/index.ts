const isBooting = typeof onBootstrap !== 'undefined'

if (isBooting) {
  onBootstrap((e) => {
    require(`${__hooks}/pocketpages.pb`).AfterBootstrapHandler(e)
    return e.next()
  })

  routerUse((e) => {
    require(`${__hooks}/pocketpages.pb`).MiddlewareHandler(e)
    return e.next()
  })
}

export * from './main'
