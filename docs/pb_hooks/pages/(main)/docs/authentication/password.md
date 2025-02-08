---
title: Password Authentication
description: Learn how to implement password-based authentication in PocketPages
---

# Password Authentication

Password authentication in PocketPages provides a straightforward way to authenticate users using email/username and password combinations.

## Basic Usage

The context API provides two main methods for password authentication:

```javascript
// Sign in an existing user
const authData = context.signInWithPassword(email, password)

// Register and sign in a new user
const authData = context.registerWithPassword(email, password)
```

Both methods return an `AuthData` object containing the authentication token and user record:

```javascript
{
  token: "JWT_TOKEN_HERE",
  record: {
    id: "RECORD_ID",
    email: "user@example.com",
    verified: false,
    // ... other user fields
  }
}
```

## Implementation Example

Here's a complete login form implementation:

```ejs
<script server>
  let error = null

  if (request.method === 'POST') {
    const { identity, password } = body()

    try {
      const authData = signInWithPassword(identity, password)
      redirect('/')
    } catch (e) {
      error = e.message
    }
  }
</script>

<form method="post">
  <label>Email</label>
  <input name="identity" value="<%= data.identity %>" />

  <label>Password</label>
  <input name="password" type="password" />

  <button type="submit">Login</button>
</form>

<% if (error) { %>
  <mark><%= error %></mark>
<% } %>
```

## Registration Example

Here's how to implement user registration:

```ejs
<script server>
  let error = null

  if (request.method === 'POST') {
    const { identity, password } = body()

    try {
      const authData = registerWithPassword(identity, password)
      redirect('/')
    } catch (e) {
      error = `Error registering user: ${e.message}`
    }
  }
</script>

<form method="post">
  <label>Email</label>
  <input name="identity" />

  <label>Password</label>
  <input name="password" type="password" />

  <button type="submit">Register</button>
</form>

<% if (error) { %>
  <mark><%= error %></mark>
<% } %>
```

## Email Verification

PocketPages integrates with PocketBase's email verification system. When enabled, users must verify their email address before gaining full access to your application.

### Verification Flow

1. User registers with email/password
2. System sends verification email
3. User clicks verification link
4. System verifies the account

### Handling Verification

Create a verification handler at `/auth/confirm/[token]/verification.ejs`:

```ejs
<script server>
  const { token } = params
  let error = null

  try {
    confirmVerification(token)
    redirect('/', {
      message: 'Your account has been verified.'
    })
  } catch (e) {
    error = e.message
  }
</script>

<% if (error) { %>
  <mark><%= error %></mark>
<% } %>
```

### Resending Verification Emails

Allow users to request a new verification email:

```ejs
<script server>
  let error = null

  if (request.method === 'POST') {
    try {
      requestVerification(auth.email)
      redirect('/auth/verify', {
        message: 'Verification email sent.'
      })
    } catch (e) {
      error = e.message
    }
  }
</script>

<% if (!auth?.verified()) { %>
  <form method="post">
    <p>Your email is not verified.</p>
    <button type="submit">Resend Verification Email</button>
  </form>
<% } %>
```

### Checking Verification Status

Use the `verified()` method on the auth record to check verification status:

```ejs
<% if (auth) { %>
  <% if (auth.verified()) { %>
    <p>✓ Email verified</p>
  <% } else { %>
    <p>⚠️ Please verify your email</p>
    <a href="/auth/verify">Resend verification email</a>
  <% } %>
<% } %>
```

### API Reference

#### requestVerification()

```typescript
requestVerification(
  email: string,
  options?: {
    collection?: string  // defaults to "users"
  }
): void
```

Sends a verification email to the specified address.

#### confirmVerification()

```typescript
confirmVerification(
  token: string,
  options?: {
    collection?: string  // defaults to "users"
  }
): void
```

Verifies an account using the provided token.

### Configuration

Configure verification email templates in the PocketBase Admin UI:

1. Go to Settings > Mail Settings to configure your SMTP server
2. Go to Collections > Users > Options > Mail Templates
3. Update the verification template URL to match your route:
   ```
   {APP_URL}/auth/confirm/{TOKEN}/verification
   ```

### Best Practices

1. Always show verification status to users
2. Provide clear instructions in verification emails
3. Make it easy to request new verification emails
4. Consider implementing verification timeouts
5. Add rate limiting to verification requests

## API Reference

### signInWithPassword()

```typescript
signInWithPassword(
  email: string,
  password: string,
  options?: {
    collection?: string  // defaults to "users"
  }
): AuthData
```

The `signInWithPassword()` method authenticates a user with their email and password. Upon successful authentication, it automatically:

1. Obtains an authentication token from PocketBase
2. Sets the `pb_auth` cookie with the token
3. Returns the auth data containing the token and user record

### registerWithPassword()

```typescript
registerWithPassword(
  email: string,
  password: string,
  options?: {
    collection?: string,         // defaults to "users"
    sendVerificationEmail?: boolean  // defaults to true
  }
): AuthData
```

The `registerWithPassword()` method:

1. Creates a new user record
2. Sends a verification email (if enabled)
3. Signs in the user automatically
4. Sets the `pb_auth` cookie
5. Returns the auth data

## Error Handling

Common authentication errors to handle:

- Invalid credentials
- Missing email/password
- Account not found
- Account not verified
- Password too short/simple

Always wrap authentication operations in try/catch blocks and display appropriate error messages to users.

## Security Considerations

1. Always use HTTPS in production
2. Implement rate limiting for login attempts
3. Enforce strong password requirements
4. Consider implementing email verification
5. Set appropriate session/token expiration times
