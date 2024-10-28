---
title: requirePrivate - Loading Private Files
description: Load files from the root _private directory securely in PocketPages templates using the requirePrivate function.
---

# `requirePrivate` - Loading Private Files

- **Type**: `Function(path: string) => any`
- **Description**: Loads files from the root `_private` directory. This function provides a secure way to include configuration files, utilities, or modules that should not be publicly accessible through routes.

## Key Features

1. Always loads from the root `_private` directory
2. Supports JavaScript modules and JSON files
3. Caches loaded modules for better performance
4. Prevents access to files outside the `_private` directory

## Directory Structure

```
pb_hooks/
  pages/
    _private/           # Root private directory
      config.js
      auth.js
      database/
        queries.js
    products/
      index.ejs
```

## Example Usage

### Loading Configuration

```ejs
<%%
// Load configuration from _private/config.js
const config = requirePrivate('config')

// Use configuration values
const apiKey = config.apiKey
const baseUrl = config.baseUrl
%>
```

### Loading Utility Functions

```ejs
<%%
// Load auth utilities from _private/auth.js
const auth = requirePrivate('auth')

// Use auth functions
if (!auth.hasPermission(ctx)) {
    return ctx.redirect('/login')
}
%>
```

### Loading from Subdirectories

```ejs
<%%
// Load from _private/database/queries.js
const queries = requirePrivate('database/queries')

// Use database queries
const products = queries.getActiveProducts()
%>
```

## Example Private Files

### `_private/config.js`

```javascript
module.exports = {
  apiKey: env.API_KEY,
  baseUrl: 'https://api.example.com',
  limits: {
    maxUploadSize: 5 * 1024 * 1024, // 5MB
    maxResults: 100,
  },
}
```

### `_private/auth.js`

```javascript
module.exports = {
  hasPermission: (ctx) => {
    const token = ctx.cookie('auth_token')
    return $app.dao().findAuthRecordByToken(token) !== null
  },
  getUser: (ctx) => {
    const token = ctx.cookie('auth_token')
    return $app.dao().findAuthRecordByToken(token)
  },
}
```

## Important Notes

1. Files must be in the root `_private` directory or its subdirectories
2. Use for server-side logic and configuration only
3. Don't store sensitive credentials directly in files - use environment variables
4. Files in `_private` are not accessible via HTTP routes
5. Changes to private files require a server restart in production
6. Async/await is not available in the JSVM - use promises or callbacks instead

## Best Practices

1. **Organize by Function**: Group related functionality into separate files

   ```
   _private/
     config/
       development.js
       production.js
     auth/
       permissions.js
       validation.js
     database/
       queries.js
       migrations.js
   ```

2. **Use Environment Variables**: For sensitive data

   ```javascript
   // _private/config.js
   module.exports = {
     apiKey: env.API_KEY, // Good
     secret: 'hardcoded-bad', // Bad
   }
   ```

3. **Export Clean Interfaces**: Make your private modules easy to use
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

See [Private Files](/docs/private-files) for more information about working with private files and directories in PocketPages.
