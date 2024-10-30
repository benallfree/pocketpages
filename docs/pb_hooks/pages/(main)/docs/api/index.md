---
title: PocketPages API
description: Core API methods and properties available in EJS templates, including logging, asset management, environment access, and metadata handling.
---

# Understanding the PocketPages API

PocketPages provides a comprehensive API that is globally available in every EJS template. The API methods and properties enable you to manage request data, log information, require private files, and more. This guide will walk you through the key components of the PocketPages API and how to use them effectively.

## How the API is Available in EJS

All API methods are available as global functions in your EJS templates. For example, you can directly use `dbg()` for debug logging or `asset()` for asset management. This makes your templates cleaner and more readable.

### Example: Using the PocketPages API in an EJS File

Let's look at a practical example demonstrating various API methods:

```ejs
<%% dbg("Rendering Product Page"); %>

<h1>Product ID: <%%= params.productId %></h1>
<p>Requested by: <%%= request.header('User-Agent') %></p>

<%% if (params.sort) { %>
  <p>Sorting by: <%%= params.sort %></p>
<%% } else { %>
  <p>No sorting specified.</p>
<%% } %>

<%%
  const config = requirePrivate('config');
  dbg("Config loaded:", stringify(config));
%>

<%%
  const logoUrl = asset('images/logo.png');
%>
<img src="<%%= logoUrl %>" alt="Logo">

<%%
  const parsedUrl = url('https://example.com/path?query=123');
%>
<p>Hostname: <%%= parsedUrl.hostname %></p>
<p>Pathname: <%%= parsedUrl.pathname %></p>
<p>Search Params: <%%= parsedUrl.search %></p>
```

**Explanation:**

- **Logging**: Use `dbg()`, `info()`, `warn()`, and `error()` directly for different logging levels
- **Request Data**: Access request parameters through the global `params` object
- **Asset Management**: Use the global `asset` function to handle static assets with automatic cache-busting
- **URL Parsing**: The global `url` function helps parse and manipulate URLs
- **Private Files**: Use `requirePrivate` to securely load files from private directories
- **Utilities**: Helper functions like `stringify` are available for common operations

## Additional Notes

- **Environment Variables**: Access environment variables directly through the global `env` object
- **Cache Busting**: The `asset` function automatically handles cache busting in development mode
- **Logging Best Practices**: Use the appropriate logging function (`dbg`, `info`, `warn`, `error`) to categorize your messages effectively

For detailed information about specific API methods, please refer to the individual API documentation pages.
