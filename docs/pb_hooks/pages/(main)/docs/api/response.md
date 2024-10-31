---
title: response - HTTP Response Object
description: Modify HTTP response headers, status codes, and content in PocketPages templates.
---

# `response` - HTTP Response Object

- **Type**: [`PagesResponse`](https://github.com/pockethost/pockethost/blob/main/src/lib/pages/index.ts)
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

## Example Usage

### Success Response

```ejs
<%%
const data = {
    user: {
        name: 'John Doe',
        email: 'john@example.com'
    }
}

response.json(200, data)
%>
```

### Error Handling

```ejs
<%%
if (!params.id) {
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

### File Downloads

```ejs
<%%
// Serve a file
response.file('/path/to/document.pdf')
%>
```

### Redirects

```ejs
<%%
if (!user.isAuthenticated) {
    response.redirect('/login')
    return
}

// Permanent redirect
response.redirect('/new-page', 301)
%>
```
