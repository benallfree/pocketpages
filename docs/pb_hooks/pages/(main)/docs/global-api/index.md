---
title: Global API
description: Core utility functions available everywhere in PocketPages, including logging, string manipulation, and data helpers.
---

# Understanding the Global API

The Global API provides utility functions that are available both in EJS templates and in any JavaScript code via `require('pocketpages')`. These functions are context-free, meaning they don't depend on the current request or response context.

## How to Access the Global API

There are two ways to access these functions:

1. **In EJS Templates**: The functions are automatically available (along with the Context API)
2. **In JavaScript Files**: Import via require

### Example: Using the Global API in JavaScript

```js
const { dbg, stringify, url } = require('pocketpages')

function processData(data) {
  dbg('Processing data:', stringify(data))

  const parsed = url('https://example.com/path?q=search')
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
  const obj = { hello: "world" };
  const str = stringify(obj);

  // URL parsing
  const parsed = url('https://example.com/path?q=search');
%>

<p>Search param: <%%= parsed.searchParams.get('q') %></p>

<%%
  // Database helpers
  const record = findRecordByFilter('users', 'username = "admin"');
  const records = findRecordsByFilter('posts', 'published = true');

  // Micro-dash utilities
  forEach([1, 2, 3], n => {
    dbg(n);
  });
%>
```

## Available Global Functions

The Global API provides several utility functions:

- **Logging**

  - `dbg()` - Debug level logging
  - `info()` - Info level logging
  - `warn()` - Warning level logging
  - `error()` - Error level logging

- **Data Handling**

  - `stringify()` - Safe JSON stringification
  - `url()` - URL parsing and manipulation

- **Database Helpers**

  - `findRecordByFilter()` - Find single record
  - `findRecordsByFilter()` - Find multiple records

- **Micro-dash Utilities**
  - `forEach()` - Array iteration
  - `keys()` - Object key extraction
  - `values()` - Object value extraction
  - `merge()` - Object merging

## Using in Libraries

The Global API is particularly useful when writing reusable functions that don't need request context:

```js
// myLibrary.js
const { dbg, stringify } = require('pocketpages')

function processUserData(user) {
  dbg('Processing user:', stringify(user))
  // ... processing logic
}

module.exports = { processUserData }
```

## Additional Notes

- Global API functions are always available, whether in templates or JavaScript files
- They're designed to be context-free and work consistently everywhere
- The same functions are merged into the Context API for convenience in templates
- Use `require('pocketpages')` when you need these functions in separate files or libraries

For detailed information about specific API methods, please refer to the individual API documentation pages in the sidebar.
