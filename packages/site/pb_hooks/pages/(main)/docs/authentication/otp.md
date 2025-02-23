---
title: One-Time Password Authentication
description: Learn how to implement OTP-based authentication in PocketPages
---

# One-Time Password Authentication

One-Time Password (OTP) authentication provides a passwordless login flow where users receive a temporary code via email.

## Basic Usage

The context API provides two main methods for OTP authentication:

```javascript
// Request an OTP code
const otpData = api.requestOTP(email)

// Sign in with the OTP code
const authData = api.signInWithOTP(otpData.otpId, code)
```

## Implementation Example

Here's a complete OTP login implementation:

```ejs
<<%%='script server'%>>
  let error = null
  let otpId = request.body().otpId || null
  const { mode, otpCode, identity } = {
    mode: 'otp-request',
    ...request.body()
  }

  if (request.method === 'POST') {
    switch (mode) {
      case 'otp-request':
        try {
          const res = requestOTP(identity)
          otpId = res.otpId
        } catch (e) {
          error = e.message
        }
        break

      case 'otp-confirm':
        try {
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
</script>

<%% if (error) { %>
  <mark><%%= error %></mark>
<%% } %>

<%% if (!otpId) { %>
  <!-- Step 1: Request OTP -->
  <h3>Request OTP Code</h3>
  <form method="post">
    <input type="hidden" name="mode" value="otp-request" />
    <label>Email</label>
    <input name="identity" required type="email" />
    <button type="submit">Send OTP Code</button>
  </form>
<%% } else { %>
  <!-- Step 2: Verify OTP -->
  <h3>Enter OTP Code</h3>
  <p>Please check your email for the OTP code and enter it below.</p>
  <form method="post">
    <input type="hidden" name="mode" value="otp-confirm" />
    <input type="hidden" name="otpId" value="<%%= otpId %>" />
    <input type="hidden" name="identity" value="<%%= identity %>" />
    <input type="text" name="otpCode" placeholder="Enter OTP code" required />
    <button type="submit">Verify & Login</button>
  </form>

  <!-- Allow requesting a new code -->
  <form method="post">
    <input type="hidden" name="mode" value="otp-request" />
    <input type="hidden" name="identity" value="<%%= identity %>" />
    <button type="submit">Resend OTP code</button>
  </form>
<%% } %>
```

## API Reference

### requestOTP()

```typescript
requestOTP(
  email: string,
  options?: {
    collection?: string  // defaults to "users"
  }
): OTPResponse
```

The `requestOTP()` method:

1. Creates a temporary user if one doesn't exist
2. Generates and sends an OTP code via email
3. Returns an OTP response containing the OTP ID

### signInWithOTP()

```typescript
signInWithOTP(
  otpId: string,
  code: string,
  options?: {
    collection?: string  // defaults to "users"
  }
): AuthData
```

The `signInWithOTP()` method:

1. Validates the OTP code
2. Authenticates the user
3. Sets the `pb_auth` cookie
4. Returns the auth data containing the token and user record

## Configuration

Enable OTP authentication in the PocketBase Admin UI:

1. Go to Settings > Auth Options
2. Enable "Allow authentication with password"
3. Configure your SMTP settings in Settings > Mail Settings

## Error Handling

Common OTP errors to handle:

- Invalid email address
- Invalid or expired OTP code
- Rate limiting errors
- SMTP configuration errors

Always wrap OTP operations in try/catch blocks and provide clear error messages to users.

## Security Considerations

1. Implement rate limiting for OTP requests
2. Set appropriate OTP expiration times
3. Use secure email delivery
4. Consider implementing account lockout after failed attempts
5. Log and monitor OTP usage patterns
