import * as qs from 'qs-lite'
import URLParse from 'url-parse'
import { Route } from '../handlers/AfterBootstrapHandler'
import { dbg } from './debug'
import { fingerprint } from './fingerprint'
import { Cache, PagesParams } from './types'

export const resolveRoute = (url: URLParse<string>, routes: Route[]) => {
  const { config } = $app.store<Cache>().get(`pocketpages`)

  const urlPath = url.pathname.slice(1)
  dbg(`***resolveRoute`, { url, urlPath })
  const params: PagesParams = qs.parse(url.query.slice(1))
  const tryFnames = [
    `${urlPath}`,
    ...config.preprocessorExts.map((ext) => `${urlPath}${ext}`),
    ...config.preprocessorExts.map((ext) => `${urlPath}/index${ext}`),
  ]
  dbg({ tryFnames })
  for (const maybeFname of tryFnames) {
    const parts = maybeFname.split('/').filter((p) => p)
    dbg(`incoming parts`, parts)
    const routeCandidates = routes.filter(
      (r) => r.segments.length === parts.length
    )
    // dbg({ routeCandidates })
    for (const route of routeCandidates) {
      dbg(`checking route`, route)
      const matched = route.segments.every((segment, i) => {
        const { paramName } = segment
        if (paramName) {
          params[paramName] = parts[i]!
          return true
        }
        const matchesWithFingerprint = (() => {
          if (!route.isStatic) return false
          if (i !== route.segments.length - 1) return false
          const fingerprinted = fingerprint(segment.nodeName, route.fingerprint)
          dbg(`fingerprint details`, { segment, fingerprinted, parts })
          return fingerprinted === parts[i]
        })()
        return segment.nodeName === parts[i] || matchesWithFingerprint
      })
      if (matched) {
        dbg(`Matched route`, route)
        return { route, params }
      }
    }
  }
  return null
}
