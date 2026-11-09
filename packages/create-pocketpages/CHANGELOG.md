# create-pocketpages

## 0.2.1

### Patch Changes

- 9197a13: Dependency updates:

  - `pocketpages`: bundle `cookie` 2 (switched to `parseCookie`/`stringifySetCookie`; `response.cookie()` and `request.cookies()` behave the same) and `@s-libs/micro-dash` 21. Declare `pocketbase-node` and `pocketbase-stringify` as dependencies; they were already required at runtime but were only installed because `pocketpages-plugin-ejs` depends on them.
  - `pocketpages-plugin-marked`: update to `marked` 18 and bundle it into the plugin, since `marked` 16+ is ESM-only and can't be `require()`d by the PocketBase JSVM. `marked` is no longer installed as a runtime dependency.
  - `pocketpages-plugin-micro-dash`: bundle `@s-libs/micro-dash` 21.
  - `pocketpages-plugin-ejs`: `pocketbase-stringify` 0.1.0.
  - `create-pocketpages`: `inquirer` 14. The starter picker now uses the `select` prompt, since inquirer 13 removed the `list` alias and 14 rejects unknown prompt types. Requires Node.js `^20.17.0 || ^22.13.0 || >=23.5.0` (`engines` updated to match).

## 0.2.0

### Minor Changes

- 8fa2b0f: New projects now include the PocketPages agent skill in `.claude/skills/pocketpages/`, plus an `AGENTS.md` (and a `CLAUDE.md` that imports it) so coding agents know how to work with PocketPages.

## 0.1.1

### Patch Changes

- 1822c74: Datastar spelling corrections

## 0.1.0

### Minor Changes

- adf7356: Load starters from remote with local fallback
- 6868cdd: Allow starter kit name and destination to be CLI args

### Patch Changes

- c97a54c: Add Datastar starter

## 0.0.1

Initial release
