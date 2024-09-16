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
