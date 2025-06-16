---
title: Authentication Overview
description: Learn about the different authentication methods available in PocketPages
---

# Authentication Overview

PocketPages provides seamless integration with PocketBase's authentication system, supporting both header-based and cookie-based authentication methods. Each authentication method is designed for specific use cases and can be used individually or in combination.

## Authentication Flow

PocketPages automatically checks for authentication tokens in this order:

1. `Authorization` header (highest priority)
2. `pb_auth` cookie (fallback)

When a token is found, PocketPages automatically populates the `request.auth` context with a `core.Record` instance containing the authenticated user's information.

The complete authentication flow is:

1. User initiates authentication
2. Authentication method validates credentials
3. PocketBase generates JWT token
4. PocketPages sets `pb_auth` cookie
5. Subsequent requests include authentication

## Common Features

All authentication methods in PocketPages share these characteristics:

1. **Cookie-Based**: Authentication state is maintained via the `pb_auth` cookie
2. **Automatic Headers**: Auth tokens are automatically included in requests
3. **Context Access**: Authentication state is available via `request.auth`
4. **Type Safety**: All methods return strongly typed `AuthData`

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

## Client-Side Integration

When using the PocketBase JavaScript SDK alongside PocketPages, you'll need to synchronize the SDK's auth state with the cookie-based MPA approach:

```javascript
// Initialize PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090')

// Load auth state from cookies
pb.authStore.loadFromCookie(document.cookie)

// Optional: Keep auth state in sync when cookie changes
pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie()
})
```

This ensures the SDK's auth store stays in sync with the server-side authentication state managed by PocketPages.

## Signing Out

All authentication methods can use the common sign-out function:

```javascript
api.signOut()
```

This will:

- Clear the `pb_auth` cookie
- Remove the auth token
- Reset the authentication state

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

## Security Best Practices

1. Use HTTPS in production
2. Implement rate limiting
3. Enable email verification
4. Set appropriate token expiration
5. Monitor authentication events

## Auth Starter Kit

PocketPages provides a complete authentication starter kit that demonstrates all these authentication methods working together:

```bash
mkdir auth
cd auth
npx tiged benallfree/pocketpages/packages/starters/auth . && sed -i 's/"workspace://g' package.json
pocketbase --dir=pb_data --dev serve
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
