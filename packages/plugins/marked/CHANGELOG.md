# pocketpages-plugin-marked

## 0.2.1

### Patch Changes

- PocketPages 0.x is retiring: PocketPages v1 is built into PocketBase CE (`pocketbase pages create`). This release adds a notice to the README and, for `pocketpages` and `create-pocketpages`, a one-line notice at startup. No other changes.

## 0.2.0

### Minor Changes

- 9197a13: Dependency updates:

  - `pocketpages`: bundle `cookie` 2 (switched to `parseCookie`/`stringifySetCookie`; `response.cookie()` and `request.cookies()` behave the same) and `@s-libs/micro-dash` 21. Declare `pocketbase-node` and `pocketbase-stringify` as dependencies; they were already required at runtime but were only installed because `pocketpages-plugin-ejs` depends on them.
  - `pocketpages-plugin-marked`: update to `marked` 18 and bundle it into the plugin, since `marked` 16+ is ESM-only and can't be `require()`d by the PocketBase JSVM. `marked` is no longer installed as a runtime dependency.
  - `pocketpages-plugin-micro-dash`: bundle `@s-libs/micro-dash` 21.
  - `pocketpages-plugin-ejs`: `pocketbase-stringify` 0.1.0.
  - `create-pocketpages`: `inquirer` 14. The starter picker now uses the `select` prompt, since inquirer 13 removed the `list` alias and 14 rejects unknown prompt types. Requires Node.js `^20.17.0 || ^22.13.0 || >=23.5.0` (`engines` updated to match).

## 0.1.1

### Patch Changes

- 3a4ab38: Remove unused dependencies (`remark-frontmatter`, `remark-frontmatter-yaml`, `remark-parse`, `remark-stringify`, `unified`). The plugin only uses `marked` and `front-matter`. Apps now ship far fewer packages in their production `node_modules`.

## 0.1.0

### Minor Changes

- 8fef39f: Plugins now require a `name` field

## 0.0.5

### Patch Changes

- Fix: bad build

## 0.0.4

### Patch Changes

- Removed workspace protocol from dependencies

## 0.0.3

- Initial release
