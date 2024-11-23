---
title: Directory Structure
description: File organization requirements and conventions for PocketPages applications, including the mandatory pb_hooks/pages/ root directory and examples of nested page structures.
---

# Directory Structure

All PocketPages must reside within the `pb_hooks/pages/` directory of your project. This is the designated location where PocketPages looks for pages to serve.

### Example Structure:

```
pb_hooks/
   pages/
      index.ejs
      about.ejs
      contact.ejs
      products/
         index.ejs
         details.ejs
```
