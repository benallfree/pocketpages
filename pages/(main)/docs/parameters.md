# Handling Route and Query String Parameters in PocketPages

PocketPages offers flexible routing capabilities that include support for route parameters and query string parameters. This guide will explain how to work with these parameters, enabling you to create dynamic pages that respond to user inputs via the URL.

## Route Parameters

Route parameters allow you to capture specific values from the URL path and use them within your EJS templates. These parameters are defined by using placeholder directory or file names enclosed in square brackets `[]`.

### Example Structure with Route Parameters

Consider the following directory structure:

```
app/
  pb_hooks/
    pages/
      products/
        [productId]/
          index.ejs
        [productId]/
          reviews/
            [reviewId].ejs
```

### How Route Parameters Work

- **Defining Parameters**:

  - `[productId]` in the directory name allows you to capture the value from the URL.
  - `[reviewId].ejs` captures a value from the URL for a specific review.

- **Accessing Parameters in EJS**:
  - In `products/[productId]/index.ejs`, you can access the `productId` parameter via `params.productId`.
  - In `products/[productId]/reviews/[reviewId].ejs`, both `productId` and `reviewId` will be available as `params.productId` and `params.reviewId`.

### Example Routes

- `app/products/[productId]/index.ejs`:

  - URL: `/products/123`
  - Accessible Parameter: `params.productId` = `123`

- `app/products/[productId]/reviews/[reviewId].ejs`:
  - URL: `/products/123/reviews/456`
  - Accessible Parameters: `params.productId` = `123`, `params.reviewId` = `456`

### Using Route Parameters in EJS

```ejs
<h1>Product ID: <%%= params.productId %></h1>
<p>Review ID: <%%= params.reviewId %></p>
```

This will render:

- **For `/products/123`**: `Product ID: 123`
- **For `/products/123/reviews/456`**: `Product ID: 123`, `Review ID: 456`

## Query String Parameters

Query string parameters are key-value pairs appended to the URL after a `?`. These parameters are also accessible in your EJS templates via `params`, and they will override route parameters if there is a name conflict.

### Example URL with Query Strings

Given the following URL:

```
/products/123/reviews/456?sort=latest&highlight=true
```

- **Accessing Query String Parameters**:

  - `params.sort` = `"latest"`
  - `params.highlight` = `"true"`

- **Overriding Route Parameters**:
  - If a query string parameter has the same name as a route parameter, the query string parameter's value will override the route parameter's value.
  - Example: If your route parameter is `params.productId = 123` but your query string contains `?productId=789`, then `params.productId` will be `789`.

### Example Usage in EJS

```ejs
<h1>Product ID: <%%= params.productId %></h1>
<p>Sort by: <%%= params.sort %></p>
<p>Highlight: <%%= params.highlight %></p>
```

This will render:

- **For `/products/123/reviews/456?sort=latest&highlight=true`**:

  - `Product ID: 123`
  - `Sort by: latest`
  - `Highlight: true`

- **For `/products/123/reviews/456?productId=789`**:
  - `Product ID: 789` (overrides the route parameter)

## Combining Route and Query String Parameters

PocketPages provides a powerful way to combine route and query string parameters, making your URLs highly dynamic and adaptable to various use cases.

### Practical Example

Let's say you have a URL like this:

```
/products/123/reviews/456?sort=latest&highlight=true
```

In your EJS template located at `app/products/[productId]/reviews/[reviewId].ejs`, you can access and utilize all these parameters:

```ejs
<h1>Product ID: <%%= params.productId %></h1>
<h2>Review ID: <%%= params.reviewId %></h2>
<p>Sort by: <%%= params.sort %></p>
<p>Highlight: <%%= params.highlight %></p>
```

This setup allows you to create dynamic and responsive pages that change based on the parameters provided in the URL.

## Summary

PocketPages supports powerful and flexible routing with both route parameters and query string parameters:

1. **Route Parameters**: Defined using square brackets `[]` in directory and file names, allowing you to capture values from the URL path.
2. **Query String Parameters**: Captured from the URL after a `?`, available in `params`, and override route parameters with the same name.
3. **Access in EJS**: All parameters are available in the `params` object within your EJS templates, enabling dynamic content generation based on the URL.

By combining route and query string parameters, you can create rich, dynamic pages that respond to the specific needs of your users, making your application more flexible and user-friendly.
