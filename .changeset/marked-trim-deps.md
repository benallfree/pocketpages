---
'pocketpages-plugin-marked': patch
---

Remove unused dependencies (`remark-frontmatter`, `remark-frontmatter-yaml`, `remark-parse`, `remark-stringify`, `unified`). The plugin only uses `marked` and `front-matter`. Apps now ship far fewer packages in their production `node_modules`.
