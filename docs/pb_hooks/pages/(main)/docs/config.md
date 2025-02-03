---
title: Custom Configuration with +config.js
description: Configuration options for file processing and routing in pb_hooks/pages, including preprocessor extensions, static file handling, and non-routable file patterns.
---

# Custom Configuration with `+config.js`

In the `pb_hooks/pages/` root, you can create a `+config.js` file to define custom configuration options for your application. This file allows you to control how files are processed within your app, particularly when using preprocessors like EJS.

```
pb_hooks/
  pages/
    +config.js
```

## Example Configuration

Here is an example of a basic `+config.js` file:

```javascript
module.exports = {
  preprocessorExts: ['.md', '.ejs'],
  debug: false,
  host: 'http://127.0.0.1:8090',
  boot: (api) => {
    // Execute code during PocketPages startup
    // Note: Only global API methods are available here
    api.dbg('Starting up...')
  },
}
```

## Configuration Options

- **`preprocessorExts`**: An array that specifies which file extensions should be passed through the EJS preprocessor. Files with these extensions will be processed by EJS before being served. Any other file types not listed in this array will be served as static files.

- **`debug`**: A boolean that enables internal PocketPages debugging output to the console. When set to `true`, it will output information about routes, parameters, and other internal details that are helpful for troubleshooting. Defaults to `false`.

- **`host`**: A string that specifies the base URL of your PocketBase server. This is used internally to make REST API calls back into PocketBase as is sometimes more convenient than using the PocketBase JSVM API. Defaults to `'http://127.0.0.1:8090'`.

- **`boot`**: A function that runs during PocketPages initialization. It receives the global API object (not the context API) as its argument, giving you access to core functionality like logging, database queries, and user management. This function runs before any routes are processed and is useful for startup tasks like environment validation or database initialization. See [Boot Process](/docs/boot) for detailed documentation.

## File Routing Rules

- **Static Files**: Files that do not have extensions listed in `preprocessorExts` will be served directly as static files.
