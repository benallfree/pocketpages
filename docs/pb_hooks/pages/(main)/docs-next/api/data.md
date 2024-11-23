---
title: data - Loaded Data Access
description: Access data loaded by +load.js files in your templates.
---

# `data` - Loaded Data Access

- **Type**: `Object`
- **Description**: Contains values returned by `+load.js` files in the current route
- **Global**: Yes (available as `data` in templates)
- **API Property**: `api.data`

## Basic Usage

```ejs
<!-- Using the global property -->
<h1><%%= data.siteName %></h1>

<!-- Using the API property -->
<h1><%%= api.data.siteName %></h1>
```

## Loading Data

Data is loaded through `+load.js` files in your route hierarchy:

```
pb_hooks/
  pages/
    +load.js           # Global data
    products/
      +load.js         # Products data
      [id]/
        +load.js       # Single product data
        index.ejs      # Template using data
```

> **Note**: Only the leaf-level `+load.js` file is executed. For cascading data loading, use [Middleware](/docs-next/middleware).

### Example Loaders

#### Root Level Data

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter } = api

  return {
    siteName: 'My Store',
    navigation: [
      { title: 'Home', url: '/' },
      { title: 'Products', url: '/products' },
    ],
  }
}
```

#### Product List Data

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter } = api

  const categories = findRecordsByFilter('categories', {
    filter: 'active = true',
    sort: 'name',
  })

  return { categories }
}
```

#### Single Product Data

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

## Template Usage

### Basic Example

```ejs
<!-- Navigation from root data -->
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
  <title><%%= data.product.name %> | <%%= data.siteName %></title>
</head>
<body>
  <!-- Navigation -->
  <nav>
    <%% data.navigation.forEach(item => { %>
      <a href="<%%= item.url %>"><%%= item.title %></a>
    <%% }) %>
  </nav>

  <!-- Categories -->
  <aside>
    <h2>Categories</h2>
    <ul>
      <%% data.categories.forEach(cat => { %>
        <li><%%= cat.name %></li>
      <%% }) %>
    </ul>
  </aside>

  <!-- Product Details -->
  <%% if (data.error) { %>
    <h1>Error: <%%= data.error %></h1>
  <%% } else { %>
    <main>
      <h1><%%= data.product.name %></h1>
      <p><%%= data.product.description %></p>
    </main>
  <%% } %>
</body>
</html>
```

## Best Practices

1. **Structured Data Organization**

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

2. **Error Handling**

   ```javascript
   module.exports = function (api) {
     try {
       const data = $app.dao().findRecordById(/*...*/)
       return { data }
     } catch (error) {
       api.response.status(500)
       return { error: 'Failed to load data' }
     }
   }
   ```

3. **Type Safety**
   ```javascript
   /** @type {import('pocketpages').PageDataLoaderFunc} */
   module.exports = function (api) {
     return {
       timestamp: Date.now(),
       version: '1.0.0',
     }
   }
   ```

## Important Notes

- Data is loaded fresh for each request
- Synchronous loading only - no async operations
- More specific routes can override parent data
- Use `stringify(data)` for debugging
- Only leaf-level `+load.js` files are executed

## Reference

- [Loading Data Guide](/docs-next/loading-data)
- [Middleware Documentation](/docs-next/middleware)
- [API Types Reference](/docs-next/api-types)
