---
title: signInWithPassword - Password Authentication
description: Authenticate users with email and password in PocketPages templates.
---

# `signInWithPassword` - Password Authentication

- **Type**: `(email: string, password: string) => AuthData`
- **Description**: Authenticates a user with their email and password, automatically setting the authentication cookie upon success.

## Basic Usage

```ejs
<%%
try {
  const authData = signInWithPassword('user@example.com', 'password123')
  // User is now logged in
  redirect('/dashboard')
} catch (error) {
  // Handle authentication error
}
%>
```

## Return Value

Returns an `AuthData` object containing:

```typescript
interface AuthData {
  token: string // The authentication token
  user: Record // The authenticated user record
}
```

## Complete Login Form Example

```ejs
<%%
if (request.method === 'POST') {
  try {
    const { email, password } = formData

    // Validate required fields
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Attempt login
    const authData = signInWithPassword(email, password)

    // Successful login - redirect to dashboard
    redirect('/dashboard')

  } catch (error) {
    // Login failed
    %>
    <div class="error">
      Login failed: <%%= error.message %>
    </div>
    <%%
  }
}
%>

<form method="POST">
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email"
           id="email"
           name="email"
           value="<%%= formData.email || '' %>"
           required>
  </div>

  <div class="form-group">
    <label for="password">Password:</label>
    <input type="password"
           id="password"
           name="password"
           required>
  </div>

  <button type="submit">Sign In</button>

  <div class="links">
    <a href="/auth/forgot-password">Forgot Password?</a>
    <a href="/auth/register">Create Account</a>
  </div>
</form>
```

## Important Notes

1. **Cookie Management**: This function automatically:

   - Authenticates with PocketBase
   - Sets the authentication cookie
   - Makes the user record available via `request.auth`

2. **Error Handling**: Common errors to handle:

   - Invalid credentials
   - Unverified email
   - Account disabled
   - Network/database errors

3. **Security Considerations**:
   - Always use HTTPS in production
   - Implement rate limiting for failed attempts
   - Consider adding CSRF protection
   - Use secure password policies

## Related Topics

- [`registerWithPassword`](/docs/context-api/register-with-password)
- [`signOut`](/docs/context-api/sign-out)
- [`request.auth`](/docs/context-api/auth)
- [Authentication Guide](/docs/authentication)
