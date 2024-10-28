import { Route } from './AfterBootstrapHandler'
import { Cache } from './types'

export const parseRoute = (urlPath: string, routes: Route[]) => {
  const { config } = $app.store<Cache>().get(`pocketpages`)
  const params = {}
  const tryFnames = [
    `${urlPath}`,
    ...config.preprocessorExts.map((ext) => `${urlPath}${ext}`),
    ...config.preprocessorExts.map((ext) => `${urlPath}/index${ext}`),
  ]
  // dbg({ tryFnames })
  for (const maybeFname of tryFnames) {
    const parts = maybeFname.split('/').filter((p) => p)
    // dbg({ parts })
    // dbg({ routes })
    const routeCandidates = routes.filter(
      (r) => r.segments.length === parts.length
    )
    // dbg({ routeCandidates })
    for (const route of routeCandidates) {
      const matched = route.segments.every((segment, i) => {
        if (segment.paramName) {
          params[segment.paramName] = parts[i]
          return true
        }
        return segment.nodeName === parts[i]
      })
      if (matched) {
        // dbg(`Matched route`, route)
        return { route, params }
      }
    }
  }
  return null
}
