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
}
```

## Configuration Options

- **`preprocessorExts`**: An array that specifies which file extensions should be passed through the EJS preprocessor. Files with these extensions will be processed by EJS before being served. Any other file types not listed in this array will be served as static files.

## File Routing Rules

- **Static Files**: Files that do not have extensions listed in `preprocessorExts` will be served directly as static files.
