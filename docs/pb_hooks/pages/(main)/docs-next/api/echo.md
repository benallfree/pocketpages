---
title: echo - Response Output Helper
description: Write directly to the response output, primarily useful for quick debugging but also for custom response handling.
---

# `echo()` - Response Output Helper

- **Type**: `Function(...args: any[]) => string`
- **Description**: Converts values to strings and optionally writes to response
- **Global**: Yes (available as `echo()` in templates)
- **API Method**: `api.echo(...args)`

> **Note**: While `echo()` can be used for any response output, it's particularly handy for quick debugging, similar to PHP's `echo`. Objects are automatically stringified, so there's no need to call `JSON.stringify()` unless you need special formatting.

## Basic Usage

```ejs
<!-- Quick debugging -->
<%%= echo(someVariable) %>

<!-- Objects are automatically stringified -->
<%%= echo({ hello: 'world' }) %>

<!-- Custom response in middleware -->
<%%
if (someCondition) {
  // Only use JSON.stringify if you need specific formatting
  echo(JSON.stringify({ status: 'ok' }, null, 2))
  return
}
%>
```

## Common Use Cases

### Debugging

```ejs
<!-- Quick variable inspection -->
<pre>
Data: <%%= echo(data) %>
Params: <%%= echo(params) %>
Form: <%%= echo(formData) %>
</pre>

<!-- Debug points -->
<%%= echo('>>> Checkpoint 1') %>
```

### Custom Responses

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { echo, request } = api

  // Handle special cases
  if (request.header('Accept') === 'application/json') {
    echo(JSON.stringify({ ok: true }))
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
<pre><%%= echo(mysteriousFunction) %></pre>
```

## echo() vs Logging

- **echo()**: Response output and debugging

  ```ejs
  <%%= echo(data) %>  <!-- Shows in browser -->
  ```

- **dbg(), info()**: Server-side logging
  ```ejs
  <%% dbg(data) %>    <!-- Shows in server console -->
  ```

## See Also

- [Logging Functions](/docs-next/api/log)
- [API Documentation](/docs-next/api)
