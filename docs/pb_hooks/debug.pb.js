routerUse((next) => {
  return (c) => {
    $app
      .logger()
      .debug(`middleware request: ${c.request().method} ${c.request().url}`, {
        headers: c.request().header,
      })
    next(c)
  }
})
