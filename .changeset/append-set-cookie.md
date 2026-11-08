---
'pocketpages': patch
---

`response.cookie()` now appends a `Set-Cookie` header instead of replacing it, so setting several cookies in one request (for example signing in while clearing another cookie) keeps all of them.

`redirect()` only adds the `?__flash=` query parameter when a `message` is given, so plain redirects keep clean URLs.
