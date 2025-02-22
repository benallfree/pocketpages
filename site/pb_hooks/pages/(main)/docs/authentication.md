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

PocketPages manages authentication via the `pb_auth` cookie through several built-in methods:

```javascript
// The context API provides methods to manage authentication
api.signInWithPassword(email, password)
api.signInWithToken(token)
api.signInWithOTP(otpId, password)
api.signInAnonymously()
api.signOut()
```

Each of these methods (except `signOut`) will automatically set the `pb_auth` cookie upon successful authentication. The `signOut` method will clear the cookie.

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

Here's a complete example of a login form using PocketPages' authentication methods:

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
    window.location.href = '/dashboard'
  }
}
</script>
```

Note that you don't need to manually manage the `pb_auth` cookie - PocketPages will handle this automatically when using its authentication methods.

## Client-Side Usage

If you're using the PocketBase JavaScript SDK in your client-side code, you'll need to explicitly load the auth state from the cookie that PocketPages manages:

```javascript
// Initialize PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090')

// Load auth state from pb_auth cookie
pb.authStore.loadFromCookie('pb_auth')
```

This ensures the SDK's auth store stays in sync with the server-side authentication state managed by PocketPages.
