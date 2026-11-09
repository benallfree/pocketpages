import { expect, test } from 'bun:test'
import { resolveRoute } from './resolveRoute'

// Mock $app and $filepath globals for all tests. The mocks only implement
// what resolveRoute uses, so they're cast to the full JSVM types.
globalThis.$app = {
  store: () => ({ get: () => ({ config: {} }) }),
  logger: () => ({ debug: () => {} }), // keeps dbg() from throwing
} as unknown as typeof $app
globalThis.$filepath = {
  toSlash: (s: string) => s.replace(/\\/g, '/'),
} as unknown as typeof $filepath

const baseRoute = (overrides = {}) => ({
  segments: [],
  isStatic: true,
  fingerprint: 'abc',
  relativePath: 'index',
  ...overrides,
})

test('matches index route', () => {
  const routes = [baseRoute({ segments: [{ nodeName: 'index' }] })]
  const url = { pathname: '/', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result?.route.relativePath).toBe('index')
})

test('matches static route', () => {
  const routes = [
    baseRoute({ segments: [{ nodeName: 'about' }], relativePath: 'about' }),
  ]
  const url = { pathname: '/about', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result?.route.relativePath).toBe('about')
})

test('matches param route and sets param', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: '', paramName: 'id' }],
      relativePath: '[id]',
    }),
  ]
  const url = { pathname: '/123', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result?.route.relativePath).toBe('[id]')
  expect(result?.params.id).toBe('123')
})

test('matches static route with fingerprint', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'about' }],
      isStatic: true,
      fingerprint: 'xyz',
      relativePath: 'about',
    }),
  ]
  const url = { pathname: '/about.xyz', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result?.route.relativePath).toBe('about')
})

test('returns null for no match', () => {
  const routes = [
    baseRoute({ segments: [{ nodeName: 'foo' }], relativePath: 'foo' }),
  ]
  const url = { pathname: '/bar', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result).toBeNull()
})

test('static route is matched before param route for /products/new', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'products' }, { nodeName: '', paramName: 'id' }],
      relativePath: 'products/[id]',
    }),
    baseRoute({
      segments: [{ nodeName: 'products' }, { nodeName: 'new' }],
      relativePath: 'products/new',
    }),
  ]
  const url = { pathname: '/products/new', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result?.route.relativePath).toBe('products/new')
  expect(result?.params.id).toBeUndefined()
})

test('static route does not match a URL with extra segments', () => {
  const routes = [
    baseRoute({ segments: [{ nodeName: 'about' }], relativePath: 'about' }),
  ]
  const url = { pathname: '/about/extra/junk', query: {} }
  expect(resolveRoute(url as any, routes as any)).toBeNull()
})

test('index route wins over sibling param route for /products', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'products' }, { nodeName: '', paramName: 'id' }],
      relativePath: 'products/[id]/index',
    }),
    baseRoute({
      segments: [{ nodeName: 'products' }, { nodeName: 'index' }],
      relativePath: 'products/index',
    }),
  ]
  for (const pathname of ['/products', '/products/']) {
    const result = resolveRoute({ pathname, query: {} } as any, routes as any)
    expect(result?.route.relativePath).toBe('products/index')
    expect(result?.params.id).toBeUndefined()
  }
})

test('param route does not swallow deeper paths like PocketBase /api routes', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'api' }, { nodeName: '', paramName: 'x' }],
      relativePath: 'api/[x]',
    }),
  ]
  const url = { pathname: '/api/collections/users/records', query: {} }
  expect(resolveRoute(url as any, routes as any)).toBeNull()
})

test('nested param route index resolves via the /index fallback', () => {
  const routes = [
    baseRoute({
      segments: [
        { nodeName: 'products' },
        { nodeName: '', paramName: 'id' },
        { nodeName: 'index' },
      ],
      relativePath: 'products/[id]/index',
    }),
  ]
  const url = { pathname: '/products/123', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result?.route.relativePath).toBe('products/[id]/index')
  expect(result?.params.id).toBe('123')
})

