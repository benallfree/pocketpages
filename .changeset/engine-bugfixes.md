---
'pocketpages': patch
---

Fix several request-handling bugs:

- A `redirect()` (or `json`/`html`/`file` response) from middleware or a loader now stops the request. Previously later middleware, loaders such as `+post.js`, and the page itself still ran.
- A param route like `[slug].ejs` no longer shadows a directory index page like `about/index.ejs`.
- Route params and path segments are URL-decoded.
- Route params no longer leak into `request.url.query`.
- `asset()` now fingerprints relative asset paths.
- `redirect(path, { message })` keeps the original query string intact instead of round-tripping it through JSON parsing.
- Pages that set a non-HTML `Content-Type` now send their rendered content, unless they already streamed a body with `echo`. `text/html; charset=...` is treated as HTML.
- Only object/array output is auto-served as JSON, so a page rendering `42` or `true` is sent as HTML.
- Dotfiles and dot-directories (except `.well-known`) and `*.pb.js`/`*.pb.ts` hook files under `pages/` are no longer served.
- `resolve('/...')` no longer hides syntax and runtime errors behind "No module found".
- A plugin factory can call `dbg()` while it is being created.
