---
title: Logging Functions
description: Debug, info, warn, and error logging functions for request handling.
---

# Logging Functions

- **Type**: `Function(...args: any[]) => void`
- **Description**: Logging functions for different severity levels
- **Global**: Yes (available directly as `dbg()`, `info()`, etc.)
- **API Methods**: `api.dbg()`, `api.info()`, etc.

## Available Functions

- `dbg()` - Debug-level logging (only visible in `--dev` mode)
- `info()` - Informational messages
- `warn()` - Warning messages
- `error()` - Error messages

## Basic Usage

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  // Using API methods
  api.dbg('Debug:', { someData: 123 })
  api.info('Processing request...')

  // Using global functions
  warn('Deprecated feature used')
  error('Failed to load data:', error)

  return {
    /* ... */
  }
}
```

## Template Usage

```ejs
<!-- Debug output -->
<%% dbg('Rendering template with:', data) %>

<!-- Info message -->
<%% info('User viewed page') %>

<!-- Warning -->
<%% warn('Using fallback data') %>

<!-- Error -->
<%% error('Template error:', e) %>
```

## Development vs Production

### Development Mode

```javascript
// Visible in console with --dev flag
dbg('Debug message') // Shows in console
info('Info message') // Shows in console
warn('Warning') // Shows in console
error('Error') // Shows in console
```

### Production Mode

```javascript
dbg('Debug message') // Hidden
info('Info message') // Shows in console
warn('Warning') // Shows in console
error('Error') // Shows in console
```

## Best Practices

1. **Use Appropriate Levels**

   ```javascript
   // Good: Correct severity levels
   dbg('Processing data...') // Development details
   info('User logged in') // Normal operations
   warn('Cache miss') // Potential issues
   error('Database failed') // Actual problems

   // Bad: Wrong severity
   error('Processing data...') // Should be dbg
   dbg('Database failed') // Should be error
   ```

2. **Structured Data**

   ```javascript
   // Good: Structured logging
   dbg('User action', {
     userId: 123,
     action: 'login',
     timestamp: Date.now(),
   })

   // Avoid: Hard to parse
   dbg('User 123 logged in at', Date.now())
   ```

3. **Development Helpers**
   ```javascript
   // Good: Helpful debug info
   dbg('Route params:', params)
   dbg('Form data:', formData)
   dbg('Query result:', result)
   ```

## Important Notes

- `dbg()` only shows in development
- All functions accept multiple arguments
- Objects are automatically stringified
- Logs appear in PocketBase console
- Use for debugging and monitoring

## Reference

- [API Documentation](/docs-next/api)
