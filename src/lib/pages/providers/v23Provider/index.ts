import type { IPagesProvider } from '../..'

export const v23Provider = (): IPagesProvider => ({
  boot: () => {
    onBootstrap((e) => {
      e.next()
      // Only override require once
      if (!(require as any).isOverridden) {
        const oldRequire = require
        require = (path) => {
          try {
            if (path === 'pocketpages') {
              return require(`${__hooks}/pocketpages.pb`).globalApi
            }
            return oldRequire(path)
          } catch (e) {
            const errorMsg = `${e}`
            if (errorMsg.includes('Invalid module')) {
              throw new Error(
                `${path} is not a valid module. Did you mean resolve()?`
              )
            }
            throw e
          }
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
        require = (path) => {
          try {
            if (path === 'pocketpages') {
              return require(`${__hooks}/pocketpages.pb`).globalApi
            }
            return oldRequire(path)
          } catch (e) {
            const errorMsg = `${e}`
            if (errorMsg.includes('Invalid module')) {
              throw new Error(
                `${path} is not a valid module. Did you mean resolve()?`
              )
            }
            throw e
          }
        }
        // Set the flag on the new require function
        ;(require as any).isOverridden = true
      }
      return require(`${__hooks}/pocketpages.pb`).v23MiddlewareWrapper(e)
    })
  },
})
