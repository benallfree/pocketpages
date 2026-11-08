---
'pocketpages-plugin-datastar': patch
---

Pin Datastar to v1.0.4 instead of the moving `@main` bundle, and switch the SPA helper to Datastar 1.0 attribute syntax (`data-on:click`, `data-on:popstate__window`). SPA navigation had silently fallen back to full page loads once `@main` moved to the colon syntax. The SPA helper now also restores the landing page on Back, and leaves modified clicks, `target` links and cross-origin links alone. Docs examples updated to 1.0 syntax.
