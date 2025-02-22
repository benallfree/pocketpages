---
title: body - Raw Request Body
description: Access the raw request body data in PocketPages templates through a function call.
---

# `body` - Raw Request Body

- **Type**: `() => Record<string, any> | string`
- **Description**: A function that returns the raw request body data. It returns either a parsed object for JSON content or a raw string for other content types.

## Basic Usage

### Handling JSON Requests

```ejs
<%% if (request.method === 'POST') { %>
    <%% if (request.headers['content-type']?.includes('application/json')) { %>
        <div class="debug">
            Received JSON data:
            <pre><%%= stringify(body()) %></pre>
        </div>
    <%% } %>
<%% } %>
```

### API Endpoint Example

```ejs
<%%
if (request.method === 'POST') {
    const data = body()
    if (typeof data !== 'object' || !data.username || !data.password) {
        response.status(400)
        response.json({
            error: 'Missing required fields'
        })
        return
    }

    try {
        const user = signInUserWithPassword(data.username, data.password)
        response.json({
            success: true,
            user: user
        })
    } catch (error) {
        response.status(401)
        response.json({
            error: error.message
        })
    }
}
%>
```

## Raw Body Processing

```ejs
<%%
if (request.method === 'POST') {
    const rawBody = body()

    if (typeof rawBody === 'string') {
        // Process raw string data
        const lines = rawBody.split('\n')
        // ... process the data
        response.json({
            linesProcessed: lines.length
        })
    } else {
        response.status(400)
        response.json({ error: 'Expected raw text data' })
    }
}
%>
```

## Important Notes

1. `body()` is a function that must be called to access the request body
2. For form submissions with `application/x-www-form-urlencoded` or `multipart/form-data` content types, use [`formData`](/docs/context-api/form-data) instead
3. Returns a JavaScript object for JSON content types
4. Returns a string for other content types
5. Consider type checking the return value before using it

See [Request Handling](/docs/request-handling) for more detailed information about working with HTTP requests in PocketPages.
