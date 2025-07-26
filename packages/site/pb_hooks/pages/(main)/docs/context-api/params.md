---
title: params - Route Parameters
description: Access URL route parameters in PocketPages templates using the params object.
---

# `params` - Route Parameters

- **Type**: Object
- **Description**: The `params` object contains routing parameters derived from placeholder directory and file names (parts of the path wrapped in square brackets). For query string parameters, you'll need to parse them manually from `request.url`.

## Route Parameters

Route parameters are defined using square brackets in file and directory names. For example:

```
pb_hooks/
  pages/
    products/
      [category]/        # params.category
        [id].ejs        # params.id
    users/
      [userId]/
        posts/
          [postId].ejs  # Both params.userId and params.postId available
```

## Example Usage

### Basic Parameter Access

```ejs
<!-- URL: /products/electronics/123 -->
<h1>Category: <%%= params.category %></h1>  <!-- "electronics" -->
<h2>Product ID: <%%= params.id %></h2>      <!-- "123" -->
```

### Complete Example: Product Details Page

```ejs
<%%
// products/[category]/[id].ejs
const { category, id } = params

// Use parameters for database query
const product = await db.collection('products')
    .getOne(id)

if (!product || product.category !== category) {
    response.html(404, `<h1>Product Not Found</h1>`)
    return
}
%>

<!DOCTYPE html>
<html>
<head>
    <title><%%= product.name %> - <%%= category %></title>
</head>
<body>
    <nav>
        <a href="/products/<%%= category %>">Back to <%%= category %></a>
    </nav>

    <article>
        <h1><%%= product.name %></h1>
        <p>Category: <%%= category %></p>
        <p>Product ID: <%%= id %></p>
        <p>Price: $<%%= product.price %></p>
        <p>Description: <%%= product.description %></p>
    </article>

    <!-- Debug Information -->
    <details>
        <summary>Route Parameters</summary>
        <pre><%%= stringify(params) %></pre>
    </details>
</body>
</html>
```

## Important Notes

1. `params` only contains route parameters (from square brackets in paths)
2. Query string parameters are not directly supported - you'll need to parse them manually from `request.url`
3. All parameter values are strings
4. Route parameters are required - if a route parameter is missing, the page won't match

For query string parameters, you can parse them manually from the request URL:

```ejs
<%%
// URL: /products/electronics/123?sort=price&order=desc
const url = new URL(request.url)
const sort = url.searchParams.get('sort')
const order = url.searchParams.get('order')
%>
```
