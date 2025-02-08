---
title: Authentication Overview
description: Learn about the different authentication methods available in PocketPages
---

# Authentication Overview

PocketPages provides several authentication methods to help you implement user authentication in your application. Each method is designed for specific use cases and can be used individually or in combination.

## Available Methods

### Password Authentication

Traditional email/password authentication:

```javascript
const authData = api.signInWithPassword(email, password)
```

Best for:

- Traditional web applications
- Users who prefer email/password login
- Applications requiring email verification

[Learn more about Password Authentication](/docs/authentication/password)

### OAuth2 Authentication

Social login with providers like Google, GitHub, etc:

```javascript
const authUrl = api.requestOAuth2Login('google')
```

Best for:

- Social login integration
- Reducing registration friction
- Accessing provider APIs

[Learn more about OAuth2 Authentication](/docs/authentication/oauth2)

### One-Time Password (OTP)

Passwordless email authentication:

```javascript
const otpData = api.requestOTP(email)
```

Best for:

- Passwordless authentication
- Temporary access
- Enhanced security requirements

[Learn more about OTP Authentication](/docs/authentication/otp)

### Anonymous Authentication

Guest access with persistent identity:

```javascript
const authData = api.signInAnonymously()
```

Best for:

- Try-before-you-register flows
- Guest checkout
- Temporary user sessions

[Learn more about Anonymous Authentication](/docs/authentication/anonymous)

### Token Authentication

Manual token management:

```javascript
api.signInWithToken(token)
```

Best for:

- Custom authentication flows
- External authentication systems
- API integrations

[Learn more about Token Authentication](/docs/authentication/token)

## Common Features

All authentication methods in PocketPages share these characteristics:

1. **Cookie-Based**: Authentication state is maintained via the `pb_auth` cookie
2. **Automatic Headers**: Auth tokens are automatically included in requests
3. **Context Access**: Authentication state is available via `api.auth`
4. **Type Safety**: All methods return strongly typed `AuthData`

## Authentication Flow

1. User initiates authentication
2. Authentication method validates credentials
3. PocketBase generates JWT token
4. PocketPages sets `pb_auth` cookie
5. Subsequent requests include authentication

## Checking Authentication Status

```ejs
<% if (auth) { %>
  <p>Welcome, <%= auth.email %></p>
  <% if (auth.verified()) { %>
    <p>✓ Verified account</p>
  <% } %>
<% } else { %>
  <p>Please log in</p>
<% } %>
```

## Signing Out

All authentication methods can use the common sign-out function:

```javascript
api.signOut()
```

## Security Best Practices

1. Use HTTPS in production
2. Implement rate limiting
3. Enable email verification
4. Set appropriate token expiration
5. Monitor authentication events

## Choosing an Auth Method

Consider these factors when choosing authentication methods:

1. **User Experience**
   - Password: Familiar but requires remembering credentials
   - OAuth2: Quick but requires third-party account
   - OTP: Simple but requires email access
   - Anonymous: Frictionless but limited
2. **Security Requirements**
   - Password: Strong with proper policies
   - OAuth2: Delegated to trusted providers
   - OTP: Time-limited, email-verified
   - Anonymous: Limited access scope
3. **Implementation Complexity**

   - Password: Moderate (email verification, password reset)
   - OAuth2: Higher (provider setup, callback handling)
   - OTP: Lower (email delivery only)
   - Anonymous: Lowest (single method call)

4. **Maintenance**
   - Password: Password resets, security policies
   - OAuth2: Provider API changes, token refresh
   - OTP: Email deliverability
   - Anonymous: Data cleanup policies

## Auth Starter Kit

PocketPages provides a complete authentication starter kit that demonstrates all these authentication methods working together:

```bash
npx tiged benallfree/pocketpages/starters/auth .
```

The starter kit includes:

- Complete authentication UI
- All authentication methods implemented
- Email verification flow
- Account management
- Password reset flow
- Middleware protection
- Layout with auth status

[Learn more about the Auth Starter Kit](/docs/starter-kits#auth)
