import * as qs from 'qs-lite'
import type URLParse from 'url-parse'
import { Route } from '../handlers/AfterBootstrapHandler'
import { dbg } from './debug'
import { fingerprint } from './fingerprint'
import { Cache, PagesParams } from './types'

export const resolveRoute = (url: URLParse<string>, routes: Route[]) => {
  const { config } = $app.store<Cache>().get(`pocketpages`)

  const urlPath = url.pathname.slice(1)
  // dbg(`***resolveRoute`, { url, urlPath })
  const params: PagesParams = qs.parse(url.query.slice(1))
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
    for (const route of routes) {
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
