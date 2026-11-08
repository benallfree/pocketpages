---
'pocketpages-plugin-micro-dash': patch
---

The published types now import `PluginFactory` from `pocketpages` instead of bundling a copy of PocketPages' internal types, which also imported packages this plugin doesn't depend on.
