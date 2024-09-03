# Custom Configuration with `+config.js`

In the `app/` root, you can create a `+config.js` file to define custom configuration options for your application. This file allows you to control how files are processed within your app, particularly when using preprocessors like EJS.

```
app/
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

- **Non-Routable Files**: Files following the `+` or `_` prefix rule (e.g., `+private.js`, `_layout.ejs`) are considered non-routable. They will not be directly accessible via a URL. These files are typically used for internal logic or layout templates.
