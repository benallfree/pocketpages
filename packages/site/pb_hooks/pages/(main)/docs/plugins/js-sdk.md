# JS SDK Plugin

The JS SDK plugin (`pocketpages-plugin-js-sdk`) provides a JSVM-compatible version of the PocketBase JavaScript SDK, making it easy to interact with your PocketBase collections and authentication system.

## Installation

```bash
npm install pocketpages-plugin-js-sdk
```

## Configuration

Add the plugin to your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    'pocketpages-plugin-js-sdk',
    // ... other plugins
  ],
}
```

### Options

- **`host`**: PocketBase server URL (default: `'http://localhost:8090'`)
- **`debug`**: Enable debug output for the plugin (default: `false`)
- **`passRateLimitHeaders`**: Forward the PocketBase rate-limiter trusted proxy header on every `pb()` call (default: `false`). Can also be set per-call — see [Forwarding Trusted Proxy Headers](#forwarding-trusted-proxy-headers).

## Usage

The plugin adds a `pb()` function to the global context that returns a configured PocketBase client. The client is cached based on the host and authentication context.

```typescript
type PocketBaseClientOptions = {
  auth?: core.Record    // Auth record to use
  host?: string        // PocketBase host URL
  request?: Request    // Current request context
  passRateLimitHeaders?: boolean // Forward PB rate-limiter trusted proxy header (default: false)
  header?: (name: string) => string | undefined // Custom header resolver
  remoteIP?: string    // Remote IP fallback when header is absent
}

// Get a PocketBase client
const client = pb(options?: PocketBaseClientOptions)
```

### Authentication Handling

To get a client with the current request's authentication context:

```ejs
<%%%
  // Get an authenticated client for the current request
  const client = pb({ request })

  // Use any PocketBase SDK method with the authenticated context
  const records = client.collection('posts').getFullList({
    sort: '-created',
    expand: 'author',
  })
%>
```

To get an unauthenticated client:

```ejs
<%%%
  // Get an anonymous client
  const client = pb()
%>
```

### Client Caching

The plugin caches PocketBase clients based on:

- The host URL
- The authentication context (user ID)

This means:

- Multiple calls with the same auth context reuse the same client
- Different users get different client instances
- Anonymous requests share a common unauthenticated client

When `passRateLimitHeaders` is enabled and a header value can be resolved, the plugin returns a **fresh, uncached** client for that call. Reusing a cached client across requests with different forwarded IPs would let `beforeSend` (which is client-level state) leak one request's identity into another. Bypassing the cache on this path avoids that contamination and prevents cache growth keyed by remote IP.

### Forwarding Trusted Proxy Headers

When PocketBase is behind a reverse proxy, it can be configured to trust a specific header (e.g. `CF-Connecting-IP` or `X-Forwarded-For`) for rate limiting. Set this up under **PocketBase Settings → Rate limiting → Trusted proxy headers**.

To forward that header on SDK requests so PocketBase applies rate limits correctly per real client IP:

```javascript
// +config.js — enable globally for all pb() calls
module.exports = {
  plugins: [['pocketpages-plugin-js-sdk', { passRateLimitHeaders: true }]],
}
```

Or opt in per-call:

```ejs
<%%%
  // passRateLimitHeaders can be set on a single call instead of globally
  const client = pb({ request, passRateLimitHeaders: true })
  const records = client.collection('posts').getFullList()
%>
```

**How the header is determined:**

- **Name** — read from `$app.settings().trustedProxy.headers[0]` (the first header configured in PocketBase Settings → Rate limiting → Trusted proxy headers). If none is configured, forwarding is skipped even when `passRateLimitHeaders` is `true`.
- **Value** — resolved from the incoming request in this order:
  1. `options.header(name)` — custom header resolver passed by the caller
  2. `options.request.header(name)` — header from the current PocketPages request
  3. `options.remoteIP` — explicit remote IP from the caller
  4. `options.request.event.remoteIP()` — remote IP from the current PocketPages request event

### Example: Working with Collections

```ejs
<%%%
  const client = pb({ request })

  // Create a record
  const post = client.collection('posts').create({
    title: 'Hello World',
    content: 'My first post',
  })

  // Query with filters
  const published = client.collection('posts').getFullList({
    filter: 'status = "published"',
    sort: '-created',
  })
%>
```

### Example: Authentication

```ejs
<%%%
  const client = pb({ request })

  try {
    // Attempt to authenticate
    const user = client.collection('users').authWithPassword(
      'user@example.com',
      'password123'
    )

    // Get the authenticated user's data
    const userData = client.authStore.model
  } catch (e) {
    // Handle authentication errors
  }
%>
```

## Benefits Over Raw JSVM API

While using the raw JSVM API might be slightly more efficient, the PocketBase REST API (via the SDK) offers several advantages:

- Well-documented and widely used API surface
- Consistent API between frontend and backend code
- Access to high-level features not easily available in raw JSVM
- Familiar JavaScript patterns and nomenclature
- Rich ecosystem of examples and community support

## SDK References

The plugin uses a special JSVM-compatible version of the PocketBase JS SDK that provides synchronous methods instead of async/await:

- [JSVM SDK Documentation](https://www.npmjs.com/package/pocketbase-js-sdk-jsvm)
- [Original JS SDK Documentation](https://github.com/pocketbase/js-sdk)
