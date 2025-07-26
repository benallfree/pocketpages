# PocketPages Authentication Plugin

The Authentication plugin (`pocketpages-plugin-auth`) provides a complete authentication system for PocketPages applications, supporting multiple authentication methods including password, OTP, OAuth2, and anonymous authentication.

## Installation

```bash
npm install pocketpages-plugin-auth
```

## Configuration

Add the plugin to your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    'pocketpages-plugin-js-sdk', // Required dependency, must be explicitly listed
    'pocketpages-plugin-auth',
    // ... other plugins
  ],
}
```

## Authentication Flow

The plugin automatically:

1. Checks for an existing auth record in the request
2. If none exists, checks for a `pb_auth` cookie containing an auth token
3. If a valid token is found, sets `request.auth` to the corresponding auth record

This means authentication state is automatically handled for you across requests.

## API Reference

### User Management

```typescript
// Create a new user with password
function createUser(
  email: string,
  password: string,
  options?: {
    collection?: string
    sendVerificationEmail?: boolean
  }
): User

// Create an anonymous user
function createAnonymousUser(options?: { collection?: string }): {
  email: string
  password: string
  user: User
}

// Create a passwordless user
function createPasswordlessUser(
  email: string,
  options?: {
    collection?: string
    sendVerificationEmail?: boolean
  }
): {
  password: string
  user: User
}
```

### Authentication

```typescript
// Password authentication
function signInWithPassword(
  email: string,
  password: string,
  options?: { collection?: string }
): AuthData

// Register and sign in
function registerWithPassword(
  email: string,
  password: string,
  options?: {
    collection?: string
    sendVerificationEmail?: boolean
  }
): AuthData

// Anonymous authentication
function signInAnonymously(options?: { collection?: string }): AuthData

// OTP authentication
function requestOTP(
  email: string,
  options?: { collection?: string }
): { otpId: string }

function signInWithOTP(
  otpId: string,
  password: string,
  options?: { collection?: string }
): AuthData

// OAuth2 authentication
function requestOAuth2Login(
  providerName: string,
  options?: {
    collection?: string
    cookieName?: string
    redirectPath?: string
    autoRedirect?: boolean
  }
): string

function signInWithOAuth2(
  state: string,
  code: string,
  options?: {
    collection?: string
    cookieName?: string
  }
): AuthData

// Sign out
function signOut(): void
```

### Email Verification

```typescript
function requestVerification(
  email: string,
  options?: { collection?: string }
): void

function confirmVerification(
  token: string,
  options?: { collection?: string }
): void
```

## Basic Usage Examples

### Password Authentication

```ejs
<%%
  if (request.method === 'POST') {
    const { email, password } = body()

    try {
      const authData = signInWithPassword(email, password)
      redirect('/')
    } catch (e) {
      error = e.message
    }
  }
%>

<form method="post">
  <input name="email" type="email" required />
  <input name="password" type="password" required />
  <button type="submit">Login</button>
</form>
```

### Anonymous Authentication

```ejs
<%%
  if (request.method === 'POST') {
    try {
      const authData = signInAnonymously()
      redirect('/')
    } catch (e) {
      error = e.message
    }
  }
%>

<form method="post">
  <button type="submit">Continue as Guest</button>
</form>
```

### OAuth2 Authentication

```ejs
<%%
  // Initiate OAuth2 login
  if (request.method === 'POST') {
    const provider = body().provider
    const authUrl = requestOAuth2Login(provider, {
      redirectPath: '/auth/oauth2/callback'
    })
  }
%>

<form method="post">
  <input type="hidden" name="provider" value="google" />
  <button type="submit">Login with Google</button>
</form>

<!-- In your callback route: -->
<%%
  const { state, code } = params
  try {
    const authData = signInWithOAuth2(state, code)
    redirect('/')
  } catch (e) {
    error = e.message
  }
%>
```

### Protected Routes

Check for authenticated users using `request.auth`:

```ejs
<%%
  if (!request.auth) {
    redirect('/login', {
      message: 'Please login first',
      returnTo: request.url
    })
  }

  // Access auth record properties
  const userId = request.auth.id
  const email = request.auth.email
%>

<h1>Welcome <%%= request.auth.username %></h1>
```

## Best Practices

1. **Security**:

   - Use HTTPS in production
   - Implement rate limiting
   - Set appropriate cookie security options
   - Validate OAuth2 state parameters

2. **UX**:

   - Provide clear error messages
   - Show loading states during authentication
   - Redirect to intended page after login
   - Consider offering multiple auth methods

3. **Implementation**:
   - Use environment variables for OAuth2 credentials
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
