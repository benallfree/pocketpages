# Templates, partials, modules, assets

Default engine: `pocketpages-plugin-ejs` (handles `.ejs`; configurable `extensions`). Templates are rendered synchronously with `cache: false`, so edits show up on the next request. **New files still need a restart** to become routes.

## EJS basics

```ejs
<% const posts = $app.findRecordsByFilter('posts', 'published = true', '-created', 10) %>
<ul>
  <% posts.forEach((p) => { %>
    <li><a href="/posts/<%= p.get('slug') %>"><%= p.get('title') %></a></li>
  <% }) %>
</ul>
<%- trustedHtml %>   <%# unescaped, so only for content you control %>
```

- `<%= %>` escapes. `<%- %>` is raw. `<%# %>` is a comment. `<%_ _%>` trims whitespace.
- `<script server> … </script>` is rewritten to `<% … %>`. The opening tag must be exactly `<script server>`.
- `return` inside `<% %>` stops rendering. `return { … }` produces a JSON response.
- Every context API member is a bare variable (`params`, `data`, `request`, `meta`, …). The whole context is also available as `api`.
- `echo(...)` inside templates appends to the output. Objects are JSON-stringified.

## include(): partials

```ejs
<%- include('card.ejs', { title: p.get('title'), href: '/posts/' + p.get('slug') }) %>
<%- include('card', { … }) %>          <%# extension optional (tries configured extensions) %>
<%- include('/blog/_private/card.ejs') %>  <%# leading / = relative to pages/ %>
```

Resolution for a bare name: `<page dir>/_private/<name>`, then `<parent>/_private/<name>`, and so on up to `pages/_private/<name>`. The first match wins, so a child `_private` overrides an ancestor's. The error message lists every path tried.

- Included files go through EJS, then **through the other plugins** for their extension. Including `intro.md` with the marked plugin renders Markdown after EJS.
- Partials see **only** the locals you pass, not the page context. Pass plain values, not `api`, so partials stay pure. If a partial needs `asset()` or `meta()`, pass the function or its result explicitly.
- Prefer hoisting shared partials up to a common ancestor's `_private/` over reaching into sibling directories.
- Don't rely on `../name` "level jumping". It resolves to `<dir>/name` beside `_private`, not to the parent's `_private`. Use an absolute `/…/_private/…` path instead.

## resolve(): private JS/JSON modules

```ejs
<% const { getActiveProducts } = resolve('queries') %>   <%# finds _private/queries.js upward %>
<%- resolve('widget.js', { mode: 'script' }) %>          <%# inline <script> with a module shim %>
<%- resolve('theme.css', { mode: 'style' }) %>           <%# inline <style> %>
<% const raw = resolve('data.json', { mode: 'raw' }) %>  <%# file contents as a string %>
```

- Same upward `_private/` search as `include()`, trying `''`, `.js`, `.json`.
- **A leading `/` differs from include:** `resolve('/lib/x')` loads `pages/_private/lib/x`, not `pages/lib/x`.
- `mode: 'require'` (the default) uses PocketBase's `require`, so modules are cached for the process lifetime. Changes need a restart (automatic in `--dev`).
- Module scope has **no template globals**. Inside `_private/*.js`, use `$app` directly, and `require('pocketpages').globalApi` for `env`, `dbg`, `stringify`, `url`, `store`. Don't write `env.API_KEY` (an older docs example). It's `env('API_KEY')`.
- Export factories or plain functions. Avoid module-level state that assumes a single request.

## Layouts and slots

`+layout.ejs` (any handled extension) wraps everything rendered in its directory and below. Use `<%- slot %>` for the wrapped content.

Named slots, in a page:

```ejs
<!-- slot:head -->
<link rel="stylesheet" href="<%= asset('page.css') %>">
<!-- slot:body -->
<h1>Hello</h1>
```

In the layout:

```ejs
<head><%- slots.head || '' %></head>
<body><%- slots.body || slot %></body>
```

Slot rules (from `parseSlots`):

- A slot runs from its `<!-- slot:name -->` marker to the next marker or the end of the content.
- `slot` = `slots.default` if you defined `<!-- slot:default -->`. Otherwise it's whatever content **precedes the first marker**. It is not the full content. Once you use markers, put everything in named slots and use `slots.body || slot`.
- Each layout re-parses its own input. For nested layouts, the outer layout's `slot` is the inner layout's output.
- Layouts get `data` from middleware and loaders, plus the `meta()` values set by the page.

Scoping layouts: use route groups. `(site)/+layout.ejs` wraps pages in `(site)/` without affecting `xapi/` endpoints. HTMX/Datastar fragment endpoints should live outside any layout scope, or must render JSON or set their own Content-Type.

## meta()

```ejs
<% meta('title', 'Pricing') %>            <%# in page %>
<title><%= meta('title') || 'Site' %></title>  <%# in layout %>
```

A per-request key/value store, typically for title, description, and og tags. The marked plugin copies Markdown front-matter into `meta`.

## asset(): cache-busted static URLs

```ejs
<link rel="stylesheet" href="<%= asset('app.css') %>">   <%# → app.<sha256>.css %>
<img src="<%= asset('/images/logo.png') %>">
```

- Static files are fingerprinted by content hash computed at boot. The fingerprinted URL resolves back to the file, so you can cache it forever.
- Relative paths resolve against the page's directory. A leading `/` is relative to `pages/`.
- If the file isn't a known static route, the path comes back unchanged.
- Static files live alongside pages anywhere under `pages/` (commonly `pages/assets/`). PocketBase's own `pb_public/` also works, without fingerprinting.

## Markdown pages

With `pocketpages-plugin-marked` (and the EJS plugin configured with `extensions: ['.ejs', '.md']` listed **before** marked), `.md` files are routable pages and includable partials. EJS runs first, then Markdown. Headings get slug ids. Images go through `asset()`. Front-matter goes into `meta()`.
