import { Route } from '../handlers/AfterBootstrapHandler'
import { dbg } from './debug'
import { fingerprint } from './fingerprint'
import { Cache, PagesParams, Url } from './types'

export const resolveRoute = (url: Url, routes: Route[]) => {
  const { config } = $app.store<Cache>().get(`pocketpages`)

  const urlPath = url.pathname.slice(1)
  // dbg(`***resolveRoute`, { url, urlPath })
  const params: PagesParams = url.query
  const tryFnames = [urlPath || 'index']
  if (tryFnames[0] !== 'index') {
    tryFnames.push(`${urlPath}/index`)
  }
  // dbg({ tryFnames })
  for (const maybeFname of tryFnames) {
    const parts = $filepath
      .toSlash(maybeFname)
      .split('/')
      .filter((p) => p)
    // dbg(`incoming parts`, parts)


    // Sort routes to prioritize exact matches over parameter matches
    // Routes with higher specificity (more exact segments) should be checked first
    const sortedRoutes = routes.slice().sort((a, b) => {
      const getSpecificity = (route: Route) =>
        route.segments.reduce((acc, segment) => acc + (segment.paramName ? 1 : 10), 0);
      const aSpecificity = getSpecificity(a);
      const bSpecificity = getSpecificity(b);
      if (aSpecificity !== bSpecificity) {
        return bSpecificity - aSpecificity; // Sort by specificity, descending
      }
      return 0;
    });

    for (const route of sortedRoutes) {
      // dbg(`checking route`, route)
      const matched = route.segments.every((segment, i) => {
        const { nodeName, paramName } = segment
        if (paramName) return true // Match any value for param route segments
        const part = parts[i]
        const matchesWithFingerprint = (() => {
          if (i !== route.segments.length - 1) return false
          if (!route.isStatic) return false
          const fingerprinted = fingerprint(segment.nodeName, route.fingerprint)
          // dbg(`fingerprint details`, { segment, fingerprinted, parts })
          return fingerprinted === parts[i]
        })()
        // dbg(`match status`, { nodeName, part, matchesWithFingerprint })
        return nodeName === part || matchesWithFingerprint
      })
      if (matched) {
        dbg(`Matched route ${route.relativePath}`)
        route.segments.forEach((segment, i) => {
          const { paramName } = segment
          if (paramName) {
            params[paramName] = parts[i]!
            return true
          }
        })
        return { route, params }
      }
    }
  }
  return null
}
