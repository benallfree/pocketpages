---
title: ctx - The Echo HTTP Context
description: Access the underlying Echo framework's context object for low-level HTTP operations.
---

# `ctx` - Echo Context Object

- **Type**: [`echo.Context`](https://pocketbase.io/jsvm/interfaces/echo.Context.html)
- **Description**: Low-level access to the Echo framework's HTTP context
- **Global**: Yes (available as `ctx` in templates)
- **API Property**: `api.ctx`

> **Important**: PocketPages implements its own routing system, so not all Echo context features are fully initialized. Prefer PocketPages-specific helpers (like `params`, `request`, `response`) over raw Echo context methods when possible.

## Basic Usage

```ejs
<!-- Using the global property -->
<%%= ctx.method() %>
<%%= ctx.path() %>

<!-- Using the API property -->
<%%= api.ctx.method() %>
<%%= api.ctx.path() %>
```

## Common Operations

### Request Information

```ejs
<!-- HTTP Method and Path -->
<p>Method: <%%= ctx.method() %></p>
<p>Path: <%%= ctx.path() %></p>

<!-- Query Parameters -->
<p>Search: <%%= ctx.queryParam("q") %></p>

<!-- Headers -->
<p>User Agent: <%%= ctx.request().header("User-Agent") %></p>
```

### Cookie Management

```ejs
<%%
// Set a cookie
ctx.setCookie("theme", "dark", {
    maxAge: 86400,
    path: "/"
})

// Read a cookie
const theme = ctx.cookie("theme")
%>
```

## Example: Auth Check Page

```ejs
<%%
// Check auth header
const authToken = ctx.request().header("Authorization")
const isAuthorized = authToken === `Bearer ${env.API_TOKEN}`

if (!isAuthorized) {
    ctx.response().status(401)
    %>
    <h1>Unauthorized</h1>
    <%%
    return
}
%>

<!DOCTYPE html>
<html>
<head>
    <title>Protected Page</title>
</head>
<body>
    <h1>Welcome, Authorized User!</h1>
    <pre><%%= stringify(ctx.request().headers()) %></pre>
</body>
</html>
```

## Key Methods

Common Echo context methods:

- `method()` - Get HTTP method
- `path()` - Get request path
- `queryParam(name)` - Get query parameter
- `queryParams()` - Get all query parameters
- `cookie(name)` - Get cookie value
- `setCookie(name, value, options)` - Set cookie
- `request()` - Get request object
- `response()` - Get response object

> **Note**: For route parameters, use PocketPages' `params` object instead of `ctx.pathParam()`.

## Best Practices

1. **Prefer PocketPages Helpers**

   ```ejs
   <!-- Better: Use PocketPages helpers -->
   <%%= params.id %>
   <%%= request.method %>

   <!-- Avoid: Raw context methods -->
   <%%= ctx.pathParam("id") %>
   <%%= ctx.method() %>
   ```

2. **Use for Low-Level Access**

   ```ejs
   <!-- Good: Low-level operations -->
   <%%= ctx.request().header("X-Custom-Header") %>
   <%%= ctx.cookie("session") %>
   ```

3. **Status Codes and Redirects**

   ```ejs
   <!-- Better: Use PocketPages helper -->
   <%%= redirect("/login") %>

   <!-- When needed: Fine-grained control -->
   <%% ctx.response().status(418) %>
   ```

## Reference

For complete Echo context documentation, see:

- [Echo Context API](https://pocketbase.io/jsvm/interfaces/echo.Context.html)
- [PocketBase JSVM Documentation](https://pocketbase.io/docs/js-overview/)
- [PocketBase JSVM API Reference](https://pocketbase.io/jsvm/index.html)
