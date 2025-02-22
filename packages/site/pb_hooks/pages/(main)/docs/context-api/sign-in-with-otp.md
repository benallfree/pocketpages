---
title: signInWithOTP - One-Time Password Authentication
description: Authenticate users with one-time passwords in PocketPages templates.
---

# `signInWithOTP` - One-Time Password Authentication

- **Type**: `(otpId: string, password: string, options?: AuthOptions) => AuthData`
- **Description**: Authenticates a user with a one-time password, automatically setting the authentication cookie upon success.

## Parameters

- `otpId`: The OTP record ID
- `password`: The one-time password code
- `options`: (Optional) Authentication options
  ```typescript
  type AuthOptions = {
    collection: string // The collection to authenticate against (defaults to "users")
  }
  ```

## Basic Usage

```ejs
<%%
try {
  // First request an OTP code
  const { otpId } = requestOTP('user@example.com')

  // Later, verify the OTP code
  const authData = signInWithOTP(otpId, '123456')

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
  record: {
    // The authenticated user record
    id: string
    email: string
    username: string
    verified: boolean
    // ... other user fields
  }
}
```

## Complete OTP Flow Example

```ejs
<%%
let error = null
let otpId = request.body().otpId || null
const {
  mode,
  otpCode,
  identity
} = {
  mode: 'otp-request',
  ...request.body()
}

if (request.method === 'POST') {
  switch (mode) {
    case 'otp-request':
      try {
        // Request a new OTP code
        const res = requestOTP(identity)
        otpId = res.otpId
      } catch (e) {
        error = e.message
      }
      break

    case 'otp-confirm':
      try {
        // Verify the OTP code
        const res = signInWithOTP(otpId, otpCode)
        redirect('/', {
          message: 'Login successful'
        })
      } catch (e) {
        error = e.message
      }
      break
  }
}
%>

<%% if (error) { %>
<mark><%%= error %></mark>
<%% } %>

<h1>We have sent you an OTP code</h1>
<p>Please check your email for the OTP code and enter it below.</p>

<!-- OTP Verification Form -->
<form method="post">
  <input type="hidden" name="mode" value="otp-confirm" />
  <input type="hidden" name="otpId" value="<%%= otpId %>" />
  <input type="hidden" name="identity" value="<%%= identity %>" />
  <input type="text"
         name="otpCode"
         placeholder="OTP code"
         inputmode="numeric"
         pattern="[0-9]*"
         autocomplete="one-time-code" />
  <button type="submit">Login</button>
</form>

<!-- Request New OTP Form -->
<form method="post">
  <input type="hidden" name="mode" value="otp-request" />
  <input type="text"
         name="identity"
         placeholder="Email"
         value="<%%= identity %>" />
  Didn't receive an OTP code?
  <button type="submit">Resend OTP code</button>
</form>
```

## Important Notes

1. **Flow**: A typical OTP authentication flow has two steps:

   - Request OTP: Call `requestOTP(email)` to send the code
   - Verify OTP: Use `signInWithOTP(otpId, code)` to authenticate

2. **Cookie Management**: This function automatically:

   - Authenticates with PocketBase
   - Sets the authentication cookie
   - Makes the user record available via `request.auth`

3. **Error Handling**: Common errors to handle:

   - Invalid or expired OTP
   - Already used OTP
   - Rate limiting errors
   - Network/database errors

4. **Security Considerations**:
   - OTPs should have a short expiration time
   - Implement rate limiting for failed attempts
   - Consider adding CSRF protection
   - Clear OTP after successful use
   - Use secure input patterns for OTP entry

## Related Topics

- [`signInWithPassword`](/docs/context-api/sign-in-with-password)
- [`signOut`](/docs/context-api/sign-out)
- [`request.auth`](/docs/context-api/auth)
- [Authentication Guide](/docs/authentication)
- [OTP Speed Run](/docs/speedruns/otp)
