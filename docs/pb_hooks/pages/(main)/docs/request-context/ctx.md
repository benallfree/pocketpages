---
title: ctx - The Echo HTTP Context
description: Access and manipulate HTTP request/response data using the underlying Echo framework's context object in PocketPages templates.
---

# `ctx` - The `echo.HttpContext`

> **Important Note**: Because PocketPages implements its own routing system, not all Echo context features are initialized as they would be in a standard Echo application. Whenever possible, use PocketPages-specific helpers (like `params` for route parameters) instead of the raw Echo context methods.

- **Type**: [`echo.Context`](https://pocketbase.io/jsvm/interfaces/echo.Context.html)
- **Description**: The `ctx` property gives you direct access to the underlying Echo framework's HTTP context. This allows you to interact with the request and response, including reading headers, managing cookies, and more.

## Common Use Cases

### Reading Request Data

```ejs
<!-- Get request method and path -->
<p>Method: <%%= ctx.method() %></p>
<p>Path: <%%= ctx.path() %></p>

<!-- Access query parameters -->
<p>Search Term: <%%= ctx.queryParam("q") %></p>

<!-- Read headers -->
<p>User Agent: <%%= ctx.request().header("User-Agent") %></p>
```

### Managing Cookies

```ejs
<%%
// Set a cookie
ctx.setCookie("theme", "dark", {
    maxAge: 86400, // 1 day
    path: "/"
})

// Read a cookie
const theme = ctx.cookie("theme")
%>

<p>Current Theme: <%%= theme %></p>
```

### Example Project Structure

```
pb_hooks/
  pages/
    _layout.ejs          # Base layout template
    index.ejs           # Homepage
    products/
      index.ejs        # Products listing
      [id].ejs        # Product details page using params.id
    account/
      profile.ejs     # User profile page using ctx for auth checks
```

### Complete Example: Product Details Page

```ejs
<%%
// products/[id].ejs
const productId = params.id  // Use params instead of ctx.pathParam
const isAdmin = ctx.request().header("X-Admin-Token") === env.ADMIN_TOKEN

// Get accept header for content negotiation
const acceptHeader = ctx.request().header("Accept")

if (!productId) {
    ctx.response().status(400)
    %>
    <h1>Error: Product ID Required</h1>
    <%%
    return
}
%>

<!DOCTYPE html>
<html>
<head>
    <title>Product Details</title>
</head>
<body>
    <h1>Product ID: <%%= productId %></h1>

    <%% if (isAdmin) { %>
        <div class="admin-controls">
            <h2>Admin Controls</h2>
            <p>Request Headers: <%%= stringify(ctx.request().headers()) %></p>
        </div>
    <%% } %>

    <p>Requested Format: <%%= acceptHeader %></p>
</body>
</html>
```

## Available Methods

The `ctx` object provides numerous methods from the Echo framework. Here are some commonly used ones:

- `ctx.method()` - Get the HTTP method
- `ctx.path()` - Get the request path
- `ctx.queryParam(name)` - Get a query parameter
- `ctx.queryParams()` - Get all query parameters
- `ctx.cookie(name)` - Get a cookie value
- `ctx.setCookie(name, value, options)` - Set a cookie
- `ctx.request()` - Get the request object
- `ctx.response()` - Get the response object
- `ctx.redirect(url)` - Redirect to another URL

> **Note**: Path parameters should be accessed through the `params` object rather than `ctx.pathParam()`.

For a complete list of available methods, refer to the [Echo Context Documentation](https://pocketbase.io/jsvm/interfaces/echo.Context.html).
