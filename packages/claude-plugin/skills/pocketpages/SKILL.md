---
name: pocketpages
description: Build, debug, and deploy PocketPages apps — the file-routed EJS multi-page framework that runs inside PocketBase's JSVM (pb_hooks/pages/). Use whenever a project has pb_hooks/pages/, a +config.js / +load.js / +middleware.js / +layout.ejs file, depends on `pocketpages` or a `pocketpages-plugin-*` package, or the user asks to build a server-rendered site on PocketBase. Covers routing, loaders, middleware, layouts, partials, resolve(), the context API, plugins, Goja/JSVM limits, and deploying to PocketHost.
---

# PocketPages

PocketPages is a multi-page app (MPA) preprocessor that runs **inside PocketBase** as a JS hook. Files under `pb_hooks/pages/` map to URLs (like PHP). Pages are EJS templates rendered server-side, with the full PocketBase JSVM API (`$app`, `$dbx`, `$security`, …) available. There is no build step, no Node server, and no client framework required.

Targets PocketPages 0.22.x on PocketBase ≥ 0.25.5.

## The one thing to internalize: this is not Node

Code runs in **Goja** (an ES5.1+ engine in Go) inside PocketBase. Before writing any server code:

- **Everything is synchronous.** No `async`/`await`, no Promises for I/O, no `fetch`. Use `$http.send({...})` for HTTP and `$app.*` for the DB; both return values directly.
- **No Node or browser APIs**: no `fs`, `Buffer`, `process` (except `process.env`), `setTimeout`, `window`, or `document`. Use `$os`, `$filepath`, `$security`, and `$http` instead (see https://pocketbase.io/jsvm/).
- **CommonJS only.** `require()` works for pure-JS CJS packages in `node_modules` and for local files. ESM-only packages and packages that touch Node built-ins will fail.
- **Records are Go objects.** Read fields with `record.get('title')`, not `record.title`. Set them with `record.set('title', v)`. (`record.id` works.)
- **`$app` finder signatures are positional**, not option objects:
  ```js
  $app.findRecordsByFilter('posts', 'status = {:s}', '-created', 20, 0, {
    s: 'published',
  })
  $app.findFirstRecordByFilter('users', 'email = {:e}', { e: email }) // throws if not found
  $app.findRecordById('posts', id) // throws if not found
  ```
  Always bind user input with `{:name}` placeholders. Never interpolate it into filter strings.
- Do **not** use the PocketBase JS SDK (`pb.collection(...)`) in server code unless the `pocketpages-plugin-js-sdk` plugin is configured. Prefer `$app`.

Full details: [references/jsvm.md](references/jsvm.md)

## Project layout

```
package.json              # depends on pocketpages (+ any plugins)
pb_hooks/
  pocketpages.pb.js       # one line: require('pocketpages')
  pages/                  # ← the app; every route lives here
    +config.js            # optional: plugins + debug
    +layout.ejs           # optional: wraps every page
    +middleware.js        # optional: runs for every page under this dir
    index.ejs             # → /
    _private/             # partials + JS modules (never routable)
pb_migrations/            # PocketBase schema migrations (JS)
pb_data/                  # local DB, never deploy
```

Run locally with `pocketbase serve --dev --dir=pb_data` **from the project root** (`--dev` enables `dbg()` output). PocketBase resolves `require()` from its working directory, not from `pb_hooks`, so starting it anywhere else (even with `--hooksDir`) makes `require('pocketpages')` fail with `GoError: Invalid module`. A brand-new `pb_data` with no superuser makes PocketBase open a browser to its installer. For headless or scripted runs, create one first with `pocketbase superuser upsert <email> <password> --dir=pb_data`. PocketBase restarts automatically when `pb_hooks/` changes. **Route tables are built at boot**, so a new file only becomes a route after that restart.

New project: `npm create pocketpages` (pick a starter: minimal, htmx, datastar, auth, daisyui, …).

## File conventions (cheat sheet)

| File / dir                                              | Meaning                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------- |
| `foo.ejs`                                               | Page at `/foo`                                                             |
| `foo/index.ejs`                                         | Page at `/foo` (and `/foo/`)                                               |
| `[id].ejs`, `[id]/index.ejs`                            | Route param → `params.id`                                                  |
| `(group)/`                                              | Route group: organizes files and scopes layouts. **Stripped from the URL** |
| `+layout.ejs`                                           | Wraps pages in this dir and below. Nested layouts apply inner→outer        |
| `+middleware.js`                                        | Runs for every request under this dir, root→leaf                           |
| `+load.js`                                              | Loader, **only for pages in the same dir**                                 |
| `+get.js` `+post.js` `+put.js` `+patch.js` `+delete.js` | Method-specific loader, same dir only, runs after `+load.js`               |
| `+config.js`                                            | Root only. Plugins + debug                                                 |
| `_private/`                                             | Partials for `include()` and modules for `resolve()`. Never routable       |
| any segment starting with `+`, `_`, or `-`              | Not routable (file or directory)                                           |
| any other file (`.css`, `.png`, `.js`, `.html`)         | Served statically                                                          |

## Request lifecycle

1. All `+middleware.js` files from root to leaf run (data accumulates).
2. `+load.js`, then `+<method>.js`, run (same dir as the page only).
3. The page renders through the plugin chain (EJS by default) with `data` = merged middleware + loader results.
4. If the response already has a non-`text/html` Content-Type (you called `response.json()`/`html()`/`file()`), stop.
5. If the rendered output **parses as JSON**, send it as `application/json` (status 200) and skip layouts.
6. Otherwise wrap the output in each `+layout.ejs`, inner→outer, and send HTML with status 200.

Details, `next()` semantics, and status codes: [references/request-lifecycle.md](references/request-lifecycle.md)

## Minimal patterns

**Page with a loader**

```js
// pages/posts/[slug]/+load.js
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function ({ params, response }) {
  try {
    const post = $app.findFirstRecordByFilter('posts', 'slug = {:slug}', {
      slug: params.slug,
    })
    return { post }
  } catch (e) {
    response.html(404, 'Not found') // there is no response.status()
    return {}
  }
}
```

```ejs
<%# pages/posts/[slug]/index.ejs %>
<% if (!data.post) return %>
<% meta('title', data.post.get('title')) %>
<article>
  <h1><%= data.post.get('title') %></h1>
  <%- data.post.get('body') %>
</article>
```

**Layout**

```ejs
<%# pages/+layout.ejs %>
<!doctype html>
<html>
  <head><title><%= meta('title') || 'My site' %></title></head>
  <body>
    <%- include('nav.ejs', { user: auth }) %>
    <main><%- slot %></main>
  </body>
</html>
```

**Form POST + redirect**

```js
// pages/contact/+post.js
module.exports = function ({ formData, redirect }) {
  const body = formData() // formData is a FUNCTION
  const col = $app.findCollectionByNameOrId('messages')
  const rec = new Record(col)
  rec.set('email', body.email)
  rec.set('message', body.message)
  $app.save(rec)
  redirect('/contact', { message: 'Thanks!' }) // flash → params.__flash
  return {}
}
```

**Auth guard (middleware)**

```js
// pages/(app)/+middleware.js
// Two-arg form: not calling next() halts the chain (no loaders, no render).
module.exports = function ({ auth, redirect }, next) {
  if (!auth) return redirect('/login', { message: 'Please sign in' })
  next({ user: auth })
}
```

`auth` (and `request.auth`) is populated from the `Authorization` header. Browser cookie sessions require `pocketpages-plugin-auth`. See [references/plugins.md](references/plugins.md).

**JSON endpoint**

```ejs
<%# pages/xapi/stats.ejs %>
<% return { count: $app.countRecords('posts') } %>
```

## Top gotchas (check these first when something is wrong)

1. **`formData` and `body` are functions.** Call `formData()`. Reading `formData.email` returns `undefined`.
2. **`record.field` is undefined.** Use `record.get('field')`.
3. **`meta` is a function**: `meta('title', 'x')` sets, `meta('title')` gets.
4. **No `response.status()`.** For non-200, call `response.html(code, str)` or `response.json(code, obj)`. After that, layouts are skipped.
5. **`redirect()` does not stop execution.** In templates, `return` right after it. In loaders and one-arg middleware, returning still lets the page render. To truly halt, use two-arg middleware `(api, next)` and don't call `next()`.
6. **Output that happens to be valid JSON becomes a JSON response.** A fragment that renders just `42`, `true`, or `"ok"` is sent as `application/json` without layouts. Wrap HTMX fragments in an element.
7. **Only the same-directory `+load.js` runs.** Loaders don't cascade. Use `+middleware.js` for shared data.
8. **Setting a non-`text/html` Content-Type yourself** (including `text/html; charset=utf-8` via `response.header`) means PocketPages assumes you sent the body. Nothing more is written unless you `response.write()`/`echo()` it.
9. **Don't shadow PocketBase.** URLs that match a page never reach PocketBase (`/api/...`, `/_/` admin). Don't create pages whose URLs collide with those, and put your own endpoints under a prefix like `xapi/`. On ≤ 0.22.3, param routes also swallow deeper paths (see below).
10. **`+config.js` `plugins` replaces the default list.** The default is `['pocketpages-plugin-ejs']`. If you set `plugins`, include the EJS plugin yourself. Unknown top-level config keys throw at boot.
11. **New route files need a restart** (automatic in dev, since PocketBase reloads on `pb_hooks` changes).
12. **No `await`, no `fetch`.** Use `$http.send()`.

## Route matching bugs in ≤ 0.22.3

PocketPages 0.22.3 and earlier didn't check that the URL and the route have the same number of segments. If the project's installed `pocketpages` is one of those versions (check `node_modules/pocketpages/package.json`):

- **Extra URL segments still match**: `/about/x/y` is served by `about.ejs`.
- **A sibling param route beats `index`**: with both `products/index.ejs` and `products/[id]/…`, a request to `/products` resolves to `[id]` with `params.id === undefined`.
- **Param routes swallow subpaths**: `pages/api/[x].ejs` captures `/api/collections/...` and breaks the PocketBase REST API.

Fixed in the next patch release, so upgrading is the real fix. On old versions, guard param pages with `if (!params.id) …` and avoid `api/[x]` param routes. On any version, a root `pages/[slug].ejs` still captures every single-segment URL that isn't a more specific route.

## Templates, partials, and modules

- `<% code %>`, `<%= escaped %>`, `<%- raw %>`. `<script server> … </script>` is an editor-friendly alias for `<% … %>`.
- `include('card.ejs', { title })` searches `_private/` in the current dir, then each parent up to `pages/`. The extension is optional. A leading `/` means relative to `pages/` (e.g. `/blog/_private/card.ejs`). Partials inherit the full context (`request`, `data`, `auth`, plugin functions), with your passed object merged on top. Variables the parent declared with `const`/`let` are **not** inherited, so pass those explicitly.
- `resolve('queries')` uses the same upward `_private/` search, for `.js`/`.json` modules. A leading `/` means **`pages/_private/` + path**, which differs from `include`. Options: `{ mode: 'raw' | 'script' | 'style' }`.
- Inside `_private` modules there are no template globals. Use `require('pocketpages').globalApi` for `env`, `dbg`, `stringify`, etc., or pass what's needed in as arguments.

More: [references/templates.md](references/templates.md) · API reference: [references/context-api.md](references/context-api.md)

## Debugging

- `dbg(...)` prints only with `--dev`. `info/warn/error` always print to the PocketBase logs.
- `debug: true` in `+config.js` shows exception messages and stack traces in the browser (500 page). Otherwise users see a generic error.
- `debug: 'verbose'` or env `DEBUG=1` adds internal routing/loader traces (noisy).
- "Value is not an object" usually means something you referenced is `undefined`, often a missing `module.exports` or a misspelled `resolve()` name.

## Deploying

What ships: `pb_*` folders **except `pb_data`**, `package.json`, the bun lockfile, `patches/`, and your **production `node_modules`**. PocketHost never runs `npm install`. The CLI uploads the installed `dependencies` tree, so:

- `pocketpages` and every `pocketpages-plugin-*` you use must be in `dependencies`, not `devDependencies`.
- Run `npm install` (or bun/pnpm) **before** deploying.
- A deploy mirrors your local code set: files under `pb_*` on the instance that aren't in your project are deleted. `pb_data` is never touched.

Preferred path:

1. **If a PocketHost MCP server is connected**, use its tools to find or create the instance, deploy, set secrets, and read logs.
2. **Otherwise use the CLI:**
   ```bash
   npm i -g pockethost
   pockethost login            # personal access token
   pockethost link <instance>  # writes .pockethostconfig (commit it); or `pockethost create <name> --link`
   pockethost deploy           # or `pockethost dev` to deploy on every change
   pockethost logs             # check the boot for "pocketpages startup" and errors
   ```
   In CI: `npx pockethost@latest deploy <instance>` with `POCKETHOST_TOKEN` set.

Secrets: read them with `env('NAME')` (returns `''` when unset). Set them with `pockethost secrets set NAME` (prompts for the value) or through the MCP, never in `_private/` files. Self-hosting on Fly.io and other details: [references/deploy.md](references/deploy.md)

## Reference files

- [references/request-lifecycle.md](references/request-lifecycle.md): middleware/`next()`, loaders, data merging, render pipeline, layouts and slots, status codes, redirects
- [references/templates.md](references/templates.md): EJS, include/resolve resolution, assets, meta, echo, slots
- [references/context-api.md](references/context-api.md): every property on the request context and global API, with exact signatures
- [references/jsvm.md](references/jsvm.md): Goja limits, `$app` DB cookbook, HTTP, npm compatibility
- [references/plugins.md](references/plugins.md): `+config.js`, official plugins (auth, js-sdk, realtime, datastar, marked, micro-dash), writing a plugin
- [references/deploy.md](references/deploy.md): PocketHost (MCP/CLI/CI), Fly.io, environment and secrets

Upstream docs (some examples are stale; trust this skill where they conflict): https://pocketpages.dev/docs · llms index: https://raw.githubusercontent.com/benallfree/pocketpages/main/llms.txt
