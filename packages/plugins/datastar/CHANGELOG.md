# pocketpages-plugin-datastar

## 0.2.2

### Patch Changes

- PocketPages 0.x is retiring: PocketPages v1 is built into PocketBase CE (`pocketbase pages create`). This release adds a notice to the README and, for `pocketpages` and `create-pocketpages`, a one-line notice at startup. No other changes.
- Updated dependencies
  - pocketpages-plugin-realtime@0.2.1

## 0.2.1

### Patch Changes

- bdaff72: Pin Datastar to v1.0.4 instead of the moving `@main` bundle, and switch the SPA helper to Datastar 1.0 attribute syntax (`data-on:click`, `data-on:popstate__window`). SPA navigation had silently fallen back to full page loads once `@main` moved to the colon syntax. The SPA helper now also scrolls the page to the top on link clicks (like a normal page load), restores the landing page and your scroll position on Back/Forward, and leaves modified clicks, `target` links and cross-origin links alone. Docs examples updated to 1.0 syntax.

## 0.2.0

### Minor Changes

- d86fe39: Add SPA support

## 0.1.2

### Patch Changes

- 1822c74: Datastar spelling corrections

## 0.1.1

### Patch Changes

- Fix: broken realtime dep

## 0.1.0

### Minor Changes

- 7ce7022: $clientId now populated with PocketBase realtime subscription client ID
- a0980dd: Add patchSignals() helper
- cb5b481: Add realtimeOptions param

### Patch Changes

- 6ddd797: add patch and signal debugging info
- bdec36e: defer script loading
