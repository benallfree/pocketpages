---
title: registerWithPassword - User Registration and Authentication
description: Create and authenticate new users in PocketPages templates with automatic login.
---

# `registerWithPassword` - User Registration and Authentication

- **Type**: `(email: string, password: string) => AuthData`
- **Description**: Creates a new user account and automatically signs them in by setting an authentication cookie.

## Basic Usage

```ejs
<%%
try {
  const authData = registerWithPassword('user@example.com', 'securepass123')
  // User is now created and logged in
  redirect('/welcome')
} catch (error) {
  // Handle registration error
}
%>
```

## Return Value

Returns an `AuthData` object containing:

```typescript
interface AuthData {
  token: string // The authentication token
  user: Record // The newly created user record
}
```

## Complete Registration Form Example

```ejs
<%%
if (request.method === 'POST') {
  const { email, password, confirmPassword } = formData

  try {
    // Basic validation
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Create user and sign in
    const authData = registerWithPassword(email, password)

    // User is now registered and logged in
    redirect('/welcome')

  } catch (error) {
    // Registration failed
    %>
    <div class="error">
      Registration failed: <%%= error.message %>
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

  <div class="form-group">
    <label for="confirmPassword">Confirm Password:</label>
    <input type="password"
           id="confirmPassword"
           name="confirmPassword"
           required>
  </div>

  <button type="submit">Register</button>
</form>
```

## Important Notes

1. **Automatic Authentication**: This function both creates the user and signs them in by:

   - Creating a new user record in the database
   - Generating an authentication token
   - Setting the authentication cookie

2. **Error Handling**: Common errors to handle:

   - Email already exists
   - Invalid email format
   - Password too weak
   - Network/database errors

3. **Security Considerations**:
   - Always use HTTPS in production
   - Implement password strength requirements
   - Consider adding CSRF protection
   - Rate limit registration attempts

## Related Topics

- [`signInWithPassword`](/docs/context-api/sign-in-with-password)
- [`signOut`](/docs/context-api/sign-out)
- [`request.auth`](/docs/context-api/auth)
- [Authentication Guide](/docs/authentication)
