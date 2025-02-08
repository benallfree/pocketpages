---
title: request - HTTP Request Object
description: Access HTTP request details including method, headers, and query parameters in PocketPages templates.
---

# `request` - HTTP Request Object

- **Type**: [`PagesRequest`](https://github.com/benallfree/pocketpages/blob/main/src/lib/pages/index.ts#L6-L12)
- **Description**: The `request` object provides access to essential HTTP request information in a framework-agnostic way. This abstraction ensures your templates remain compatible across PocketBase versions.

## Properties

### `auth`

- Type: `core.Record | undefined`
- Description: The authenticated user record, if available

### `method`

- Type: `'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'`
- Description: The HTTP method of the request

### `url`

- Type: `URLParse<string>`
- Description: A parsed URL object containing query parameters and other URL components

### `formData()`

- Type: `() => Record<string, any>`
- Description: Function that returns form data submitted with the request

### `body()`

- Type: `() => Record<string, any> | string`
- Description: Function that returns request body as an object (if JSON) or string (if form data)

### `header()`

- Type: `(name: string) => string`
- Description: Function that returns the value of the specified request header

### `cookies()`

- Type:
  ```typescript
  {
    (): Record<string, any>
    (name: string): any
  }
  ```
- Description: Function that returns cookie values, automatically parsing JSON when possible. When called with no arguments, returns all cookies as an object. When called with a name, returns that specific cookie's value.

Example usage:

```ejs
<%%
// Get a specific cookie (automatically JSON parsed if possible)
const userPrefs = request.cookies('preferences') // Returns parsed JSON if valid
const theme = request.cookies('theme') // Returns string if not JSON

// Get all cookies (with JSON parsing)
const allCookies = request.cookies()
%>
```

## Example Usage

### Basic Request Information

```ejs
<%%
// Access request method
const method = request.method

// Get URL information
const path = request.url.pathname
const query = request.url.query

// Access form data
const formData = request.formData()

// Access raw body
const rawBody = request.body()
%>
```

### Authentication Check

```ejs
<%%
if (request.auth) {
  // User is authenticated
  const userId = request.auth.id
  const email = request.auth.email
} else {
  // User is not authenticated
}
%>
```

### Query Parameter Handling

```ejs
<%%
// Access query parameters from the URL
const page = request.url.query.page || '1'
const sort = request.url.query.sort || 'date'
%>
```

### Form Data Processing

```ejs
<%%
if (request.method === 'post') {
    // Access submitted form data
    const formData = request.formData()
    const username = formData.username
    const email = formData.email
}
%>
```

### Working with Headers and Cookies

```ejs
<%%
// Access request headers
const userAgent = request.header('User-Agent')
const contentType = request.header('Content-Type')

// Working with cookies
const sessionData = request.cookies('session') // Returns parsed JSON if valid
const rawTheme = request.cookies('theme') // Returns string if not JSON

// Get all cookies with automatic JSON parsing
const allCookies = request.cookies()
const { session, theme, preferences } = allCookies
%>
```
