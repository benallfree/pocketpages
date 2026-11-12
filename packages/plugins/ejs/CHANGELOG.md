# pocketpages-plugin-ejs

## 0.2.1

### Patch Changes

- PocketPages 0.x is retiring: PocketPages v1 is built into PocketBase CE (`pocketbase pages create`). This release adds a notice to the README and, for `pocketpages` and `create-pocketpages`, a one-line notice at startup. No other changes.

## 0.2.0

### Minor Changes

- 9197a13: Update `pocketbase-ejs` to 7.0.2001 (synced with upstream EJS v7.0.2).

  - Template errors are now `EjsError`s with exact line numbers, including inside multi-line `<% %>` blocks. The message keeps the `file:line` header and source context, and ends with the original error type.
  - `BadRequestError` and other PocketBase API errors thrown in a template still pass through, so they keep their HTTP status.
  - Upstream hardening: template locals no longer resolve through the prototype chain. PocketPages passes `{ ...api, api }`, so every API helper is still available.

### Patch Changes

- 9197a13: Dependency updates:

  - `pocketpages`: bundle `cookie` 2 (switched to `parseCookie`/`stringifySetCookie`; `response.cookie()` and `request.cookies()` behave the same) and `@s-libs/micro-dash` 21. Declare `pocketbase-node` and `pocketbase-stringify` as dependencies; they were already required at runtime but were only installed because `pocketpages-plugin-ejs` depends on them.
  - `pocketpages-plugin-marked`: update to `marked` 18 and bundle it into the plugin, since `marked` 16+ is ESM-only and can't be `require()`d by the PocketBase JSVM. `marked` is no longer installed as a runtime dependency.
  - `pocketpages-plugin-micro-dash`: bundle `@s-libs/micro-dash` 21.
  - `pocketpages-plugin-ejs`: `pocketbase-stringify` 0.1.0.
  - `create-pocketpages`: `inquirer` 14. The starter picker now uses the `select` prompt, since inquirer 13 removed the `list` alias and 14 rejects unknown prompt types. Requires Node.js `^20.17.0 || ^22.13.0 || >=23.5.0` (`engines` updated to match).

## 0.1.2

### Patch Changes

- 1fdcbeb: Fix bad publish

## 0.1.1

### Patch Changes

- bc09f6c: Enh: improve debug messages by showing all paths searched

## 0.1.0

### Minor Changes

- 8fef39f: Plugins now require a `name` field

### Patch Changes

- 8fef39f: Fix: Includefile double render

## 0.0.7

### Patch Changes

- 06b9fed: Fix: include(file,data) now works properly

## 0.0.6

### Patch Changes

- b1c4f31: Fix: corrected build name and main source name
- 3712c73: Enh: include() with omitted extensions will search extensions[]

## 0.0.5

### Patch Changes

- Fix: bad build

## 0.0.4

### Patch Changes

- Removed workspace protocol from dependencies

## 0.0.3

- Initial release
