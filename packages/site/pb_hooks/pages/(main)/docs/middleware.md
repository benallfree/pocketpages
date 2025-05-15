---
title: Using Middleware in PocketPages
description: Execute route-based middleware for authentication, data loading, request processing, and more.
---

# Middleware

Middleware files (`+middleware.js`) process requests before they reach your templates. Use middleware to:

- Check authentication
- Load shared data
- Set headers
- Validate requests
- Handle errors

## Basic Example

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { request, redirect } = api

  // Check auth
  if (!request.header('Authorization')) {
    redirect('/login')
    return {}
  }

  // Load data
  const categories = $app.findRecordsByFilter('categories', {
    filter: 'active = true',
  })

  return { categories }
}
```

## How Middleware Works

Middleware executes hierarchically from root to leaf:

```
pb_hooks/pages/
  +middleware.js         # Runs first (all routes)
  products/
    +middleware.js       # Runs second (/products/*)
    [id]/
      +middleware.js     # Runs third (/products/[id]/*)
```

For URL `/products/123`:

1. `/+middleware.js` runs
2. `/products/+middleware.js` runs
3. `/products/[id]/+middleware.js` runs

## Common Use Cases

### Auth Guard

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { request, redirect } = api

  const session = request.cookie('session')
  if (!session) {
    redirect('/login')
    return {}
  }

  const user = findRecordByFilter('users', {
    filter: `session = "${session}"`,
  })

  return { user }
}
```

### Request Validation

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { request, response, params } = api

  if (!params.id?.match(/^[0-9]+$/)) {
    response.status(400)
    return { error: 'Invalid ID' }
  }

  return {}
}
```

### Loading Data

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { params, response } = api

  const product = findRecordByFilter('products', {
    filter: `id = "${params.id}"`,
  })

  if (!product) {
    response.status(404)
    return { error: 'Not found' }
  }

  return { product }
}
```

## Using Middleware Data

Access middleware data in templates through `data`:

```ejs
<%% if (data.user) { %>
  <h1>Welcome, <%%= data.user.name %></h1>

  <%% if (data.product) { %>
    <h2><%%= data.product.name %></h2>
    <p><%%= data.product.description %></p>
  <%% } %>
<%% } %>
```

## Important Notes

- Middleware runs before page loaders (`+load.js`)
- All middleware along the route path executes
- Return an object to pass data to templates
- Return early to stop processing
- Keep processing efficient

## HTTP Method-Specific Middleware

In addition to `+middleware.js` which runs for all HTTP methods, you can create method-specific middleware files that only run for specific HTTP methods:

```javascript
// +get.js - Only runs for GET requests
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  // Handle GET requests
  return {}
}

// +post.js - Only runs for POST requests
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  // Handle POST requests
  return {}
}
```

Supported method-specific middleware files:

- `+get.js`
- `+post.js`
- `+put.js`
- `+patch.js`
- `+delete.js`

These files follow the same hierarchical execution order as `+middleware.js`.

## Reference

- [Loading Data Guide](/docs/loading-data)
- [API Documentation](/docs/context-api)
