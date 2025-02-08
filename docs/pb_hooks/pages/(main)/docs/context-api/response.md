---
title: response - HTTP Response Object
description: Modify HTTP response headers, status codes, and content in PocketPages templates.
---

# `response` - HTTP Response Object

- **Type**: [`PagesResponse`](https://github.com/benallfree/pocketpages/blob/main/src/lib/pages/index.ts#L14-L21)
- **Description**: The `response` object provides methods to control the HTTP response in a framework-agnostic way. This abstraction ensures your templates remain compatible across PocketBase versions.

## Methods

### `file(path: string)`

Serves a file from the filesystem.

```ejs
<%%
// Serve a PDF file
response.file('/path/to/document.pdf')
%>
```

### `write(s: string)`

Writes a string directly to the response body.

```ejs
<%%
response.write('<h1>Hello World</h1>')
%>
```

### `redirect(path: string, status?: number)`

Redirects to another URL, optionally specifying a status code.

```ejs
<%%
// Simple redirect
response.redirect('/dashboard')

// Redirect with status code
response.redirect('/login', 302)
%>
```

### `json(status: number, data: any)`

Sends a JSON response with the specified status code.

```ejs
<%%
response.json(200, {
    success: true,
    data: { message: 'Hello World' }
})
%>
```

### `html(status: number, data: string)`

Sends an HTML response with the specified status code.

```ejs
<%%
response.html(200, '<h1>Hello World</h1>')
%>
```

### `header(name: string, value?: string)`

Gets or sets a response header. If value is provided, sets the header. If value is omitted, returns the current header value.

```ejs
<%%
// Set a header
response.header('Content-Type', 'application/json')
response.header('X-Custom-Header', 'custom-value')

// Get a header value
const contentType = response.header('Content-Type')
%>
```

### `cookie(name: string, value: any, options?: SerializeOptions)`

Sets a cookie in the response. Non-string values are automatically stringified as JSON. Returns the serialized cookie string.

The `options` parameter supports the following properties:

- `domain`: The domain name for the cookie
- `encode`: Custom value encoder function
- `expires`: Expiration date
- `httpOnly`: Flags the cookie to be accessible only by the web server
- `maxAge`: Maximum age in seconds
- `path`: Cookie path (defaults to '/')
- `priority`: Cookie priority ('low', 'medium', 'high')
- `sameSite`: CSRF protection setting ('lax', 'strict', 'none')
- `secure`: Flags the cookie to be used over HTTPS only

```ejs
<%%
// Set a simple string cookie
response.cookie('theme', 'dark')

// Set a cookie with an object (automatically JSON stringified)
response.cookie('preferences', {
    theme: 'dark',
    fontSize: 14,
    notifications: true
})

// Set a cookie with options
response.cookie('session', { userId: 123, role: 'admin' }, {
    httpOnly: true,
    secure: true,
    maxAge: 3600,
    path: '/',
    sameSite: 'strict'
})

// Arrays are also automatically stringified
response.cookie('recentItems', [1, 2, 3, 4, 5])
%>
```

Note: When reading these cookies back using `request.cookies()`, the JSON values will be automatically parsed back into their original form.

## Example Usage

### Complete Response with Headers

```ejs
<%%
// Set headers
response.header('Cache-Control', 'no-cache')
response.header('X-Custom-Header', 'custom-value')

// Set a cookie
response.cookie('session', 'xyz789', {
    httpOnly: true,
    secure: true
})

// Send JSON response
response.json(200, {
    success: true,
    data: { message: 'Operation completed' }
})
%>
```

### Error Handling

```ejs
<%%
if (!params.id) {
    response.header('X-Error-Type', 'validation')
    response.json(400, {
        error: 'Missing ID parameter'
    })
    return
}

if (!record) {
    response.html(404, '<h1>Record Not Found</h1>')
    return
}
%>
```

### File Download with Headers

```ejs
<%%
response.header('Content-Disposition', 'attachment; filename="document.pdf"')
response.file('/path/to/document.pdf')
%>
```
