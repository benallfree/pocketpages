---
title: Authentication in PocketPages
description: Learn how PocketPages handles authentication through JWT tokens and cookies
---

# Authentication in PocketPages

PocketPages provides seamless integration with PocketBase's authentication system, supporting both header-based and cookie-based authentication methods.

## Authentication Flow

PocketPages automatically checks for authentication tokens in this order:

1. `Authorization` header (highest priority)
2. `pb_auth` cookie (fallback)

When a token is found, PocketPages automatically populates the `request.auth` context with a `core.Record` instance containing the authenticated user's information.

## Header-Based Authentication

The `Authorization` header is the primary method for authentication:

```javascript
// Example fetch with Authorization header
fetch('/api/protected', {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1...', // Raw JWT token
  },
})
```

**Important Notes:**

- Unlike typical JWT implementations, PocketBase does not require the `Bearer` prefix
- If present, PocketPages will automatically strip the `Bearer` prefix

## Cookie-Based Authentication

PocketPages also supports authentication via the `pb_auth` cookie:

```javascript
// Example setting auth cookie
document.cookie = 'pb_auth=eyJhbGciOiJIUzI1...; path=/;'
```

**Important:** PocketPages only reads the `pb_auth` cookie - it does not automatically set or manage this cookie. Your application code is responsible for:

- Setting the cookie after successful authentication
- Removing the cookie during logout
- Managing cookie expiration

## Working with Auth Records

The `request.auth` context provides a `core.Record` instance with methods to access user data:

```ejs
<%% if (request.auth) { %>
  <!-- Using Record methods -->
  <p>Welcome, <%%= request.auth.get('email') %></p>
  <p>Username: <%%= request.auth.get('username') %></p>

  <!-- Check verification status -->
  <%% if (request.auth.verified()) { %>
    <p>✓ Verified account</p>
  <%% } %>

  <!-- Access custom fields -->
  <p>Role: <%%= request.auth.get('role') %></p>
<%% } else { %>
  <p>Please log in</p>
<%% } %>
```

Common `core.Record` methods for auth:

- `get(field)` - Get a field value
- `email()` - Get the email address
- `verified()` - Check if email is verified
- `isSuperuser()` - Check if user is admin
- `collection()` - Get the auth collection

## Example Login Flow

Here's a complete example of a login form that handles both cookie and header-based auth:

```ejs
<form id="loginForm" onsubmit="handleLogin(event)">
  <input type="email" name="email" required>
  <input type="password" name="password" required>
  <button type="submit">Login</button>
</form>

<script>
async function handleLogin(e) {
  e.preventDefault()
  const form = e.target
  const data = {
    email: form.email.value,
    password: form.password.value
  }

  const response = await fetch('/api/collections/users/auth-with-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const { token } = await response.json()

    // Option 1: Set as cookie
    document.cookie = `pb_auth=${token}; path=/`

    // Option 2: Store in memory for header usage
    localStorage.setItem('auth_token', token)

    window.location.href = '/dashboard'
  }
}
</script>
```
