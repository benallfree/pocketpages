---
title: Request Context
description: Properties and methods available during request processing, including logging, asset management, environment access, and metadata handling.
---

# Understanding the Request Context in PocketPages

PocketPages provides a comprehensive request context object that is accessible in every EJS file. This context object contains several useful properties and functions that enable you to manage request data, log information, require private files, and more. This guide will walk you through the key components of the request context and how to use them effectively.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [The Request Context Object](#the-request-context-object)
  - [Key Properties and Functions](#key-properties-and-functions)
    - [1. `ctx` - The `echo.HttpContext`](#1-ctx---the-echohttpcontext)
    - [2. `params` - Routing and Query String Parameters](#2-params---routing-and-query-string-parameters)
    - [3. `log` - Logging Functions](#3-log---logging-functions)
    - [4. `requirePrivate` - Requiring Private Files](#4-requireprivate---requiring-private-files)
    - [5. `stringify` - Circular-Safe Stringify Helper](#5-stringify---circular-safe-stringify-helper)
    - [6. `context` - The Context Object Itself](#6-context---the-context-object-itself)
    - [7. `asset` - Asset URL Helper](#7-asset---asset-url-helper)
    - [8. `url` - URL Parsing Function](#8-url---url-parsing-function)
    - [9. `env` - Accessing Environment Variables](#9-env---accessing-environment-variables)
    - [10. `data` - Accessing Loaded Data](#10-data---accessing-loaded-data)
    - [11. `meta` - Managing Page Metadata and Global Values](#11-meta---managing-page-metadata-and-global-values)
    - [12. `print` - HTTP Response Output Helper](#12-print---http-response-output-helper)
- [How the Context is Available in EJS](#how-the-context-is-available-in-ejs)
  - [Example: Using the Request Context in an EJS File](#example-using-the-request-context-in-an-ejs-file)
- [Additional Notes](#additional-notes)

<!-- /code_chunk_output -->

## The Request Context Object

The request context is automatically passed to every EJS template in your PocketPages application. It provides access to various tools and information relevant to the current request, allowing you to dynamically generate content based on the request data.

### Key Properties and Functions

#### 1. `ctx` - The `echo.HttpContext`

- **Type**: [`echo.Context`](https://pocketbase.io/jsvm/interfaces/echo.Context.html)
- **Description**: The `ctx` property gives you direct access to the underlying Echo framework's HTTP context. This allows you to interact with the request and response, including reading headers, managing cookies, and more.

##### Example Usage:

```ejs
<h1>Request Method: <%%= ctx.method() %></h1>
<p>Request Path: <%%= ctx.path() %></p>
```

#### 2. `params` - Routing and Query String Parameters

- **Type**: Object
- **Description**: The `params` object contains both routing parameters (derived from placeholder directory and file names) and query string parameters. If a query string parameter has the same name as a route parameter, the query string parameter will override the route parameter. See [Accessing Parameters](/docs/parameters) for more details.

##### Example Usage:

```ejs
<h1>Product ID: <%%= params.productId %></h1>
<p>Sort by: <%%= params.sort %></p>
```

#### 3. `log` - Logging Functions

- **Type**: Object containing `{ dbg, info, warn, error }`
- **Description**: The `log` object provides logging functions corresponding to the `$app.logger()` functions. These methods are used for logging debug information, informational messages, warnings, and errors during the request handling process. When PocketBase is run with `--dev` mode, `dbg` logs will also appear in the console output; otherwise, only `info`, `warn`, and `error` will be displayed.

##### Logging Methods:

- **`log.dbg(...args)`**: Debug-level logging. Visible in console output when running in `--dev` mode.
- **`log.info(...args)`**: Informational messages.
- **`log.warn(...args)`**: Warnings.
- **`log.error(...args)`**: Error messages.

##### Example Usage:

```ejs
<%% log.dbg("Product ID:", params.productId); %>
<%% log.info("User accessed the product page."); %>
<%% log.warn("Deprecated API used."); %>
<%% log.error("An error occurred:", error); %>
```

#### 4. `requirePrivate` - Requiring Private Files

- **Type**: Function
- **Description**: The `requirePrivate` function allows you to require private files that are not accessible by any route. This is useful for including sensitive configuration files, utilities, or modules that should not be exposed to the public.

##### Example Usage:

```ejs
<%%
  const config = requirePrivate('config');
  log.dbg("Config loaded:", config);
%>
```

See [Private Files](/docs/private-files) for more information.

#### 5. `stringify` - Circular-Safe Stringify Helper

- **Type**: Function
- **Description**: The `stringify` helper is a `JSON.stringify` replacement that prevents circular references from causing errors. It is useful when you need to serialize complex objects for logging or debugging.

##### Example Usage:

```ejs
<%% log.dbg("Request Context:", stringify(context)); %>
```

#### 6. `context` - The Context Object Itself

- **Type**: Object
- **Description**: The `context` property refers to the request context object itself. This can be useful if you need to pass the entire context downstream, for example, when making further processing decisions or passing it to other modules.

##### Example Usage:

```ejs
<%%
  function processContext(ctx) {
    // Do something with the context
  }

  processContext(context);
%>
```

#### 7. `asset` - Asset URL Helper

- **Type**: Function
- **Description**: The `asset` function is used to wrap asset URLs, appending a cache-busting stamp when `$app.isDev() === true`. This is important when you are developing remotely and are behind a CDN like Cloudflare that caches assets. It ensures that you always get the latest version of your assets during development.

##### Example Usage:

```ejs
<img src="<%%= asset('images/logo.png') %>" alt="Logo">
```

- **Development Mode Output**:

  ```html
  <img src="images/logo.png?__cache=12885832" alt="Logo" />
  ```

- **Production Mode Output**:

  ```html
  <img src="images/logo.png" alt="Logo" />
  ```

#### 8. `url` - URL Parsing Function

- **Type**: Function
- **Description**: The `url` function is used to parse a URL string. It returns an object equivalent to using `new URL()` in the browser's Web API. This can be helpful for manipulating or inspecting URLs within your EJS templates.

##### Example Usage:

```ejs
<%%
  const parsedUrl = url('https://example.com/path?query=123');
%>
<p>Hostname: <%%= parsedUrl.hostname %></p>
<p>Pathname: <%%= parsedUrl.pathname %></p>
<p>Search Params: <%%= parsedUrl.search %></p>
```

#### 9. `env` - Accessing Environment Variables

- **Type**: Function
- **Description**: The `env` function allows you to securely access environment variables within your EJS templates. Environment variables are often used to store secrets such as API keys, database credentials, and other sensitive information that should not be hard-coded into your application.

##### Example Usage:

```ejs
<%%
  const apiKey = env('API_KEY');
  log.info('API Key accessed.');
%>

<p>Your API Key is: <%%= apiKey %></p>
```

> **Note**: Be cautious when displaying sensitive information in your templates to avoid exposing secrets.

#### 10. `data` - Accessing Loaded Data

- **Type**: Object
- **Description**: The `data` property in the request context contains any data that was loaded by the `+load.js` file at the current route level. This data is available to your EJS templates and can be used to dynamically generate content based on the request.

##### Example Usage:

```ejs
<h1>Product Name: <%%= data.product.name %></h1>
<p>Price: $<%%= data.product.price %></p>
```

#### 11. `meta` - Managing Page Metadata and Global Values

- **Type**: Function
- **Description**: The `meta` function provides a way to get and set metadata and other global values during request processing. While it can be used for any global values, it's most commonly used to manage page metadata like titles, descriptions, and OpenGraph tags.

##### Function Signature:

```typescript
meta(key: string): string | undefined
meta(key: string, value: string): string
```

##### Usage Patterns:

1. **Getting a value**:

```ejs
<%% const pageTitle = meta('title'); %>
```

2. **Setting a value**:

```ejs
<%% meta('title', 'Welcome to My Site'); %>
```

##### Common Use Cases:

The most common use case for `meta` is setting page metadata in your `+load.js` files and then using those values in your layout templates. Here's a typical example from a layout file:

```ejs
<head>
    <title><%%= meta('title') || 'PocketPages' %></title>

    <meta
      name="description"
      content="<%%= meta('description') || 'Server-side pages for PocketBase' %>"
    />

    <!-- OpenGraph tags -->
    <meta property="og:title" content="<%%= meta('title') || 'PocketPages' %>" />
    <meta
      property="og:description"
      content="<%%= meta('description') || 'Server-side pages for PocketBase' %>"
    />
    <meta
      property="og:image"
      content="<%%= meta('image') || 'https://pocketpages.dev/android-chrome-512x512.png' %>"
    />
    <meta
      property="og:url"
      content="<%%= meta('path') ? `https://pocketpages.dev${meta('path')}` : meta('url') || `https://pocketpages.dev${ctx.request().url}` %>"
    />
</head>
```

##### Setting Metadata in Load Files:

You can set metadata values in your `+load.js` files before the page renders:

```js
export default async ({ meta }) => {
  meta('title', 'About Us')
  meta('description', 'Learn more about our company and mission')
  meta('image', 'https://example.com/about-preview.jpg')

  return {
    // ... other loaded data
  }
}
```

##### Additional Use Cases:

While metadata is the primary use case, `meta` can be used for any global values that need to be accessed across different parts of your application during a request:

```ejs
<%%
  // Set a global theme
  meta('theme', 'dark');

  // Set the current user's preferred language
  meta('language', 'en-US');

  // Later, access these values anywhere in your templates
  const theme = meta('theme');
  const language = meta('language');
%>
```

> **Note**: Values set using `meta` only persist for the duration of the current request. They do not persist across different requests or between different users.

#### 12. `print` - HTTP Response Output Helper

- **Type**: Function
- **Description**: The `print` function writes directly to the HTTP response body. It can serialize any data type, including functions, and output it to the response. Its behavior differs depending on where it's used:

##### In Template Files (.ejs, .md):

When used in template files, `print` returns a string that must be explicitly output:

```ejs
<%%= print(someFunction) %>
<%%= print({ complex: 'object' }) %>
```

##### In Server Files (+load.js, +middleware.js):

When used in server-side files, `print` writes directly to the HTTP response:

```javascript
// In +load.js
export default async ({ print }) => {
  // This writes directly to the response body
  print(someData)

  // IMPORTANT: Writing to response before headers are set will prevent
  // subsequent header modifications
  return {
    /* ... */
  }
}
```

> **Warning**: In server files, be careful with `print` as it writes immediately to the response body. If you write to the response before setting headers, subsequent attempts to set headers will fail.

##### Example Usage:

```ejs
<!-- Output a complex object -->
<pre>
  <%%= print({
    name: 'Test Object',
    method: function() { return 'hello' },
    nested: {
      data: [1, 2, 3]
    }
  }) %>
</pre>

<!-- Output a function -->
<pre>
  <%%= print(function complexFunction() {
    // Some complex logic
    return 'result'
  }) %>
</pre>
```

##### `print` vs `log`:

The key differences between `print` and `log`:

- **`print`**:

  - Writes directly to the HTTP response body
  - Output appears in the user's browser
  - Can serialize any data type, including functions
  - In templates, returns a string that must be output with `<%%= print(data) %>`
  - Handy for on-the-fly debugging in templates and middleware

- **`log`**:
  - Writes to the PocketBase logging system
  - Output appears in the PocketBase Admin UI's logs
  - Has different severity levels (dbg, info, warn, error)
  - Intended for application logging and monitoring

```javascript
// Example comparing print and log:
export default async ({ print, log }) => {
  // This writes to the response body (user sees this)
  print('Response data')

  // This writes to PocketBase logs (admin sees this)
  log.info('Request processed')

  return {
    /* ... */
  }
}
```

> **Note**: While `print` is primarily an output mechanism that writes to the HTTP response, it's also quite convenient for quick debugging during development - similar to PHP's inline debugging style. You can immediately see the output in your browser without checking log files or admin panels. However, for production monitoring and logging, `log` is more appropriate.

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
