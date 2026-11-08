---
'pocketpages-plugin-ejs': minor
---

Update `pocketbase-ejs` to 7.0.2001 (synced with upstream EJS v7.0.2).

- Template errors are now `EjsError`s with exact line numbers, including inside multi-line `<% %>` blocks. The message keeps the `file:line` header and source context, and ends with the original error type.
- `BadRequestError` and other PocketBase API errors thrown in a template still pass through, so they keep their HTTP status.
- Upstream hardening: template locals no longer resolve through the prototype chain. PocketPages passes `{ ...api, api }`, so every API helper is still available.
