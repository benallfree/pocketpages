---
title: 'Route and Query Parameters'
description: 'Access URL path segments and query strings in PocketPages templates using params.paramName. Route parameters use [brackets] in file/directory names. Query parameters override route parameters when names conflict.'
---

# Route and Query Parameters

PocketPages lets you access both route parameters (from URL paths) and query parameters (from query strings) in your templates.

## Route Parameters

Use square brackets `[]` in file or directory names to capture URL path segments as parameters.

### Example Structure

```
pb_hooks/pages/
  products/
    [productId]/
      index.ejs
    [productId]/reviews/
      [reviewId].ejs
```

This structure handles URLs like:

- `/products/123`
- `/products/123/reviews/456`

### Using Route Parameters

Access route parameters through `params` in your templates:

```ejs
<!-- In products/[productId]/index.ejs -->
<h1>Product: <%%= params.productId %></h1>

<!-- In products/[productId]/reviews/[reviewId].ejs -->
<h1>Product: <%%= params.productId %></h1>
<p>Review: <%%= params.reviewId %></p>
```

## Query Parameters

Query parameters come from the URL's query string (after the `?`). They're available through `params` and also through `request.url.query` with automatic JSON parsing:

```
/products/123?sort=latest&highlight=true&filters={"category":"electronics"}
```

Access them in templates:

```ejs
<!-- Using params (string values only) -->
<p>Sort by: <%%= params.sort %></p>
<p>Highlight: <%%= params.highlight %></p>

<!-- Using request.url.query (with JSON parsing) -->
<p>Filters: <%%= stringify(request.url.query.filters) %></p>
```

## Parameter Priority

Route parameters take priority over query parameters when they have the same name:

```
/products/123?productId=789
```

Here, `params.productId` will be `123` (from the route), not `789` (from the query string).

## Complete Example

URL:

```
/products/123/reviews/456?sort=latest&highlight=true&filters={"category":"electronics","price":{"min":100}}
```

Template:

```ejs
<h1>Product: <%%= params.productId %></h1>
<h2>Review: <%%= params.reviewId %></h2>
<p>Sort by: <%%= params.sort %></p>
<p>Highlight: <%%= params.highlight %></p>

<!-- Access JSON query parameters -->
<p>Category: <%%= request.url.query.filters.category %></p>
<p>Min Price: <%%= request.url.query.filters.price.min %></p>
```
