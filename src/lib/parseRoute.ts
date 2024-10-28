import { dbg } from 'pocketbase-log'
import { Route } from './AfterBootstrapHandler'
import { Cache } from './types'

export const fingerprint = (nodeName: string, fingerprint: string) => {
  // Split filename into base and extension
  const lastDotIndex = nodeName.lastIndexOf('.')
  if (lastDotIndex === -1) {
    // No extension - just append fingerprint
    return `${nodeName}.${fingerprint}`
  }

  const base = nodeName.slice(0, lastDotIndex)
  const ext = nodeName.slice(lastDotIndex)

  // Insert fingerprint between base and extension
  return `${base}.${fingerprint}${ext}`
}

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
        const matchesWithFingerprint = (() => {
          if (route.shouldPreProcess) return false
          if (i !== route.segments.length - 1) return false
          const fingerprinted = fingerprint(segment.nodeName, route.fingerprint)
          dbg({ segment, fingerprinted, parts })

          return fingerprinted === parts[i]
        })()
        return segment.nodeName === parts[i] || matchesWithFingerprint
      })
      if (matched) {
        // dbg(`Matched route`, route)
        return { route, params }
      }
    }
  }
  return null
}
