# `log` - Logging Functions

- **Type**: Object containing `{ dbg, info, warn, error }`
- **Description**: The `log` object provides logging functions corresponding to the `$app.logger()` functions. These methods are used for logging debug information, informational messages, warnings, and errors during the request handling process. When PocketBase is run with `--dev` mode, `dbg` logs will also appear in the console output; otherwise, only `info`, `warn`, and `error` will be displayed.

## Logging Methods:

- **`log.dbg(...args)`**: Debug-level logging. Visible in console output when running in `--dev` mode.
- **`log.info(...args)`**: Informational messages.
- **`log.warn(...args)`**: Warnings.
- **`log.error(...args)`**: Error messages.

## Example Usage:

```ejs
<%% log.dbg("Product ID:", params.productId); %>
<%% log.info("User accessed the product page."); %>
<%% log.warn("Deprecated API used."); %>
<%% log.error("An error occurred:", error); %>
```
