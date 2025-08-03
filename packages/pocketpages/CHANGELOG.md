# pocketpages

## 0.22.3

### Patch Changes

- 1fdcbeb: Fix bad publish
- Updated dependencies [1fdcbeb]
  - pocketpages-plugin-ejs@0.1.2

## 0.22.2

### Patch Changes

- 097d937: Add debugging output for non-html content

## 0.22.1

### Patch Changes

- 5f35eaa: Fix: escape glob syntax for layout routing with multiple params route (#84)
- 5f35eaa: Feat: Algolia site search

## 0.22.0

### Minor Changes

- 8df3b91: store() returns new value after setting

## 0.21.0

### Minor Changes

- e8c3d96: Early return custom content types (proceed only if text/html)
- 7c30af9: Update params to include querystring values
- f0ed079: Automatically recursively parse URL querystring in request.url and globalApi.url

### Patch Changes

- 8c540ba: Fix: update header method to return string or undefined
- c01bf43: Improve invalid plugin error logic
- 31b4b38: add debug logging for header and echo responses in MiddlewareHandler
- 3317d2e: Add store() debugging output

## 0.20.0

### Minor Changes

- 92b14b4: Add support for DEBUG env var

### Patch Changes

- 7fe3aa1: Fix: restored Typescript typings

## 0.19.0

### Minor Changes

- 1e55ca2: Add `verbose` debugging option to debug core pocketpages operations

### Patch Changes

- 314441c: Do not display +config.js loading error if the file is not present
- c47a0ee: Update `minimal` starter to use Tailwind

## 0.18.2

### Patch Changes

- 46d4cd8: Fix: show detailed errors in debug mode only

## 0.18.1

### Patch Changes

- Fix bad publish

## 0.18.0

### Minor Changes

- Allow +config.js to be a function which takes globalApi

## 0.17.0

### Minor Changes

- 30b37be: Added next() handling to middleware

### Patch Changes

- pocketpages-plugin-ejs@0.1.0

## 0.16.0

### Minor Changes

- 8fef39f: Plugins now require a `name` field

### Patch Changes

- 41ceeda: Improved framework debugging output
- Updated dependencies [8fef39f]
- Updated dependencies [8fef39f]
  - pocketpages-plugin-ejs@0.1.0

## 0.15.6

### Patch Changes

- Updated dependencies [06b9fed]
  - pocketpages-plugin-ejs@0.0.7

## 0.15.5

### Patch Changes

- 2c597ff: Fix: escape XML on error messages
- Updated dependencies [b1c4f31]
- Updated dependencies [3712c73]
  - pocketpages-plugin-ejs@0.0.6

## 0.15.4

### Patch Changes

- ecb8f60: Fix: corrected handling of route params and parsing
- 3355a8c: Fix: corrected JSON response handling
- d1ade18: Enh: add `event` to request

## 0.15.3

### Patch Changes

- Fix: bad build
- Updated dependencies
  - pocketpages-plugin-ejs@0.0.5

## 0.15.2

### Patch Changes

- a612d93: Fix: renamed global plugin config context to globalApi
- 757334f: Enh: show error message if +config.js fails to load
- 19d5283: Fix: added missing pocketbase-log dep

## 0.15.1

### Patch Changes

- Added ejs dep
- Added package readme

## 0.15.0

### Breaking Changes

- PocketPages plugin architecture, PocketBase v0.25.5 minimum requirement
- Removed database helpers (use pb() instead)

### Patch Changes

- 37229a6: added support for +patch.js verb

## 0.14.1

### Patch Changes

- Add readme to NPM package

## 0.14.0

### Breaking Changes

- PocketPages is now loaded as an npm package

## 0.13.3

### Patch Changes

- Fix: update pocketbase-js-sdk-jsvm to 10003

## 0.13.2

### Patch Changes

- 2234146: Feat: realtime send()
- 1dfaacc: Fix: Windows compat

## 0.13.1

### Patch Changes

- cfadcd1: Feat: store() helper
- 3b9a0a0: Fix: absolute path names for reesolve() and include()

## 0.13.0

### Minor Changes

- 8c42876: Feat: authentication

### Patch Changes

- 788a17c: Enh: cookie paths now default to '/'
- 03e045d: Enh: request.cookies() now returns all cookies. Cookies automatically handle JSON in both directions
- c3b732c: Fix: Multiple <script server> now supported
- 1379e23: Enh: Added generic <T> to cookie()
- 6b911ce: Feat: added pick() to global API

## 0.12.5

### Patch Changes

- fcb8ed6: Improved require() error messaging

## 0.12.4

### Patch Changes

- e130735: Feat: requestVerification and confirmVerification
- e15e844: starter: added auth starter
- 8f85d48: Fix: allow partial options in signin methods
- 18402c1: Enh: redirect flash messages
- 14af14d: Feat: signInWithOTP
- 8cded65: Fix: added url() to global to match doccumentation
- 22af846: Enh: added option to automatically send verification email when a new user is created
- a5d9329: Feat: createPasswordlessUser
- 8a00a77: Enh: PocketBase JS client now automatically pulls auth info from Authorization header or pb_auth cookie
- 08be5d9: Feat: boot()

## 0.12.3

### Patch Changes

- 856b51d: Fix: post-process with markdown after EJS has been recursively parsed

## 0.12.2

### Patch Changes

- Feat: allow custom collection names for auth

## 0.12.1

### Patch Changes

- Fix: method-specific middleware was not executing

## 0.12.0

### Minor Changes

- b6163fc: Feat: MPA authentication methods and docs

### Patch Changes

- 70f1eda: Enh: capitalize request method names
- eb2717f: Feat: handle auth headers and cookies
- 1d55b8e: Feat: cookie() and header() support in Request and Response objects
- 3ddce12: Feat: support body() in request object

## 0.11.9

### Patch Changes

- Fix: restored db helpers to global API

## 0.11.8

### Patch Changes

- cf7b526: Fix: concurrency broken when ejs caching enabled

## 0.11.7

### Patch Changes

- a630553: Fix: improve undefined or null content return from ejs
- f4fae28: Enh: add body() and formData() to request object
- c38fe70: Fix: add env() to globals

## 0.11.6

### Patch Changes

- 1151a8a: Chore: updated pocketbase-ejs to improve BadRequestError handling
- cee3c3e: Enh: added shuffle() to global API
- b4d5894: Enh: added `raw` and `style` support to resolve()
- 9a6d543: Enh: improved exception handling error messages
- 281ae68: Fix: route returning undefined value now handled properly
- dc3c586: Enh: suppress PocketPages internal debugging by default

## 0.11.5

### Patch Changes

- 84d92ef: Fix: hide paths above root on exception tracebacks
- df4bc9b: Fix: ignore file extension on file path params
- 169ba6d: Enh: add 'mode' option to resolve()

## 0.11.4

### Patch Changes

- 11b33f5: Enh: introduce global API
- 3e9e44d: Fix: handle object returns from EJS
- 13edc33: Enh: improved line number error reporting
- d6306a4: Enh: improve require() error messaging

## 0.11.3

### Patch Changes

- 2ebb22c: Fix: Allow default handling of BadRequestError
- 7f52562: Fix content fingerprinting calculation
- dd96680: Feat: Add micro-dash helpers
- 42fe2f1: Add support for <script server> notation
- 3b680b5: Renamed require() to resolve()

## 0.11.2

### Patch Changes

- 939b761: Enh: params now support querystring values
- 624348e: Add support for auth, headers, and cookies
- 2b61021: Fix: bootstrap sequence
- 6e4d7ab: Fix: calculate asset fingerprints based on file contents

## 0.11.1

### Patch Changes

- Include dist directory

## 0.11.0

### Minor Changes

- Major refactoring

## 0.10.0

### Minor Changes

- PocketBase >= v0.23.0 now required.

## 0.9.6

### Patch Changes

- Remove /api and /\_ restriction

## 0.9.5

### Patch Changes

- Update starters with new install instructions

## 0.9.4

### Patch Changes

- htmx starter kit update, fixes, and docs

## 0.9.3

### Patch Changes

- Add mvp.css starter kit

## 0.9.2

### Patch Changes

- ac6674f: Docs: vscode starter kit
- 22b3e1c: Added htmx starter kit

## 0.9.1

### Patch Changes

- Added vscode starter kit

## 0.9.0

### Minor Changes

- Added support for Markdown frontmatter
- d0923d5: Introduced `slots` object for managing multiple layout slots
- d2fd7b5: Added meta() function

### Patch Changes

- 665c6b5: Starter kit fixes

## 0.8.2

### Patch Changes

- Updated starter kits

## 0.8.1

### Patch Changes

- Added starters to npm package

## 0.8.0

### Minor Changes

- Adjusted installation process

### Patch Changes

- Refreshed minimal starter project
- Minor bug fixes

## 0.7.0

### Minor Changes

- 31baf24: Enh: Added url() parser to context
- 31baf24: Enh: asset() resolver to add cache busting when $app.isDev()

### Patch Changes

- Enh: Markdown images now use apply() for cache busting

## 0.6.0

### Minor Changes

- 699aa06: Added support for +middleware.js
- b58a02b: Migrated to pocodex
- Doc updates for 0.5.0

### Patch Changes

- 699aa06: Swapped out deprecated $app.cache()
- ea831b0: Docs: added Gmail speedrun
- dc89a4c: Implement EJS caching using $app.cache()
- dc89a4c: Fix: UTF-8 support in template engine
- ea831b0: Docs: updated SES speedrun

## 0.5.1

### Patch Changes

- 96dc569: Fixed index.md location
- 96dc569: Fix: write initial index.md to pb_hooks/pages instead of just pages
- 96dc569: Fix: throw error of pages/ doesn't exist
- 96dc569: Fix: serve static file if exists

## 0.5.0

### Minor Changes

- 2c63a44: Migrated to pocodex plugin

## 0.4.2

### Patch Changes

- Added daisyui-docs starter kit

## 0.4.1

### Patch Changes

- 1c7f643: Fix: fs-extra/esm import

## 0.4.0

### Minor Changes

- 0fb14db: Add one time password (OTP) support and CLI `login` command
- 0fb14db: Added support for POCKETPAGES_HOME and POCKETPAGES_MOTHERSHIP_URL env vars
- 0fb14db: Added support for local settings storage (such as auth token)

### Patch Changes

- 0fb14db: Now using @inquirer/prompts

## 0.3.2

### Patch Changes

- c0b4178: Fix: degit command missing :D

## 0.3.1

### Patch Changes

- b840e84: Added logo
- b840e84: Fix: root page redirect loop
- b840e84: Updated homepage

## 0.3.0

### Minor Changes

- 6f82288: Added ability to only use the EJS preprocessor for specific file types (default .md and .ejs)

### Patch Changes

- 6f82288: Docs: Added Amazon SES SMTP speedrun
- 6f82288: Imroved log formatting
- 6f82288: Added support for +config.js in root
- 6f82288: Docs: added +config.js section
- 6f82288: Fix: redirect to / suffix if hitting index handler
- b27b11a: Speedrun: One-Time Passwords
- c9e2fb4: Added ca-certificates to Dockerfiles (needed for SMTP sending)
- 6f82288: Fixed static file serving bugs
- 6f82288: Enh: issue warning when loading from ./lib instead of npm package
- b27b11a: Cosmetic fixes

## 0.2.0

### Minor Changes

- 18450fb: Added `degit` command for better template support

### Patch Changes

- 18450fb: Doc fixes for starter kits
- 18450fb: Fixed `new` command where manual names weren't properly parsed
- 18450fb: Docs for custom domains
- 18450fb: Refactored starter kits & docs

## 0.1.1

### Patch Changes

- 323aaa3: Fixed bun compat in minimal and daisy starters and updated pocketpages dep

## 0.1.0

### Patch Changes

- df482a4: Fix doc site and starter kit to include bootstrap files
- 1a416fe: Added `pocketbase` support in package.json for version locking
- 1a416fe: Added `init` command
- Migrated to gobot-pocketbase
- df482a4: Copy to clipboard button touch device updates
- df482a4: Fix installation instructions
- 1a416fe: Added `serve` command
- 1a416fe: Added `version` command
- df482a4: Update home screen
- 1a416fe: Removed `dev` command in favor of `serve` command

## 0.0.5-rc.0

### Patch Changes

- df482a4: Fix doc site and starter kit to include bootstrap files
- 1a416fe: Added `pocketbase` support in package.json for version locking
- 1a416fe: Added `init` command
- df482a4: Copy to clipboard button touch device updates
- df482a4: Fix installation instructions
- 1a416fe: Added `serve` command
- 1a416fe: Added `version` command
- df482a4: Update home screen
- 1a416fe: Removed `dev` command in favor of `serve` command
