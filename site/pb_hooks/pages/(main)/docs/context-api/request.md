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

### `cookies`

- Type:
  ```typescript
  {
    <T = Record<string, any>>(): T
    <T>(name: string): T
  }
  ```
- Description: Function that returns cookie values with type safety. When called with no arguments, returns all cookies as the specified type (defaults to `Record<string, any>`). When called with a name, returns that specific cookie's value with the specified type.

Example usage:

```ejs
<%%
// Get a specific cookie with type
interface UserPreferences {
  theme: string
  fontSize: number
}
const userPrefs = request.cookies<UserPreferences>('preferences')
// TypeScript knows these properties exist
const theme = userPrefs.theme
const fontSize = userPrefs.fontSize

// Get a simple string cookie
const theme = request.cookies<string>('theme')

// Get all cookies with type
interface AllCookies {
  theme: string
  preferences: UserPreferences
  session: { id: string }
}
const allCookies = request.cookies<AllCookies>()
// TypeScript knows the shape of all cookies
const sessionId = allCookies.session.id
%>
```

### Type-Safe Cookie Examples

```ejs
<%%
// Define your cookie types
interface SessionData {
  userId: number
  role: string
  lastAccess: string
}

interface CartData {
  items: number[]
  total: number
}

// Get typed cookies
const session = request.cookies<SessionData>('session')
// TypeScript knows these are the correct types
const userId: number = session.userId
const role: string = session.role

const cart = request.cookies<CartData>('cart')
// Array methods available because TypeScript knows items is number[]
const itemCount = cart.items.length
const total: number = cart.total

// Arrays with explicit type
const recentItems = request.cookies<number[]>('recentItems')
// TypeScript knows this is a number array
const lastItem = recentItems[recentItems.length - 1]

// Get all cookies with a defined structure
interface CookieStore {
  session: SessionData
  cart: CartData
  recentItems: number[]
  theme: string
}
const store = request.cookies<CookieStore>()
// Full type safety on all cookie access
const cartTotal = store.cart.total
const currentTheme = store.theme
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
