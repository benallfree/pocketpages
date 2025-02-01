---
title: signInWithToken - Token Authentication
description: Set authentication state using a token in PocketPages templates.
---

# `signInWithToken` - Token Authentication

- **Type**: `(token: string) => void`
- **Description**: Core authentication function that sets the `pb_auth` cookie. All other authentication methods (`signInWithPassword`, `registerWithPassword`, `signInAnonymously`) internally use this function to set the cookie.

## Basic Usage

```ejs
<%%
// Set authentication using a token
signInWithToken('your-auth-token-here')
redirect('/dashboard')
%>
```

## Cookie Management

This is the only function that directly sets the `pb_auth` cookie. Other authentication methods work like this:

```typescript
// How signInWithPassword works internally
function signInWithPassword(email: string, password: string) {
  // 1. Authenticate with PocketBase
  const authData = pb.collection('users').authWithPassword(...)

  // 2. Use signInWithToken to set the cookie
  signInWithToken(authData.token)

  return authData
}
```

## Common Use Cases

### OAuth Flow Completion

```ejs
<%%
// After receiving token from OAuth provider
const token = params.token
if (token) {
  signInWithToken(token)
  redirect('/dashboard')
} else {
  redirect('/login?error=missing_token')
}
%>
```

### Custom Authentication Flow

```ejs
<%%
if (request.method === 'POST') {
  try {
    // Custom authentication logic
    const response = await customAuthProvider.authenticate(formData)

    if (response.token) {
      signInWithToken(response.token)
      redirect('/dashboard')
    }

  } catch (error) {
    %>
    <div class="error">
      Authentication failed: <%%= error.message %>
    </div>
    <%%
  }
}
%>
```

## Important Notes

1. **Cookie Management**: This function:

   - Is the core cookie-setting function used by all auth methods
   - Sets the `pb_auth` cookie with the provided token
   - Does not validate the token
   - Does not fetch the user record

2. **Security Considerations**:

   - Always validate tokens before using them
   - Use HTTPS in production
   - Consider token expiration
   - Protect against CSRF attacks

3. **Usage Context**: Typically used:
   - After third-party authentication
   - In custom authentication flows
   - When implementing token refresh logic
   - Internally by other auth methods

## Related Topics

- [`signInWithPassword`](/docs/context-api/sign-in-with-password)
- [`signOut`](/docs/context-api/sign-out)
- [`request.auth`](/docs/context-api/auth)
- [Authentication Guide](/docs/authentication)
