---
title: Context API
description: Core API methods and properties available in EJS templates, including logging, asset management, environment access, and metadata handling.
---

# Understanding the Context API

PocketPages provides a comprehensive Context API that is magically available in every EJS template. The API methods and properties enable you to manage request data, handle responses, work with assets, and more. This guide will walk you through the key components of the Context API and how to use them effectively.

## How the API is Available in EJS

All Context API methods are automatically available in your EJS templates without any prefix. For example, you can use `asset()` for asset management or `echo()` for output. This makes your templates cleaner and more readable.

The Context API also includes all [Global API](/docs/global-api) functions like `dbg()`, `stringify()`, and `url()`. While these Global API functions can be used anywhere via `require('pocketpages')`, they're automatically available in templates alongside the Context API methods.

### Example: Using the Context API in an EJS File

Let's look at a practical example demonstrating various API methods:

```ejs
<h1>Product ID: <%%= params.productId %></h1>
<p>Requested by: <%%= request.header('User-Agent') %></p>

<%% if (params.sort) { %>
  <p>Sorting by: <%%= params.sort %></p>
<%% } else { %>
  <p>No sorting specified.</p>
<%% } %>

<%%
  // Using Context API methods
  const logoUrl = asset('images/logo.png');
  meta.title = "Product Details";

  // Using Global API functions
  dbg('Processing product:', stringify(params));
%>
<img src="<%%= logoUrl %>" alt="Logo">

<%%
  // Set metadata for the page
  meta.title = "Product Details";
  meta.description = "View details for product " + params.productId;
%>

<%%
  // Echo some HTML content
  echo("<div>Dynamic content here</div>");
%>

<%%
  // Handle form data
  if (formData) {
    // Process form submission
  }
%>
```

**Explanation:**

- **Request Data**: Access request parameters through `params` and request details via `request`
- **Asset Management**: Use `asset()` to handle static assets with automatic cache-busting
- **Response Handling**: Use `echo()` to output content and `response` to manage response headers
- **Form Data**: Access form submissions through `formData`
- **Metadata**: Set page metadata using `meta`
- **API Access**: Make API calls using `api`

## Available Context Properties

The Context API provides several key properties and methods:

- `api` - Make API calls to PocketBase
- `asset()` - Handle static assets with cache busting
- `data` - Store and retrieve template data
- `echo()` - Output content to the response
- `formData` - Access form submission data
- `meta` - Manage page metadata
- `params` - Access URL and query parameters
- `redirect()` - Perform redirects
- `request` - Access request details
- `resolve()` - Resolve URLs and paths
- `response` - Manage response headers and status

Additionally, all [Global API](/docs/global-api) functions are available:

- Logging functions (`dbg`, `info`, `warn`, `error`)
- Data handling (`stringify`, `url`)
- Micro-dash utilities (`forEach`, `keys`, `values`, `merge`)

## Additional Notes

- **Environment Variables**: Access environment variables through configuration
- **Cache Busting**: The `asset` function automatically handles cache busting in development mode
- **Response Management**: Use `response` methods to set headers, status codes, and manage the response

For detailed information about specific API methods, please refer to the individual API documentation pages in the sidebar.
