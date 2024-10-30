---
title: Loading Data in PocketPages
description: Load and compute data before template rendering using +load.js files.
---

# Loading Data in PocketPages

PocketPages uses `+load.js` files to load data before rendering templates. Each loader receives the PocketPages API object and can return data that becomes available in your templates.

## Basic Usage

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter } = api

  const products = findRecordsByFilter('products', {
    filter: 'active = true',
    sort: 'name',
  })

  return { products }
}
```

## File Structure

Data loaders follow your route hierarchy:

```
pb_hooks/pages/
  +load.js           # Only executes if index.ejs is the entry point
  +middleware.js     # Always executes for any route
  index.ejs          # Home page entry point
  products/
    +load.js         # Only executes if products/index.ejs is the entry point
    +middleware.js   # Executes for any route under /products
    [id]/
      +load.js       # Only executes if [id]/index.ejs is the entry point
      +middleware.js # Executes for any route under /products/[id]
      index.ejs      # Template using data
```

> **Important**: Only a single `+load.js` file executes per request - the one at the same level as the entry point EJS file. This is different from `+middleware.js` files, which execute hierarchically from root to leaf along the route path. Use middleware when you need cascading data loading.

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

3. **Template Rendering**:
   ```
   /products/[id]/index.ejs
   ```

## Example Scenarios

### Product List (`/products`)

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter } = api

  const products = findRecordsByFilter('products', {
    filter: 'active = true',
    sort: '-created',
  })

  return { products }
}
```

### Product Details (`/products/[id]`)

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
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

## HTTP Method-Specific Loaders

In addition to `+load.js`, PocketPages supports method-specific loaders that only execute for their respective HTTP methods:

```
pb_hooks/pages/
  contact/
    +load.js     # Runs for all methods
    +get.js      # Runs only for GET, after +load.js
    +post.js     # Runs only for POST, after +load.js
    index.ejs
```

### Execution Order

1. `+load.js` executes first (if present)
2. Method-specific loader executes second (if present)
3. Data from both loaders is merged

### Example: Contact Form

```javascript
// contact/+load.js - Runs for all methods
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  return {
    departments: findRecordsByFilter('departments', {
      filter: 'active = true',
    }),
  }
}

// contact/+get.js - Runs only for GET requests
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  return {
    csrf: generateToken(),
  }
}

// contact/+post.js - Runs only for POST requests
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { formData, redirect } = api

  try {
    const message = findRecordByFilter('messages', {
      create: {
        email: formData.email,
        message: formData.message,
        department: formData.department,
      },
    })

    redirect('/contact/success')
  } catch (error) {
    return {
      error: 'Failed to send message',
      values: formData,
    }
  }
}
```

### Available Method Loaders

- `+load.js` - Runs for all HTTP methods
- `+get.js` - GET requests only
- `+post.js` - POST requests only
- `+put.js` - PUT requests only
- `+delete.js` - DELETE requests only

> **Note**: Method-specific loaders are optional. If not present, only `+load.js` (if it exists) will execute.

## Using Data in Templates

### Basic Example

```ejs
<!-- Display site name -->
<h1><%%= data.siteName %></h1>

<!-- Show navigation -->
<nav>
  <%% data.navigation.forEach(item => { %>
    <a href="<%%= item.url %>"><%%= item.title %></a>
  <%% }) %>
</nav>
```

### Complete Example

```ejs
<!DOCTYPE html>
<html>
<head>
  <title><%%= data.product?.name || 'Products' %> | <%%= data.siteName %></title>
</head>
<body>
  <!-- Navigation -->
  <nav>
    <%% data.navigation.forEach(item => { %>
      <a href="<%%= item.url %>"><%%= item.title %></a>
    <%% }) %>
  </nav>

  <!-- Content -->
  <%% if (data.error) { %>
    <h1>Error: <%%= data.error %></h1>
  <%% } else if (data.product) { %>
    <!-- Single Product View -->
    <main>
      <h1><%%= data.product.name %></h1>
      <p><%%= data.product.description %></p>
    </main>
  <%% } else if (data.products) { %>
    <!-- Product List View -->
    <main>
      <h1>Products</h1>
      <div class="grid">
        <%% data.products.forEach(product => { %>
          <a href="/products/<%%= product.id %>">
            <h2><%%= product.name %></h2>
          </a>
        <%% }) %>
      </div>
    </main>
  <%% } %>
</body>
</html>
```

## Best Practices

1. **Type Safety**

   ```javascript
   /** @type {import('pocketpages').PageDataLoaderFunc} */
   module.exports = function (api) {
     // TypeScript will check api usage
     return {
       /* data */
     }
   }
   ```

2. **Error Handling**

   ```javascript
   /** @type {import('pocketpages').PageDataLoaderFunc} */
   module.exports = function (api) {
     const { response } = api
     try {
       // Load data...
       return { data }
     } catch (error) {
       response.status(500)
       return { error: 'Failed to load data' }
     }
   }
   ```

3. **Structured Data**

   ```javascript
   // Good: Clear structure
   return {
     products: productList,
     categories: categoryList,
   }

   // Avoid: Flat structure
   return {
     productList: products,
     productCount: count,
     productCategories: categories,
   }
   ```

## Important Notes

- Loaders execute synchronously
- Only leaf-level loaders run
- Data is loaded fresh per request
- Use middleware for shared data
- All data is merged into `data` object

## Reference

- [API Documentation](/docs/api)
- [Middleware Guide](/docs/middleware)
- [TypeScript Types](/docs/types)
