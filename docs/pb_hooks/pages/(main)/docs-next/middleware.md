---
title: Using Middleware in PocketPages
description: Execute route-based middleware for authentication, data loading, request processing, and more.
---

# Using Middleware in PocketPages

PocketPages uses `+middleware.js` files to process requests before they reach your templates. Middleware can:

- Guard routes with authentication checks
- Process and validate requests
- Set response headers
- Load shared data
- Transform request/response
- Handle errors

Each middleware receives the PocketPages API object and executes hierarchically from root to leaf along the route path.

## Basic Usage

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { request, response, redirect } = api

  // Guard route
  if (!request.header('Authorization')) {
    redirect('/login')
    return {}
  }

  // Set headers
  response.header('X-Frame-Options', 'DENY')

  // Load shared data
  const categories = findRecordsByFilter('categories', {
    filter: 'active = true',
  })

  return { categories }
}
```

## Common Use Cases

### Authentication Guards

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

  if (!user) {
    response.clearCookie('session')
    redirect('/login')
    return {}
  }

  return { user }
}
```

### Request Validation

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { request, response, params } = api

  // Validate required parameters
  if (!params.id?.match(/^[0-9]+$/)) {
    response.status(400)
    return { error: 'Invalid ID format' }
  }

  // Check content type
  if (
    request.method === 'POST' &&
    !request.header('Content-Type')?.includes('application/json')
  ) {
    response.status(415)
    return { error: 'JSON required' }
  }

  return {}
}
```

### Response Headers

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { response } = api

  // Security headers
  response.header('X-Frame-Options', 'DENY')
  response.header('X-Content-Type-Options', 'nosniff')
  response.header('Referrer-Policy', 'same-origin')

  return {}
}
```

## File Structure

Middleware files execute hierarchically:

```
pb_hooks/pages/
  +middleware.js     # Executes first for all routes
  +load.js           # Only executes if index.ejs is the entry point
  index.ejs          # Home page template
  products/
    +middleware.js   # Executes second for /products/* routes
    +load.js         # Only executes if products/index.ejs is entry point
    [id]/
      +middleware.js # Executes third for /products/[id]/* routes
      +load.js       # Only executes if [id]/index.ejs is entry point
      index.ejs      # Template using the data
```

> **Important**: All `+middleware.js` files along the route path execute in order, from root to leaf. This is different from `+load.js` files, where only the leaf-level file executes. Use middleware when you need cascading data loading.

### Example: Route `/products/123`

If the route resolves to `/products/123/index.ejs`:

1. **Middleware Execution** (cascading, root to leaf):

   ```
   /+middleware.js
   /products/+middleware.js
   /products/[id]/+middleware.js
   ```

2. **Loader Execution** (single file):
   ```
   /products/[id]/+load.js  # Only this loader executes
   ```

## Example Scenarios

### Global Auth Check

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { request, redirect } = api

  const token = request.header('Authorization')
  if (!token) {
    redirect('/login')
    return {}
  }

  return {
    isAuthenticated: true,
  }
}
```

### Product Section Data

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter } = api

  const categories = findRecordsByFilter('categories', {
    filter: 'active = true',
    sort: 'name',
  })

  return { categories }
}
```

### Single Product Context

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { findRecordByFilter, params, response } = api

  const product = findRecordByFilter('products', {
    filter: `id = "${params.id}"`,
  })

  if (!product) {
    response.status(404)
    return { error: 'Product not found' }
  }

  return { product }
}
```

## Using Middleware Data

### Basic Example

```ejs
<!-- Check auth from root middleware -->
<%% if (data.isAuthenticated) { %>
  <!-- Show categories from products middleware -->
  <aside>
    <%% data.categories.forEach(cat => { %>
      <a href="/products?cat=<%%= cat.id %>">
        <%%= cat.name %>
      </a>
    <%% }) %>
  </aside>
<%% } %>
```

### Complete Example

```ejs
<!DOCTYPE html>
<html>
<head>
  <title><%%= data.product?.name || 'Products' %></title>
</head>
<body>
  <%% if (!data.isAuthenticated) { %>
    <h1>Please Log In</h1>
  <%% } else if (data.error) { %>
    <h1>Error: <%%= data.error %></h1>
  <%% } else { %>
    <aside>
      <h2>Categories</h2>
      <%% data.categories.forEach(cat => { %>
        <a href="/products?cat=<%%= cat.id %>">
          <%%= cat.name %>
        </a>
      <%% }) %>
    </aside>

    <main>
      <h1><%%= data.product.name %></h1>
      <p><%%= data.product.description %></p>
    </main>
  <%% } %>
</body>
</html>
```

## Best Practices

1. **Clear Purpose**

   ```javascript
   // Good: Single responsibility
   module.exports = function (api) {
     // Just handles auth
     if (!api.request.header('Authorization')) {
       api.redirect('/login')
     }
     return {}
   }

   // Avoid: Mixed concerns
   module.exports = function (api) {
     // Auth + data loading + headers + ...
     // Too many responsibilities
   }
   ```

2. **Early Returns**

   ```javascript
   // Good: Return early on failure
   module.exports = function (api) {
     if (!isValid(api.params)) {
       api.response.status(400)
       return { error: 'Invalid params' }
     }
     // Continue processing...
   }
   ```

3. **Error Handling**
   ```javascript
   module.exports = function (api) {
     try {
       // Risky operations...
     } catch (error) {
       api.response.status(500)
       return { error: 'Server error' }
     }
   }
   ```

## Important Notes

- Middleware executes hierarchically
- Can modify request/response
- Can halt request processing
- Can return data for templates
- Executes before loaders
- Keep processing efficient

## Reference

- [Loading Data Guide](/docs-next/loading-data)
- [API Documentation](/docs-next/api)
