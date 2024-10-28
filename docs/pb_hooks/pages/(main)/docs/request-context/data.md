---
title: data - Loaded Data Access
description: Access data loaded by +load.js files in PocketPages templates, with examples of hierarchical data loading and template usage.
---

# `data` - Loaded Data Access

- **Type**: `Object`
- **Description**: The `data` property contains values returned by `+load.js` files in the current route's hierarchy. Each `+load.js` file can contribute data that becomes available in your templates.

## How Data is Loaded

Data is loaded through `+load.js` files, which can exist at any directory level:

```
pb_hooks/
  pages/
    +load.js           # Global data
    products/
      +load.js         # Products-specific data
      [id]/
        +load.js       # Single product data
        index.ejs      # Template using the data
```

> Note: Only the `+load.js` file at the leaf page directory level is executed. Parent-level loaders are not executed. For cascading execution, consider using [Middleware](/docs/middleware) as an alternative.

### Example `+load.js` Files

#### Root Level (`/pb_hooks/pages/+load.js`):

```javascript
module.exports = function (context) {
  return {
    siteName: 'My Store',
    navigation: [
      { title: 'Home', url: '/' },
      { title: 'Products', url: '/products' },
    ],
  }
}
```

#### Products Level (`/pb_hooks/pages/products/+load.js`):

```javascript
module.exports = function (context) {
  return {
    categories: $app
      .dao()
      .findRecordsByFilter('categories', 'active = true')
      .map((c) => ({ id: c.id, name: c.name })),
  }
}
```

#### Product Detail Level (`/pb_hooks/pages/products/[id]/+load.js`):

```javascript
module.exports = function (context) {
  const product = $app.dao().findRecordById('products', context.params.id)
  if (!product) {
    context.response().status(404)
    return { error: 'Product not found' }
  }
  return { product }
}
```

## Using Data in Templates

### Basic Usage

```ejs
<!-- Display site name from root +load.js -->
<h1><%%= data.siteName %></h1>

<!-- Display navigation from root +load.js -->
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
    <!-- Global Navigation -->
    <nav>
        <%% data.navigation.forEach(item => { %>
            <a href="<%%= item.url %>"><%%= item.title %></a>
        <%% }) %>
    </nav>

    <!-- Categories Sidebar -->
    <aside>
        <h2>Categories</h2>
        <ul>
            <%% data.categories.forEach(category => { %>
                <li><%%= category.name %></li>
            <%% }) %>
        </ul>
    </aside>

    <!-- Product Details -->
    <%% if (data.error) { %>
        <h1>Error: <%%= data.error %></h1>
    <%% } else { %>
        <main>
            <h1><%%= data.product.name %></h1>
            <p>Price: $<%%= data.product.price %></p>
            <p><%%= data.product.description %></p>
        </main>
    <%% } %>

    <!-- Debug Information -->
    <details>
        <summary>Debug: Loaded Data</summary>
        <pre><%%= stringify(data) %></pre>
    </details>
</body>
</html>
```

## Important Notes

1. Data from all matching `+load.js` files is merged into a single `data` object
2. More specific (deeper) routes can override data from parent routes
3. Data is loaded synchronously - no async operations
4. Data is loaded fresh for each request
5. Use `stringify()` for debugging data structures

## Best Practices

1. **Organize Data Logically**:

   ```javascript
   // Good - clear structure
   return {
     products: productList,
     categories: categoryList,
   }

   // Avoid - flat structure
   return {
     productList: products,
     productCount: count,
     productCategories: categories,
   }
   ```

2. **Handle Errors Gracefully**:

   ```javascript
   module.exports = function (context) {
     try {
       const data = $app.dao().findRecordById(/*...*/)
       return { data }
     } catch (error) {
       context.response().status(500)
       return { error: 'Failed to load data' }
     }
   }
   ```

3. **Use Type Checking**:
   ```javascript
   // Add type checking with JSDoc
   /** @type {import('pocketpages').PageDataLoaderFunc} */
   module.exports = function (context) {
     return {
       timestamp: Date.now(),
       version: '1.0.0',
     }
   }
   ```

See [Loading Data](/docs/loading-data) for more detailed information about data loading in PocketPages.
