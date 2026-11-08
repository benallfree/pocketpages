# Context API reference (0.22.x)

Every page, layout, middleware, and loader receives this object. In EJS each key is a bare variable, and the whole object is also `api`. Types: `import('pocketpages').PagesRequestContext`. Signatures below match `src/lib/types.ts` and the runtime behavior in `MiddlewareHandler.ts`.

## Request context

| Member | Signature | Notes |
|---|---|---|
| `params` | `Record<string, string \| undefined>` | Query string **and** route params. Route params win on name clashes. Query values are JSON-parsed when possible (`?n=5` → `5`, `?f={"a":1}` → object). `__flash` carries redirect messages |
| `data` | `object` | Merged middleware + loader results. Also visible in partials (they inherit the context) |
| `auth` | `core.Record \| undefined` | The authenticated record. Header-based by default, cookie-based with the auth plugin. Use `auth.get('email')`, `auth.id`, `auth.verified()`, `auth.isSuperuser()` |
| `formData` | `() => object` | **Function.** Parsed body (`e.requestInfo().body`): form-encoded, multipart, or JSON. Unchecked checkboxes are absent |
| `body` | `() => object \| string` | Same as `formData()` |
| `request` | `PagesRequest` | See below |
| `response` | `PagesResponse` | See below |
| `redirect` | `(path, { status?=302, message? }) => void` | Adds `?__flash=message` when a message is given. **Doesn't stop execution, so `return` after it** |
| `meta` | `(key) => string \| undefined` / `(key, value) => string` | Per-request metadata (title, etc.) |
| `asset` | `(path) => string` | Fingerprinted URL for a static file. See templates.md |
| `resolve` | `(path, { mode?: 'require'\|'raw'\|'script'\|'style' }) => any` | Loads from `_private/` upward. A leading `/` means `pages/_private/…` |
| `echo` | `(...args) => string` | In EJS, appends to output. In loaders/middleware, writes straight to the response body |
| `slot` / `slots` | `string` / `Record<string,string>` | Layouts only. See templates.md |

Plugins add more: `pb()` (js-sdk); `signInWithPassword`, `signOut`, … (auth); `realtime` (realtime); `datastar` (datastar); `forEach`/`keys`/`values`/`merge`/`pick`/`shuffle` (micro-dash).

## `request`

| Member | Signature | Notes |
|---|---|---|
| `method` | `'GET'\|'POST'\|'PUT'\|'PATCH'\|'DELETE'` | Uppercased |
| `url` | parsed URL (`url-parse`) | `.pathname`, `.query` (JSON-parsed values), `.toString()` |
| `header` | `(name) => string` | `''` when absent |
| `cookies` | `() => Record<string, any>` / `(name) => any` | Values JSON-parsed when possible |
| `formData` / `body` | `() => object` | Same as the context members |
| `auth` | `core.Record \| undefined` | Same as context `auth` |
| `authToken` | `string \| undefined` | Set by the auth plugin from the cookie |
| `event` | `core.RequestEvent` | The raw PocketBase event, an escape hatch (`request.event.realIP()`, `request.event.request.header`, …) |

## `response`

| Member | Signature | Notes |
|---|---|---|
| `html` | `(status, string) => void` | Sends now. Skips layouts |
| `json` | `(status, any) => void` | Sends now. Skips layouts |
| `file` | `(absPath) => void` | Streams a file from disk |
| `redirect` | `(path, status=302) => void` | Low level, no flash |
| `header` | `(name) => string` / `(name, value) => string` | Setting replaces any existing value |
| `cookie` | `(name, value, cookieSerializeOptions?) => string` | Non-string values are stringified. `path` defaults to `/`. Appends a `Set-Cookie` header, so several cookies per response work. (In ≤ 0.22.3 it replaced the header, so only the last call survived.) |
| `write` | `(string) => void` | Raw body write |

There is no `response.status()`.

## Global API

Available in every request context, and anywhere via `require('pocketpages').globalApi` (for example inside `_private/*.js` modules or `pb_hooks/*.pb.js`).

| Member | Signature | Notes |
|---|---|---|
| `env` | `(key) => string` | `process.env[key] ?? ''`. Use it for secrets |
| `store` | `(name) => any` / `(name, value) => value` | Process-wide `$app.store()`. Shared across requests, lost on restart. Not a database |
| `stringify` | `(value, replacer?, space?) => string` | Circular-safe JSON, handles Go objects |
| `url` | `(string) => Url` | Parses a URL with JSON-parsed query values |
| `dbg` `info` `warn` `error` | `(...args) => void` | PocketBase logger. `dbg` prints only with `--dev` |

## PocketBase JSVM globals you will use constantly

`$app` (DB, settings, mail, store), `$dbx` (query expressions), `$security` (hashing, JWT, random strings), `$http.send` (outbound HTTP), `$os`/`$filepath` (files), `Record`, `Collection`, `MailerMessage`, `SubscriptionMessage`. Reference: https://pocketbase.io/jsvm/. Cookbook: [jsvm.md](jsvm.md).
