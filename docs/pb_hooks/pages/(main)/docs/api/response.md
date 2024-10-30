---
title: response - HTTP Response Object
description: Modify HTTP response headers, status codes, and content in PocketPages templates using the response object.
---

# `response` - HTTP Response Object

- **Type**: [`echo.Response`](https://pocketbase.io/jsvm/interfaces/echo.Response.html)
- **Description**: The `response` property provides direct access to the Echo framework's response object, allowing you to modify the HTTP response before it's sent to the client. It's an alias for `ctx.response()`.

## Common Methods

### Headers

```ejs
<%%
// Set a single header
response.header('X-Custom-Header', 'value')
response.header('Cache-Control', 'no-cache')

// Set multiple headers
response.headers({
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff'
})
%>
```

### Status Codes

```ejs
<%%
// Set response status
response.status(201)  // Created
response.status(404)  // Not Found
response.status(500)  // Server Error
%>
```

### Writing Content

```ejs
<%%
// Write directly to response
response.write('Some content')
response.write(Buffer.from('Binary content'))
%>
```

## Example Usage

### Error Handling

```ejs
<%%
if (!params.id) {
    response.status(400)
    %>
    <h1>Bad Request</h1>
    <p>ID parameter is required</p>
    <%%
    return
}

const record = $app.dao().findRecordById('collection', params.id)
if (!record) {
    response.status(404)
    %>
    <h1>Not Found</h1>
    <p>Record not found</p>
    <%%
    return
}
%>
```

### API Response

```ejs
<%%
// Set JSON content type
response.header('Content-Type', 'application/json')

// Set CORS headers
response.header('Access-Control-Allow-Origin', '*')
response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

// Return JSON data
response.status(200)
response.write(stringify({
    success: true,
    data: { message: 'Hello World' }
}))
return
%>
```

### File Download

```ejs
<%%
const filename = 'report.pdf'
response.header('Content-Type', 'application/pdf')
response.header('Content-Disposition', `attachment; filename="${filename}"`)

// Write file content
const fileContent = $app.dao().findRecordById('files', params.id)
if (fileContent) {
    response.write(fileContent)
} else {
    response.status(404)
    %>
    <h1>File Not Found</h1>
    <%%
}
%>
```

## Common Status Codes

- 200: OK (Success)
- 201: Created
- 204: No Content
- 301: Moved Permanently
- 302: Found (Temporary Redirect)
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 405: Method Not Allowed
- 500: Internal Server Error

## Important Notes

1. Once you write to the response, you should `return` to prevent further output
2. Headers must be set before writing any content
3. Status code should be set before writing content
4. Use appropriate content types for different response formats
5. Consider security headers for HTML responses

## Security Headers

```ejs
<%%
// Set common security headers
response.headers({
    'X-Frame-Options': 'DENY',                // Prevent clickjacking
    'X-Content-Type-Options': 'nosniff',      // Prevent MIME-type sniffing
    'X-XSS-Protection': '1; mode=block',      // Enable XSS filtering
    'Referrer-Policy': 'same-origin',         // Control referrer information
    'Content-Security-Policy': "default-src 'self'" // Restrict resource loading
})
%>
```

## Best Practices

1. Always set appropriate status codes
2. Include security headers for HTML responses
3. Set proper content types
4. Handle errors gracefully
5. Use consistent response formats
6. Consider CORS headers when needed
7. Validate input before sending responses
8. Use appropriate character encoding

See [Echo Response Documentation](https://pocketbase.io/jsvm/interfaces/echo.Response.html) for a complete list of available methods and properties.
