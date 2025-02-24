---
title: request - HTTP Request Object
description: Access HTTP request details including method, headers, and query parameters in PocketPages templates.
---

# `request` - HTTP Request Object

- **Type**: [`PagesRequest`](https://github.com/benallfree/pocketpages/blob/main/src/lib/pages/index.ts#L6-L12)
- **Description**: The `request` object provides access to essential HTTP request information and the underlying PocketBase request event.

## Properties

### `event`

- Type: `core.RequestEvent`
- Description: The underlying PocketBase request event, providing direct access to PocketBase's request handling capabilities

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
- Description: Function that returns form data submitted with the request. Uses `event.requestInfo().body` internally.

### `body()`

- Type: `() => Record<string, any> | string`
- Description: Function that returns request body as an object (if JSON) or string (if form data). Uses `event.requestInfo().body` internally.

### `header()`

- Type: `(name: string) => string`
- Description: Function that returns the value of the specified request header. Returns empty string if header not found.

### `cookies`

- Type:
  ```typescript
  {
    <T = Record<string, any>>(): T
    <T>(name: string): T | undefined
  }
  ```
- Description: Function that returns cookie values with automatic JSON parsing. When called with no arguments, returns all cookies. When called with a name, returns that specific cookie's value.

## Cookie Handling

The `cookies` function automatically:

1. Parses the Cookie header only once
2. Attempts to parse JSON values
3. Falls back to raw string values if JSON parsing fails
4. Provides type safety through generics

Example usage:

```ejs
<%%
// Get a specific cookie with type
interface UserPreferences {
  theme: string
  fontSize: number
}
const userPrefs = request.cookies<UserPreferences>('preferences')

// Get all cookies with type
interface AllCookies {
  preferences: UserPreferences
  session: { id: string }
}
const allCookies = request.cookies<AllCookies>()
%>
```

## Using the Request Event

The `event` property gives you direct access to PocketBase's request handling:

```ejs
<%%
// Access the raw request event
const { event } = request

// Get request info
const info = event.requestInfo()
const rawBody = info.body
const rawHeaders = info.headers

// Access PocketBase context
const pb = event.context
%>
```

## Example Usage

### Basic Request Information

```ejs
<%%
// Get method and URL
const { method, url } = request

// Access query parameters
const page = url.query.page
const sort = url.query.sort

// Get headers
const userAgent = request.header('User-Agent')
%>
```

### Form Data and Body

```ejs
<%%
if (request.method === 'POST') {
  // Get form data
  const formData = request.formData()

  // Or get raw body
  const body = request.body()
}
%>
```

### Working with Cookies

```ejs
<%%
// Type-safe cookie access
interface SessionData {
  userId: string
  role: string
}

// Get a single typed cookie
const session = request.cookies<SessionData>('session')
if (session) {
  const { userId, role } = session
}

// Get all cookies
const allCookies = request.cookies()
%>
```

### Authentication Context

```ejs
<%%
if (request.auth) {
  // Access auth record properties
  const { id, email } = request.auth

  // Use with pb() client
  const client = pb({ request })
}
%>
```
