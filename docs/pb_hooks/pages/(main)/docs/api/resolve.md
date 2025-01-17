---
title: resolve - Loading Private Modules
description: Load files from _private directories securely in PocketPages templates using the resolve function.
---

# `resolve` - Loading Private Modules

- **Type**: `Function(path: string) => any`
- **Description**: Loads JavaScript modules or JSON files from `_private` directories, following an upward directory traversal pattern to find the requested file.

## Directory Resolution

PocketPages looks for resolved files in `_private` directories, starting from the current template's directory and working up through parent directories until the file is found. This system provides:

- Secure file access (directories starting with `_private` are never routed)
- Ability to share common modules by "hoisting" them to ancestor directories
- Section-specific private modules that are only available to that section
- Ability to override parent modules by having a local version with the same name
- Simplified path management since you rarely need relative paths

### Example Directory Structure

```
pb_hooks/
  pages/
    _private/                 # Global private files
      config.js
      auth.js
    products/
      _private/              # Product-specific files
        queries.js
        helpers.js
      categories/
        _private/            # Category-specific files
          formatter.js
        index.ejs
      index.ejs
    index.ejs
```

## Using resolve

### Basic Usage

```ejs
<%%
// Looks for config.js in _private directories, starting from current directory up
const config = resolve('config')

// Use the loaded module
const apiKey = config.apiKey
%>
```

### Resolution Rules

When resolving a file path, PocketPages will:

1. Start in the current template's directory, looking for `_private/filename`
2. If not found, check the parent directory for `_private/filename`
3. Continue up the directory tree until the file is found or the root is reached

You have several options for controlling this resolution:

- **Simple name**: Just specify the file name (e.g., `config`) to use the automatic resolution system
- **Absolute paths**: Start with `/` to specify an explicit path from the root (e.g., `/products/_private/queries`)
- **Level jumping**: Use `../` prefix to skip the local `_private` directory and force resolution from a parent level

### Examples

Given the directory structure above:

```ejs
<%%
// In /products/categories/index.ejs:
const formatter = resolve('formatter')    // Uses /products/categories/_private/formatter.js
const queries = resolve('queries')        // Uses /products/_private/queries.js
const config = resolve('config')          // Uses /_private/config.js

// Using absolute path
const productQueries = resolve('/products/_private/queries')

// Level jumping
const parentHelpers = resolve('../helpers')  // Skips local _private/helpers.js and uses parent's version
%>
```

## Example Private Files

### Global Configuration

```javascript
// _private/config.js
module.exports = {
  apiKey: env.API_KEY,
  baseUrl: 'https://api.example.com',
  limits: {
    maxUploadSize: 5 * 1024 * 1024,
    maxResults: 100,
  },
}
```

### Section-Specific Utilities

```javascript
// products/_private/queries.js
module.exports = {
  getActiveProducts: () => {
    return $app.dao().findRecordsByExpr('products', 'status = ?', ['active'])
  },
  getCategoryProducts: (categoryId) => {
    return $app
      .dao()
      .findRecordsByExpr('products', 'category = ?', [categoryId])
  },
}
```

## Best Practices

1. **Organize by Function**: Group related functionality into logical directories

   ```
   _private/
     config/
       development.js
       production.js
     auth/
       permissions.js
       validation.js
   ```

2. **Use Environment Variables**: For sensitive data

   ```javascript
   // _private/config.js
   module.exports = {
     apiKey: env.API_KEY, // Good
     secret: 'hardcoded-bad', // Bad
   }
   ```

3. **Export Clean Interfaces**: Make your modules easy to use

   ```javascript
   // _private/database.js
   module.exports = {
     query: (sql, params) => {
       return $app.dao().findRecordsByExpr('table', sql, params)
     },
     getRecord: (collection, id) => {
       return $app.dao().findRecordById(collection, id)
     },
   }
   ```

## Important Notes

1. Files must be in a `_private` directory
2. Use for server-side logic and configuration only
3. Don't store sensitive credentials directly in files - use environment variables
4. Changes to private files require a server restart in production
5. Async/await is not available in the JSVM - use promises or callbacks instead

See [Private Files](/docs/private-files) for more information about working with private files and directories in PocketPages.
