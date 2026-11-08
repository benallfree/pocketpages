# Request lifecycle

Source of truth: `packages/pocketpages/src/handlers/MiddlewareHandler.ts` (per request) and `AfterBootstrapHandler.ts` (route table at boot).

## Boot

`require('pocketpages')` in `pb_hooks/*.pb.js` registers `onBootstrap` and a global `routerUse` middleware. At boot, PocketPages:

1. Loads `pages/+config.js` (object or `function(globalApi)`), merged over defaults `{ plugins: ['pocketpages-plugin-ejs'], debug: false }`. Any key other than `plugins`/`debug` throws.
2. Walks `pages/`, drops every file whose path has a segment starting with `+`, `_`, or `-`, and strips `(group)` segments from URLs.
3. For each remaining file, asks plugins whether they `handles()` it. Unhandled files are **static** (served as-is, fingerprintable).
4. For handled files, records:
   - `layouts`: the `+layout.*` file in the page's dir, then in each parent dir up to `pages/` (group dirs included). Two layouts in one dir throws.
   - `middlewares`: `+middleware.js` from `pages/` down to the page's dir.
   - `loaders`: `+load.js`, `+get.js`, `+post.js`, `+put.js`, `+patch.js`, `+delete.js` **in the page's own dir only**.
5. Caches the route table in `$app.store()`. It never rescans until PocketBase restarts.

## Per request

```
plugins.onRequest({request, response})      // e.g. auth plugin reads pb_auth cookie
resolveRoute(url)                           // no match → e.next() (PocketBase handles it)
static? → response.file(path)               // done
build api context; plugins.onExtendContextApi({api, route})
middlewares root→leaf                       // data merges
loaders: +load.js, then +<method>.js        // data merges
api.data = data
render page through plugin onRender chain   // EJS etc.
if Content-Type set and !== 'text/html' → stop (you already responded)
if output parses as JSON → response.json(200, parsed); stop
for each layout inner→outer: parse slots, render layout
plugins.onResponse(...) or default: response.html(200, content)
```

Errors are caught. With `debug` truthy, you get a 500 page with the message and stack. Otherwise a generic 500.

## Middleware

```js
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  return { categories: $app.findRecordsByFilter('categories', '1=1', 'name') }
}
```

- **Without a `next` parameter** (`fn.length < 2`), the return value is merged into `data` and the chain continues automatically. Returning nothing is fine.
- **With a `next` parameter**, the return value is **ignored**. Call `next(extraData)` to continue. If you never call `next`, nothing further runs (no loaders, no render) and **nothing is sent unless you sent it yourself**:

  ```js
  module.exports = function (api, next) {
    if (!/^\d+$/.test(api.params.id || '')) {
      return api.response.json(400, { error: 'Invalid ID' })
    }
    next({ id: parseInt(api.params.id, 10) })
  }
  ```
- Each middleware receives `{ ...api, data }` with data accumulated so far.
- There is **no** method-specific middleware. `+get.js`/`+post.js` are leaf loaders, despite what some docs say.

## Loaders

- Only the loaders in the **same directory as the page file** run. `pages/products/+load.js` does **not** run for `pages/products/[id]/index.ejs`.
- Order: `+load.js`, then `+<method>.js` (lowercased HTTP method).
- Signature: `(api) => object`, where `api.data` holds middleware data. Results are deep-merged (micro-dash `merge`) into `data`.
- Loaders run for **every** method, so guard side effects: put POST handling in `+post.js`, not `+load.js`.

## The `data` object

Available as `data` in the page, **every layout**, and every partial (partials inherit the context): middleware results merged with loader results.

## Rendering, JSON, and layouts

- **JSON detection:** after the page renders, the whole output string goes through `JSON.parse`. If it succeeds, the response is `application/json`, status 200, and no layouts. This is how `<% return {…} %>` endpoints work. It also means a fragment rendering only `123`, `null`, `true`, or `"x"` becomes JSON. Wrap fragments in an HTML element.
- **Explicit responses:** `response.json(status, obj)`, `response.html(status, str)`, and `response.file(path)` write immediately and set Content-Type. PocketPages sees a non-`text/html` type (`text/html; charset=utf-8` counts as different) and stops before layouts. The page template still renders first, so guard it (`<% if (!data.post) return %>`).
- **Layouts** apply innermost first. Each layout gets `slot` and `slots` computed from the content it wraps (see templates.md for slot rules).

## Status codes

There is no `response.status()`. Rendered pages always go out as **200**. For anything else:

```js
response.html(404, '<h1>Not found</h1>')        // no layout
response.json(422, { errors })
```

Layouts are skipped once you send the response yourself. For a styled 404, keep a self-contained `_private/404.ejs` (with its own `<html>` shell) and send it from the page template. `include` is only available in templates, not loaders:

```ejs
<% if (!data.post) { response.html(404, include('404.ejs', { path: request.url.pathname })); return } %>
```

## Redirects and flash

```js
redirect('/login', { status: 303, message: 'Please sign in' })
```

- Default status 302. `message` is appended as `?__flash=...`. Read it on the next page via `params.__flash`.
- `redirect()` sets headers but **does not stop execution**. A `return` in a template stops that template. A `return` in a loader or one-arg middleware only ends that function: the rest of the chain and the page render still run (the client still follows the 302, but the page may throw on missing data). **The only real halt is two-arg middleware that doesn't call `next()`.** Use that for auth guards.
- `response.redirect(path, status)` is the low-level version with no flash.

## Cookies and headers

```js
request.header('HX-Request')            // '' when absent
request.cookies()                       // all cookies, JSON values auto-parsed
request.cookies('prefs')
response.header('Cache-Control', 'no-store')
response.cookie('prefs', { theme: 'dark' }, { httpOnly: true, maxAge: 86400 }) // objects are stringified; path defaults to '/'
```

`response.header('Set-Cookie', …)` **sets** (replaces) the header, so only the last `response.cookie()` call in a request survives.
