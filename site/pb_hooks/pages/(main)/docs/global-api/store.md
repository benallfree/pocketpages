---
title: store - Global State Management
description: Access and manage global state in PocketPages applications
---

# `store` - Global State Management

The `store` function provides access to a global key-value store that persists for the lifetime of the PocketBase instance.

## Basic Usage

```javascript
// Set a value
store('myKey', 'myValue')

// Get a value
const value = store('myKey')
```

## Function Signature

- **Type**: `(name: string, value?: any) => any`
- **Parameters**:
  - `name`: Key to store/retrieve value
  - `value` (optional): Value to store. If omitted, returns the current value.
- **Returns**: Current value when getting, undefined when setting

## Examples

### Storing Values

```javascript
// Store simple values
store('userId', 123)
store('username', 'alice')
store('isAdmin', true)

// Store objects
store('userPrefs', {
  theme: 'dark',
  language: 'en',
})

// Store arrays
store('recentItems', ['item1', 'item2', 'item3'])
```

### Retrieving Values

```javascript
// Get stored values
const userId = store('userId')
const userPrefs = store('userPrefs')
const recentItems = store('recentItems')

// Handle missing values
const missing = store('nonexistent') // returns undefined
```

### Atomic Updates

When you need to read and then update a store value atomically (without interference from other concurrent operations), use `$app.runInTransaction()`:

```javascript
// Without transaction - potential race condition
const counter = store('counter') || 0
store('counter', counter + 1)

// With transaction - atomic update
$app.runInTransaction(() => {
  const counter = store('counter') || 0
  store('counter', counter + 1)
})

// Complex atomic updates
$app.runInTransaction(() => {
  const stats = store('stats') || { views: 0, users: {} }
  stats.views++
  stats.users[userId] = (stats.users[userId] || 0) + 1
  store('stats', stats)
})
```

## Template Usage

```ejs
<%%
  // Store page view count
  const views = store('pageViews') || 0
  store('pageViews', views + 1)
%>

<p>This page has been viewed <%%= views %> times.</p>

<%%
  // Store complex data
  store('lastAccess', {
    time: Date.now(),
    path: request.path
  })

  const lastAccess = store('lastAccess')
%>
```

## Best Practices

1. **Use Namespaced Keys**

```javascript
// Good: Namespaced keys
store('user:preferences', prefs)
store('cache:articles', articles)

// Avoid: Generic keys
store('preferences', prefs)
store('data', articles)
```

2. **Type Safety**

```javascript
// Good: Consistent types
store('counter', 0)
const counter = store('counter') || 0 // Provide default

// Avoid: Mixed types
store('value', '123')
store('value', 123)
```

3. **Cleanup**

```javascript
// Clear values when no longer needed
store('tempData', undefined)
```

## Important Notes

- Values persist for the lifetime of the PocketBase instance
- Store is shared across all requests
- Values must be JSON-serializable
- No built-in expiration mechanism
- Not suitable for sensitive data
- Use transactions for atomic read-modify-write operations

## Common Use Cases

- Caching expensive computations
- Storing application configuration
- Maintaining counters or statistics
- Sharing data between requests
- Managing feature flags