test('root param route does not capture multi-segment paths', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: '', paramName: 'slug' }],
      relativePath: '[slug]',
    }),
  ]
  expect(
    resolveRoute({ pathname: '/_/settings', query: {} } as any, routes as any)
  ).toBeNull()
  expect(
    resolveRoute({ pathname: '/hello', query: {} } as any, routes as any)
      ?.params.slug
  ).toBe('hello')
})

test('param route is matched for /products/123 when static does not match', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'products' }, { nodeName: '', paramName: 'id' }],
      relativePath: 'products/[id]',
    }),
    baseRoute({
      segments: [{ nodeName: 'products' }, { nodeName: 'new' }],
      relativePath: 'products/new',
    }),
  ]
  const url = { pathname: '/products/123', query: {} }
  const result = resolveRoute(url as any, routes as any)
  expect(result?.route.relativePath).toBe('products/[id]')
  expect(result?.params.id).toBe('123')
})

test('root param route does not shadow a directory index page', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: '', paramName: 'slug' }],
      relativePath: '[slug]',
    }),
    baseRoute({
      segments: [{ nodeName: 'about' }, { nodeName: 'index' }],
      relativePath: 'about/index',
    }),
  ]
  const result = resolveRoute(
    { pathname: '/about', query: {} } as any,
    routes as any
  )
  expect(result?.route.relativePath).toBe('about/index')
  expect(result?.params.slug).toBeUndefined()
  expect(
    resolveRoute({ pathname: '/other', query: {} } as any, routes as any)
      ?.params.slug
  ).toBe('other')
})

test('nested param route does not shadow a deeper index page', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'products' }, { nodeName: '', paramName: 'id' }],
      relativePath: 'products/[id]',
    }),
    baseRoute({
      segments: [
        { nodeName: 'products' },
        { nodeName: 'new' },
        { nodeName: 'index' },
      ],
      relativePath: 'products/new/index',
    }),
  ]
  const result = resolveRoute(
    { pathname: '/products/new', query: {} } as any,
    routes as any
  )
  expect(result?.route.relativePath).toBe('products/new/index')
})

test('direct file wins over directory index when both are literal', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'about' }, { nodeName: 'index' }],
      relativePath: 'about/index',
    }),
    baseRoute({ segments: [{ nodeName: 'about' }], relativePath: 'about' }),
  ]
  const result = resolveRoute(
    { pathname: '/about', query: {} } as any,
    routes as any
  )
  expect(result?.route.relativePath).toBe('about')
})

test('params are URL-decoded', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: 'p' }, { nodeName: '', paramName: 'name' }],
      relativePath: 'p/[name]',
    }),
  ]
  const result = resolveRoute(
    { pathname: '/p/hello%20w%C3%B6rld', query: {} } as any,
    routes as any
  )
  expect(result?.params.name).toBe('hello wörld')
  // Malformed escapes don't throw
  expect(
    resolveRoute({ pathname: '/p/%E0%A4%A', query: {} } as any, routes as any)
      ?.params.name
  ).toBe('%E0%A4%A')
})

test('encoded literal segments match decoded file names', () => {
  const routes = [
    baseRoute({ segments: [{ nodeName: 'café' }], relativePath: 'café' }),
  ]
  expect(
    resolveRoute({ pathname: '/caf%C3%A9', query: {} } as any, routes as any)
      ?.route.relativePath
  ).toBe('café')
})

test('route params do not mutate url.query', () => {
  const routes = [
    baseRoute({
      segments: [{ nodeName: '', paramName: 'id' }],
      relativePath: '[id]',
    }),
  ]
  const query = { q: 'x' }
  const result = resolveRoute({ pathname: '/123', query } as any, routes as any)
  expect(result?.params).toEqual({ q: 'x', id: '123' })
  expect(query).toEqual({ q: 'x' })
})
