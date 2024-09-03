# pocketpages

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
