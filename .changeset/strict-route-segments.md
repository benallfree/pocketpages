---
'pocketpages': patch
---

Fix route matching to require the URL and route to have the same number of segments. Previously `about.ejs` also served `/about/x/y`, `products/[id]/` captured `/products` (with an undefined param) ahead of `products/index.ejs`, and param routes such as `pages/api/[x].ejs` swallowed deeper paths including PocketBase's own `/api/...` REST routes.
