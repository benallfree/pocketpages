routerUse((e) => {
  $app
    .logger()
    .debug(`middleware request: ${e.request.method} ${e.request.url}`, {
      headers: e.request.header,
    })
  return e.next()
})
