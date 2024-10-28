---
title: Request Context
description: Properties and methods available during request processing, including logging, asset management, environment access, and metadata handling.
---

# Understanding the Request Context in PocketPages

PocketPages provides a comprehensive request context object that is accessible in every EJS file. This context object contains several useful properties and functions that enable you to manage request data, log information, require private files, and more. This guide will walk you through the key components of the request context and how to use them effectively.

## The Request Context Object

The request context is automatically passed to every EJS template in your PocketPages application. It provides access to various tools and information relevant to the current request, allowing you to dynamically generate content based on the request data.

## How the Context is Available in EJS

The request context is injected automatically into every EJS template rendered by PocketPages. This means that whenever you create an EJS file, you can directly access the context and all its properties and functions without any additional setup.

### Example: Using the Request Context in an EJS File

Let's put it all together in a practical example:

```ejs
<%% log.dbg("Rendering Product Page"); %>

<h1>Product ID: <%%= params.productId %></h1>
<p>Requested by: <%%= ctx.request.header('User-Agent') %></p>

<%% if (params.sort) { %>
  <p>Sorting by: <%%= params.sort %></p>
<%% } else { %>
  <p>No sorting specified.</p>
<%% } %>

<%%
  const config = requirePrivate('config');
  log.dbg("Config loaded:", stringify(config));
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

<h2>Full Request Context</h2>
<pre><%%= stringify(context) %></pre>
```

**Explanation:**

- **Logging**: Uses the `log` object to output debug information.
- **Dynamic Content**: Utilizes `params` and `ctx` to display request-specific data.
- **Asset Management**: Uses the `asset` function to include an image with cache-busting in development mode.
- **URL Parsing**: Demonstrates how to parse a URL using the `url` function.
- **Security**: Loads a private configuration file using `requirePrivate` without exposing it to public routes.
- **Safety**: Utilizes `stringify` to safely serialize and display the entire context, including circular references.

## Additional Notes

- **Environment Variables**: Use `env` to access sensitive data like API keys and avoid exposing them in your templates.
- **Cache Busting**: Use the `asset` function to ensure you're always loading the latest version of your assets during development, especially when behind a CDN.
- **Logging Levels**: Use the appropriate logging method (`dbg`, `info`, `warn`, `error`) to categorize your log messages effectively.
