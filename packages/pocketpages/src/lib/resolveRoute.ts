import { Route } from '../handlers/AfterBootstrapHandler'
import { dbg } from './debug'
import { fingerprint } from './fingerprint'
import { PagesParams, Url } from './types'

export type ResolvedRoute = {
  route: Route
  params: PagesParams
}

const paramCount = (route: Route) =>
  route.segments.reduce((acc, s) => acc + (s.paramName ? 1 : 0), 0)

const safeDecode = (part: string) => {
  try {
    return decodeURIComponent(part)
  } catch {
    // Malformed escape sequence: match against the raw text
    return part
  }
}

const matchRoute = (route: Route, parts: string[]) => {
  // A route only matches a URL with exactly as many segments. Otherwise
  // `about` would serve `/about/x/y`, `products/[id]` would capture
  // `/products` (with an undefined param) before `products/index`, and
  // `api/[x]` would swallow PocketBase's `/api/...` REST routes.
  if (route.segments.length !== parts.length) return false
  return route.segments.every((segment, i) => {
    const { nodeName, paramName } = segment
    if (paramName) return true // Match any value for param route segments
    const part = parts[i]
    if (nodeName === part) return true
    if (i !== route.segments.length - 1) return false
    if (!route.isStatic) return false
    return fingerprint(nodeName, route.fingerprint) === part
  })
}

export const resolveRoute = (
  url: Url,
  routes: Route[]
): ResolvedRoute | null => {
  const urlPath = url.pathname.slice(1)
  // dbg(`***resolveRoute`, { url, urlPath })
  const tryFnames = [urlPath || 'index']
  if (tryFnames[0] !== 'index') {
    tryFnames.push(`${urlPath}/index`)
  }

  // Sort routes to prioritize exact matches over parameter matches.
  // Routes with fewer param segments are checked first (stable sort keeps
  // filesystem order for ties).
  const sortedRoutes = routes
    .slice()
    .sort((a, b) => paramCount(a) - paramCount(b))

  // Find the best match for each candidate filename, then prefer the one
  // with the fewest param segments. This keeps `[slug].ejs` from shadowing
  // `about/index.ejs` for `/about`; on a tie, the direct file wins
  // (`about.ejs` over `about/index.ejs`).
  let best: { route: Route; parts: string[] } | null = null
  for (const maybeFname of tryFnames) {
    const parts = $filepath
      .toSlash(maybeFname)
      .split('/')
      .filter((p) => p)
      .map(safeDecode)
    const route = sortedRoutes.find((r) => matchRoute(r, parts))
    if (!route) continue
    if (!best || paramCount(route) < paramCount(best.route)) {
      best = { route, parts }
    }
  }
  if (!best) return null

  const { route, parts } = best
  dbg(`Matched route ${route.relativePath}`)
  // Copy so route params don't leak into request.url.query
  const params: PagesParams = { ...url.query }
  route.segments.forEach((segment, i) => {
    if (segment.paramName) {
      params[segment.paramName] = parts[i]!
    }
  })
  return { route, params }
}
