# pocketpages

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
