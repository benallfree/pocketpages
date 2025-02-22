---
title: Boot Process
description: Configure PocketPages startup behavior using the boot() function in +config.js
---

# Boot Process

The `boot()` function in `+config.js` allows you to execute code during PocketPages initialization, before any routes are processed. This function receives the global API as its argument, giving you access to core PocketPages functionality during startup.

## Basic Usage

```javascript
// +config.js
module.exports = {
  boot: (api) => {
    api.dbg('PocketPages starting up...')
  },
}
```

See [Global API](/docs/global-api) for available methods.

## Common Use Cases

### Setting Up Logging

```javascript
module.exports = {
  boot: ({ dbg, info }) => {
    // Configure startup logging
    dbg('Boot process starting...')
    info('PocketPages initializing...')
  },
}
```

### Database Initialization

```javascript
module.exports = {
  boot: ({ findRecordByFilter, dbg }) => {
    // Verify required collections exist
    try {
      const settings = findRecordByFilter('settings', 'id != ""')
      dbg('Database connection verified')
    } catch (e) {
      throw new Error('Required collections not found')
    }
  },
}
```

### Environment Validation

```javascript
module.exports = {
  boot: ({ env, error }) => {
    // Check required environment variables
    const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']
    const missing = required.filter((key) => !env(key))

    if (missing.length > 0) {
      error(`Missing required env vars: ${missing.join(', ')}`)
      throw new Error('Configuration incomplete')
    }
  },
}
```

### User Setup

```javascript
module.exports = {
  boot: ({ createUser, findRecordByFilter, dbg }) => {
    // Ensure admin user exists
    try {
      const admin = findRecordByFilter('users', 'email = "admin@example.com"')
      if (!admin) {
        createUser('admin@example.com', 'changeme', {
          sendVerificationEmail: false,
        })
        dbg('Created admin user')
      }
    } catch (e) {
      dbg('Error creating admin:', e)
    }
  },
}
```

## Important Notes

1. **Execution Timing**

   - Runs during PocketPages initialization
   - Executes before any routes are processed
   - Only runs once per server start

2. **Error Handling**

   - Uncaught errors will prevent startup
   - Use try/catch for non-critical operations
   - Log errors for debugging

3. **Best Practices**

   - Keep boot logic minimal and focused
   - Use for essential initialization only
   - Avoid long-running operations
   - Log important operations for debugging

4. **Limitations**
   - Cannot use request/response context
   - No access to middleware or route information

## See Also

- [Runtime Configuration](/docs/config)
- [Global API Reference](/docs/global-api)
- [Environment Variables](/docs/global-api/env)
