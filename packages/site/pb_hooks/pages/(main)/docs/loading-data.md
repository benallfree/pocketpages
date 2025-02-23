---
title: Loading Data in PocketPages
description: Learn different ways to load data in your PocketPages templates
---

# Loading Data in PocketPages

There are several ways to load data in PocketPages, from simple inline loading to more structured approaches.

## Inline Data Loading

The simplest way to load data is directly in your template using `<%% %>` tags at the top of your file:

```ejs
<%%
  const products = findRecordsByFilter('products', {
    filter: 'active = true',
    sort: 'name'
  })
%>

<!DOCTYPE html>
<html>
<head>
  <title>Products</title>
</head>
<body>
  <h1>Products</h1>
  <%% products.forEach(product => { %>
    <div class="product">
      <h2><%%= product.name %></h2>
    </div>
  <%% }) %>
</body>
</html>
```

## Server Script Blocks

For better code formatting support in editors like VSCode, you can use the `<script server<%-`>`%>` syntax, which is equivalent to `<%% %>`:

```ejs
<script server<%-`>` %>
  const products = findRecordsByFilter('products', {
    filter: 'active = true',
    sort: 'name'
  })

  const categories = findRecordsByFilter('categories', {
    sort: 'name'
  })
</script>

<!DOCTYPE html>
<html>
<head>
  <title>Products</title>
</head>
<body>
  <h1>Products by Category</h1>
  <%% categories.forEach(category => { %>
    <h2><%%= category.name %></h2>
    <%% const categoryProducts = products.filter(p => p.category === category.id) %>

    <div class="product-grid">
      <%% categoryProducts.forEach(product => { %>
        <div class="product">
          <h3><%%= product.name %></h3>
        </div>
      <%% }) %>
    </div>
  <%% }) %>
</body>
</html>
```

## Structured Data Loading with +load.js

For more complex data loading needs, PocketPages provides `+load.js` files. These are useful when you need to:

- Share data loading logic across multiple templates
- Separate concerns between data loading and presentation
- Handle complex routing scenarios
- Implement method-specific loading (GET, POST, etc.)

### Basic Usage

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
  index.ejs          # Home page entry point
  products/
    +load.js         # Only executes if products/index.ejs is the entry point
    [id]/
      +load.js       # Only executes if products/[id]/index.ejs is the entry point
      +get.js        # Only executes for GET requests if products/[id]/index.ejs is the entry point
      index.ejs      # Template using data
```

> **Important**: Only a single `+load.js` file executes per request - the one at the same level as the entry point EJS file. This is different from `+middleware.js` files, which execute hierarchically from root to leaf along the route path. Use middleware when you need cascading data loading.

### Example: Route `/products/123`

If the route resolves to `/products/123/index.ejs`:

1. **Loader Execution** (single file):

   ```
   /products/[id]/+load.js  # Only this loader executes
   ```

2. **Method-Specific Loader Execution** (single file):

   ```
   /products/[id]/+get.js  # Only this method-specific loader executes
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
- `+patch.js` - PATCH requests only
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

## Reference

- [API Documentation](/docs/api)
- [Middleware Guide](/docs/middleware)
- [TypeScript Types](/docs/types)
