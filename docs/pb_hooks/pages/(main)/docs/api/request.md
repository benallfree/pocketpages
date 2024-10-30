---
title: request - HTTP Request Object
description: Access HTTP request details including method, headers, and query parameters in PocketPages templates.
---

# `request` - HTTP Request Object

- **Type**: [`echo.Request`](https://pocketbase.io/jsvm/interfaces/http.Request.html)
- **Description**: The `request` property provides direct access to the Echo framework's request object, allowing you to inspect various aspects of the incoming HTTP request. It's an alias for `ctx.request()`.

## Common Methods

### Headers

```ejs
<%%
// Get a specific header
const userAgent = request.header('User-Agent')
const accept = request.header('Accept')
const contentType = request.header('Content-Type')

// Get all headers as an object
const headers = request.headers()
%>
```

### Request Information

```ejs
<%%
// Basic request properties
const method = request.method
const host = request.host
const remoteIP = request.ip
const scheme = request.scheme // "http" or "https"
%>
```

### Query Parameters

```ejs
<%%
// Get all query parameters
const query = request.url.query

// Access individual parameters
const page = query.page || '1'
const sort = query.sort || 'date'
%>
```

## Example Usage

### Basic Request Information Page

```ejs
<!DOCTYPE html>
<html>
<head>
    <title>Request Information</title>
</head>
<body>
    <h1>Request Details</h1>

    <h2>Basic Information</h2>
    <ul>
        <li>Method: <%%= request.method %></li>
        <li>Host: <%%= request.host %></li>
        <li>IP Address: <%%= request.ip %></li>
        <li>Protocol: <%%= request.scheme %></li>
    </ul>

    <h2>Headers</h2>
    <ul>
        <li>User Agent: <%%= request.header('User-Agent') %></li>
        <li>Accept: <%%= request.header('Accept') %></li>
        <li>Accept Language: <%%= request.header('Accept-Language') %></li>
    </ul>

    <h2>Query Parameters</h2>
    <pre><%%= stringify(request.url.query) %></pre>
</body>
</html>
```

### Content Type Handling

```ejs
<%%
const contentType = request.header('Content-Type')

switch (contentType) {
    case 'application/json':
        // Handle JSON request
        break
    case 'application/x-www-form-urlencoded':
        // Handle form data
        break
    case 'multipart/form-data':
        // Handle file uploads
        break
}
%>
```

### API Request Validation

```ejs
<%%
// Check for required API key
const apiKey = request.header('X-API-Key')
if (!apiKey) {
    ctx.response().status(401)
    %>
    <h1>API Key Required</h1>
    <%%
    return
}

// Validate content type for POST requests
if (request.method === 'POST') {
    const contentType = request.header('Content-Type')
    if (!contentType?.includes('application/json')) {
        ctx.response().status(415)
        %>
        <h1>JSON Content Type Required</h1>
        <%%
        return
    }
}
%>
```

## Important Notes

1. The request object is read-only - use `response` to modify the response
2. Headers are case-insensitive
3. Query parameters are always strings
4. For form data, use the `formData` helper instead of parsing the request body directly
5. For route parameters (from URL paths), use the `params` object

## Common Headers

- `User-Agent`: Browser/client identification
- `Accept`: Content types the client can handle
- `Accept-Language`: Preferred languages
- `Content-Type`: Type of data being sent
- `Authorization`: Authentication credentials
- `Cookie`: Client cookies
- `Referer`: Previous page URL
- `X-Forwarded-For`: Original client IP when behind a proxy

## Best Practices

1. Always validate required headers
2. Check content types for POST/PUT requests
3. Use appropriate helper functions when available
4. Handle missing values gracefully
5. Be cautious with user-provided header values

See [Echo Request Documentation](https://pocketbase.io/jsvm/interfaces/http.Request.html) for a complete list of available methods and properties.
