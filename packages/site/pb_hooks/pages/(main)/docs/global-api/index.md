---
title: Global API
description: Core utility functions available everywhere in PocketPages, including logging, string manipulation, and data helpers.
---

# Understanding the Global API

The Global API provides utility functions that are automatically available in all request contexts (EJS templates, loaders, middleware) and can also be accessed via `require('pocketpages').globalApi` when needed outside of request contexts. These functions are context-free, meaning they don't depend on the current request or response state.

## How to Access the Global API

The Global API functions are automatically injected into:

1. **EJS Templates**: Available directly (no import needed)
2. **Loaders (`+load.js`)**: Available in the API parameter
3. **Middleware**: Available in the API parameter

For code outside of request contexts (like utility libraries), you can import via:

```js
const { globalApi } = require('pocketpages')
```

### Example: Using the Global API in Request Contexts

```js
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  // Global API functions are available directly from api
  api.dbg('Processing data:', api.stringify(data))

  const parsed = api.url('https://example.com/path?q=search')
  return parsed.searchParams.get('q')
}
```

### Example: Using the Global API in EJS

```ejs
<%%
  // Logging
  dbg("Debug message");
  info("Info message");
  warn("Warning message");
  error("Error message");

  // JSON handling
  const str = stringify({ hello: "world" });

  // URL parsing
  const parsed = url('https://example.com/path?q=search');
%>

<p>Search param: <%%= parsed.searchParams.get('q') %></p>

<%%
  // Environment variable access
  const apiKey = env('API_KEY');

  // Global store
  store('viewCount', 5);
  const count = store('viewCount');
%>
```

## Available Global Functions

The Global API provides these core utility functions:

- **URL Handling**

  - `url(path: string)` - Parse URLs with automatic query string parsing

- **Data Handling**

  - `stringify()` - Safe JSON stringification
  - `store(name: string, value?: any)` - Get/set values in global store

- **Environment**

  - `env(key: string)` - Access environment variables

- **Logging**
  - `dbg()` - Debug level logging
  - `info()` - Info level logging
  - `warn()` - Warning level logging
  - `error()` - Error level logging

## Additional Features via Plugins

Many additional utilities are available through official plugins:

- **@pocketpages-plugin/js-sdk**: PocketBase SDK client
- **@pocketpages-plugin/micro-dash**: Lodash-like utilities
- **@pocketpages-plugin/marked**: Markdown processing

## Using in Libraries

The Global API is particularly useful when writing reusable functions that don't need request context:

```js
// myLibrary.js
const { globalApi } = require('pocketpages')
const { dbg, stringify } = globalApi

function processUserData(user) {
  dbg('Processing user:', stringify(user))
  // ... processing logic
}

module.exports = { processUserData }
```

## Additional Notes

- Global API functions are always available in request contexts without requiring imports
- They're designed to be context-free and work consistently everywhere
- For code outside request contexts, use `require('pocketpages').globalApi`
- The functions are safe to use anywhere in your application

For detailed information about specific API methods, please refer to the individual API documentation pages in the sidebar.
