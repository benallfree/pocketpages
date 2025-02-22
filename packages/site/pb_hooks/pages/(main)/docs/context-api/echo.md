---
title: echo - Response Output Helper
description: Write directly to the response output, useful for both debugging and custom response handling.
---

# `echo()` - Response Output Helper

- **Type**: `Function(...args: any[]) => void`
- **Description**: Writes values directly to the response output stream
- **Global**: Yes (available as `echo()` in templates)
- **API Method**: `api.echo(...args)`

> **Note**: `echo()` writes immediately to the response output stream when called, whether in a loader or template. Objects are automatically stringified, so there's no need to call `JSON.stringify()` unless you need special formatting.

## Basic Usage

```ejs
<!-- Direct output in templates -->
<%% echo(someVariable) %>

<!-- Objects are automatically stringified -->
<%% echo({ hello: 'world' }) %>

<!-- Multiple arguments -->
<%% echo('Status:', status, 'Count:', count) %>
```

## Common Use Cases

### Debugging

```ejs
<!-- Quick variable inspection -->
<pre>
<%% echo('Data: ', data) %>
<%% echo('Params: ', params) %>
<%% echo('Form: ', formData) %>
</pre>

<!-- Debug points -->
<%% echo('>>> Checkpoint 1') %>
```

### Custom Responses

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { echo, request } = api

  // Early response - outputs before headers are sent
  if (request.header('Accept') === 'application/json') {
    echo({ ok: true })
    return {}
  }

  // Continue to template rendering
  return {
    /* ... */
  }
}
```

### Function Inspection

```ejs
<!-- See what a function looks like -->
<pre>
<%% echo(mysteriousFunction) %>
</pre>
```

## echo() vs Logging

- **echo()**: Immediate response output

  ```ejs
  <%% echo(data) %>  <!-- Shows in browser -->
  ```

- **dbg(), info()**: Server-side logging
  ```ejs
  <%% dbg(data) %>   <!-- Shows in server console -->
  ```

## Important Notes

- In loaders, `echo()` writes to the response stream before headers are sent
- In templates, `echo()` writes inline with the template output
- No need to use `<%%= %>` - just `<%% echo() %>` is sufficient
- Multiple arguments are automatically space-separated
- Objects are automatically stringified

## See Also

- [Logging Functions](/docs/global-api/log)
- [Global API](/docs/global-api)
- [Context API Documentation](/docs/context-api)
