export const boot = () => {
  onBootstrap((e) => {
    e.next()
    // Only override require once
    if (!(require as any).isOverridden) {
      const oldRequire = require
      const { globalApi, moduleExists } = oldRequire(
        `${__hooks}/pocketpages.pb`
      )
      require = (path) => {
        // console.log(`bootstrap require called with ${path}`)
        if (path === 'pocketpages') {
          return globalApi
        }
        // console.log(`checking ${path}`)
        if (!moduleExists(path)) {
          // console.log(`not found`)
          throw new Error(`Module ${path} not found. Did you mean resolve()?`)
        }
        return oldRequire(path)
      }
      // Set the flag on the new require function
      ;(require as any).isOverridden = true
    }
    require(`${__hooks}/pocketpages.pb`).AfterBootstrapHandler()
  })

  routerUse((e) => {
    // Only override require once
    if (!(require as any).isOverridden) {
      const oldRequire = require
      const { globalApi, moduleExists } = oldRequire(
        `${__hooks}/pocketpages.pb`
      )
      require = (path) => {
        // console.log(`router require called with ${path}`)
        if (path === 'pocketpages') {
          return globalApi
        }
        // console.log(`checking ${path}`)
        if (!moduleExists(path)) {
          // console.log(`not found`)
          throw new Error(`Module ${path} not found. Did you mean resolve()?`)
        }
        return oldRequire(path)
      }
      // Set the flag on the new require function
      ;(require as any).isOverridden = true
    }
    // console.log(`calling v23MiddlewareWrapper with overridden require`)
    return require(`${__hooks}/pocketpages.pb`).v23MiddlewareWrapper(e)
  })
}
