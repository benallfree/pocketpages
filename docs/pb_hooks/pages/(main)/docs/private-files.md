---
title: Working with Private Files and Directories in PocketPages
description: Learn how PocketPages uses _private directories to organize and protect both template partials and JavaScript modules.
---

# Working with Private Files and Directories

## File Naming Conventions

PocketPages has two special naming conventions:

1. Directories named `_private` are used for private files and are never publicly routable
2. Files that begin with `+` (like `+load.js` and `+layout.ejs`) are special PocketPages files and are not routable

Examples:

```
pb_hooks/
  pages/
    _private/           # Private directory (not routable)
    helpers/            # Normal directory (routable)
    +load.js           # Special PocketPages file (not routable)
    +layout.ejs        # Special PocketPages file (not routable)
    index.ejs          # Normal route file (routable)
```

PocketPages implements a powerful system for managing private files through `_private` directories. This system serves two main purposes:

1. Organizing and including template partials via `include()`
2. Loading JavaScript modules via `resolve()`

Both functions follow the same directory traversal pattern, making it intuitive to organize and access private files throughout your application.

## The `_private` Directory System

### Core Concepts

- Directories named `_private` are never publicly routable
- Files are resolved by searching `_private` directories up the directory tree
- Each section can have its own private files
- Child directories can override parent files of the same name
- Files can be "hoisted" to ancestor directories to be shared

### Example Directory Structure

```
pb_hooks/
  pages/
    _private/                 # Global shared files
      layout.ejs             # Base layout template
      auth.js                # Authentication utilities
      config.js              # Global configuration
    products/
      _private/              # Product-specific files
        product-card.ejs     # Product display partial
        queries.js           # Product database queries
      categories/
        _private/            # Category-specific files
          category-nav.ejs   # Category navigation partial
          helpers.js         # Category-specific utilities
        index.ejs
      index.ejs
    index.ejs
```

## File Resolution

When you call `include()` or `resolve()`, PocketPages:

1. Starts in the current template's directory
2. Looks for the file in that directory's `_private` folder
3. If not found, moves up to the parent directory and checks its `_private` folder
4. Continues until the file is found or reaches the root

This creates a natural hierarchy where:

- Files used by many pages live higher in the tree
- Files specific to a section stay close to where they're used
- Override files when needed by creating local versions

### Example Resolution

```ejs
<%%
// In /products/categories/index.ejs:

// Looks for category-nav first in local _private, then up the tree
include('category-nav.ejs')      // Uses /products/categories/_private/category-nav.ejs

// Product card isn't in local _private, so checks parent directories
include('product-card.ejs')      // Uses /products/_private/product-card.ejs

// Global layout is found in the root _private
include('layout.ejs')            // Uses /_private/layout.ejs

// Same pattern works for resolve
const helpers = resolve('helpers')     // Uses local /categories/_private/helpers.js
const queries = resolve('queries')     // Uses parent /products/_private/queries.js
const config = resolve('config')       // Uses root /_private/config.js
%>
```

## Path Control

While the automatic resolution system handles most cases elegantly, you sometimes need more control:

```js
// Absolute paths start from the root
include('/products/_private/product-card.ejs')
resolve('/products/_private/queries')

// Use ../ to skip the local _private and force parent resolution
include('../layout.ejs')
resolve('../helpers')
```

## Best Practices

### 1. Proximity Principle

Keep private files close to where they're used:

```
products/
  _private/
    product-card.ejs     # Used only in products section
    product-queries.js   # Product-specific database logic
  index.ejs
```

### 2. Strategic Hoisting

Move files up the tree when they become widely used:

```
_private/
  layout.ejs            # Used across the site
  auth.js              # Global authentication
products/
  _private/
    product-card.ejs    # Used only in products
```

### 3. Logical Overrides

Override parent files when needed for specialization:

```
_private/
  header.ejs           # Default site header
admin/
  _private/
    header.ejs         # Special admin header
```

### 4. Clean Interfaces

Export clear, focused interfaces from JavaScript modules:

```javascript
// _private/database.js
module.exports = {
  query: (sql, params) => {
    // Database query logic
  },
  getRecord: (id) => {
    // Record retrieval logic
  },
}
```

## Important Notes

1. Files in `_private` directories are never publicly accessible
2. Changes to private files require a server restart in production
3. Use environment variables for secrets, not private files
4. Private files are perfect for:
   - Reusable template components
   - Server-side utilities
   - Configuration
   - Database queries
   - Business logic

## The Power of Convention

This system's strength comes from its conventions:

- Predictable file location
- Natural code organization
- Clear separation of concerns
- Easy code sharing
- Simple overrides
- Minimal path management

By following these patterns, you can build maintainable applications where code lives where it makes sense, while still being easy to find and use.

See [resolve](/docs/api/resolve) and [Using Partials](/docs/partials) for detailed documentation of the specific functions.
