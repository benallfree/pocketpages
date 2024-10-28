# `print` - HTTP Response Output Helper

- **Type**: Function
- **Description**: The `print` function writes directly to the HTTP response body. It can serialize any data type, including functions, and output it to the response. Its behavior differs depending on where it's used:

## In Template Files (.ejs, .md):

When used in template files, `print` returns a string that must be explicitly output:

```ejs
<%%= print(someFunction) %>
<%%= print({ complex: 'object' }) %>
```

## In Server Files (+load.js, +middleware.js):

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

## Example Usage:

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

## `print` vs `log`:

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
