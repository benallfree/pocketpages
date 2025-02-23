---
title: Authentication Plugin
description: Handle user authentication with PocketBase, including password, OTP, OAuth2, and MFA support.
---

# Authentication Plugin

The Authentication plugin (`pocketpages-plugin-auth`) provides a complete authentication system for PocketPages applications, supporting multiple authentication methods including password, OTP, OAuth2, and MFA.

## Requirements

This plugin requires:

- `pocketpages-plugin-js-sdk` - For PocketBase client functionality

## Installation

```bash
npm install pocketpages-plugin-auth pocketpages-plugin-js-sdk
```

## Configuration

Add the plugin to your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    'pocketpages-plugin-js-sdk', // Required dependency
    'pocketpages-plugin-auth',
    // ... other plugins
  ],
}
```

## Types

The plugin provides TypeScript types for better development experience:

```typescript
type User = {
  avatar: string
  collectionId: string
  collectionName: string
  created: string
  emailVisibility: boolean
  email: string
  id: string
  name: string
  updated: string
  username: string
  verified: boolean
}

type AuthData = {
  token: string
  record: User
}

// Available in request context
type Auth = User & {
  verified: () => boolean
  get: (field: string) => any
}
```

In your routes, you can access the authenticated user through `request.auth`:

```javascript
if (request.auth) {
  const userId = request.auth.id
  const isVerified = request.auth.verified()
  const email = request.auth.get('email')
}
```

## API Reference

### Global Functions

These functions are available globally and can be called from anywhere:

```typescript
// User Management
function createUser(
  email: string,
  password: string,
  options?: CreateUserOptions
): User
function createAnonymousUser(options?: AuthOptions): {
  email: string
  user: User
}
function createPaswordlessUser(
  email: string,
  options?: CreateUserOptions
): { password: string; user: User }

// Verification
function requestVerification(email: string, options?: AuthOptions): void
function confirmVerification(token: string, options?: AuthOptions): void

// OTP
function requestOTP(email: string, options?: AuthOptions): { otpId: string }
```

### Request Context Functions

These functions are available in route handlers through the request context:

```typescript
// Password Authentication
function registerWithPassword(email: string, password: string): AuthData
function signInWithPassword(identity: string, password: string): AuthData
function signInAnonymously(): AuthData

// OTP Authentication
function signInWithOTP(otpId: string, code: string): AuthData

// OAuth2 Authentication
function requestOAuth2Login(
  provider: string,
  options?: OAuth2RequestOptions
): string
function signInWithOAuth2(state: string, code: string): AuthData

// Token Management
function signOut(): void
function signInWithToken(token: string): void
```

## Global Functions

The plugin adds several authentication-related functions to the global context:

```typescript
// Password Authentication
function signInWithPassword(identity: string, password: string): Record
function registerWithPassword(identity: string, password: string): Record
function signOut(): void

// OTP (One-Time Password)
function requestOTP(identity: string): { otpId: string }
function signInWithOTP(otpId: string, code: string): Record

// OAuth2
function requestOAuth2Login(provider: string): string
function signInWithOAuth2(state: string, code: string): Record

// Auth State
function isAuthenticated(): boolean
function currentUser(): Record | null
```

## Basic Usage

### Password Authentication

```ejs
<%%
  if (request.method === 'POST') {
    const { identity, password } = body()

    try {
      // Attempt login
      const user = signInWithPassword(identity, password)
      redirect('/')
    } catch (e) {
      error = e.message
    }
  }
%>

<form method="post">
  <input name="identity" type="email" required />
  <input name="password" type="password" required />
  <button type="submit">Login</button>
</form>
```

### OTP (One-Time Password)

```ejs
<%%
  if (request.method === 'POST') {
    switch (body().mode) {
      case 'otp-request':
        // Request OTP code
        const { otpId } = requestOTP(body().identity)
        // Store otpId for verification
        break

      case 'otp-confirm':
        // Verify OTP code
        const user = signInWithOTP(body().otpId, body().code)
        redirect('/')
        break
    }
  }
%>

<!-- Request OTP -->
<form method="post">
  <input type="hidden" name="mode" value="otp-request" />
  <input name="identity" type="email" required />
  <button type="submit">Send Code</button>
</form>

<!-- Verify OTP -->
<form method="post">
  <input type="hidden" name="mode" value="otp-confirm" />
  <input type="hidden" name="otpId" value="<%%= otpId %>" />
  <input name="code" required />
  <button type="submit">Verify</button>
</form>
```

### OAuth2 Authentication

```ejs
<%%
  // Get available auth methods
  const methods = pb().collection('users').listAuthMethods()

  // Get OAuth2 providers
  const providers = methods.oauth2
%>

<!-- OAuth2 Provider Buttons -->
<%% providers.forEach(provider => { %>
  <form method="post" action="/auth/oauth/login">
    <input type="hidden" name="provider" value="<%%= provider.name %>" />
    <button type="submit">
      Login with <%%= provider.name %>
    </button>
  </form>
<%% }) %>

<!-- OAuth2 Callback Handler -->
<%%
  // In your callback route:
  const { state, code } = params
  try {
    const user = signInWithOAuth2(state, code)
    redirect('/')
  } catch (e) {
    error = e.message
  }
%>
```

## Protected Routes

Use `isAuthenticated()` to protect routes that require authentication:

```ejs
<%%
  if (!isAuthenticated()) {
    redirect('/login', {
      message: 'Please login first',
      returnTo: request.url
    })
  }

  // Get the current user
  const user = currentUser()
%>

<h1>Welcome <%%= user.username %></h1>
```

## Auth State Management

The plugin automatically:

1. Handles auth token storage and renewal
2. Syncs auth state across tabs/windows
3. Manages OAuth2 state validation
4. Provides access to the current user

## Best Practices

1. **Security**:

   - Always validate user input
   - Use HTTPS in production
   - Implement rate limiting
   - Set appropriate token expiration

2. **UX**:

   - Provide clear error messages
   - Show loading states during auth
   - Redirect to intended page after login
   - Remember user preferences

3. **Implementation**:
   - Use environment variables for secrets
   - Implement proper error handling
   - Log authentication events
   - Consider implementing MFA

## Complete Example

See the [Auth starter kit](https://github.com/benallfree/pocketpages/tree/main/packages/starters/auth) for a complete authentication implementation including:

- Password login/register
- OTP authentication
- OAuth2 providers
- Protected routes
- Error handling
- MFA support
