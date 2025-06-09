---
title: OAuth2 Authentication
description: Learn how to implement OAuth2 authentication in PocketPages
---

# OAuth2 Authentication

OAuth2 authentication allows users to sign in using their accounts from providers like Google, GitHub, Facebook, etc.

> Check out the [OAuth2 Google Speedrun](/docs/speedruns/google-oauth2)

> **Note**: PocketPages provides an authentication starter kit that includes many pre-built integrations. You can get started quickly with:
>
> ```bash
> mkdir auth
> cd auth
> npx tiged benallfree/pocketpages/packages/starters/auth . && sed -i 's/"workspace://g' package.json
> ```

## Basic Usage

The context API provides two main methods for OAuth2 authentication:

```javascript
// Start OAuth2 flow
const authUrl = api.requestOAuth2Login('google')

// Complete OAuth2 flow
const authData = api.signInWithOAuth2(state, code)
```

## Implementation Example

Here's a complete OAuth2 implementation:

```ejs
<!-- Start OAuth2 flow -->
<<%='script server'%>>
  let error = null

  if (request.method === 'POST') {
    try {
      const url = requestOAuth2Login(body().provider, {
        redirectPath: '/auth/oauth/confirm',  // Default
        autoRedirect: true                    // Default
      })
    } catch (e) {
      error = e.message
    }
  }
</script>

<% if (error) { %>
  <mark><%= error %></mark>
<% } %>

<form method="POST">
  <input type="hidden" name="provider" value="google">
  <button type="submit">Log in with Google</button>
</form>
```

Then create a callback handler at your redirect path:

```ejs
<!-- /auth/oauth/confirm.ejs -->
<<%='script server'%>>
  const { state, code } = params
  let error = null

  try {
    const authData = signInWithOAuth2(state, code)
    redirect('/')
  } catch (e) {
    error = e.message
  }
</script>

<% if (error) { %>
  <mark><%= error %></mark>
<% } %>
```

## API Reference

### requestOAuth2Login()

```typescript
requestOAuth2Login(
  providerName: string,
  options?: {
    redirectPath?: string,    // defaults to '/auth/oauth/confirm'
    cookieName?: string,      // defaults to 'pp_oauth_state'
    autoRedirect?: boolean,   // defaults to true
    collection?: string       // defaults to 'users'
  }
): string
```

The `requestOAuth2Login()` method:

1. Retrieves OAuth2 provider configuration from PocketBase
2. Generates the authorization URL
3. Stores provider info in a cookie
4. Optionally redirects to the provider's login page
5. Returns the authorization URL

### signInWithOAuth2()

```typescript
signInWithOAuth2(
  state: string,
  code: string,
  options?: {
    cookieName?: string,    // defaults to 'pp_oauth_state'
    collection?: string     // defaults to 'users'
  },
  storedProviderInfo?: OAuth2ProviderInfo
): AuthData
```

The `signInWithOAuth2()` method:

1. Validates the OAuth state parameter
2. Exchanges the code for an access token
3. Creates or updates the user record
4. Sets the `pb_auth` cookie
5. Returns the auth data containing the token and user record

## Implementation Details

### Cookie Storage

The OAuth2 flow stores provider information in a cookie (default name: `pp_oauth_state`) containing:

```javascript
{
  name: "google",          // Provider name
  state: "...",           // OAuth state parameter
  codeChallenge: "...",   // PKCE code challenge
  codeVerifier: "...",    // PKCE code verifier
  redirectUrl: "..."      // Full callback URL
}
```

This information is required to complete the OAuth2 flow securely and is automatically managed by PocketPages.

### Same-Tab Redirect

PocketPages intentionally uses same-tab redirects instead of popups for the OAuth2 flow. While popups are common in OAuth implementations, they can be:

- Blocked by ad blockers
- Blocked by popup blockers
- Problematic on mobile devices
- Confusing to users

The same-tab approach is more reliable and provides a better user experience across all devices and browsers.

## Configuration

Configure OAuth2 providers in the PocketBase Admin UI:

1. Go to Settings > Auth Providers
2. Enable desired OAuth2 providers
3. Configure provider credentials:
   - Client ID
   - Client Secret
   - Authorized redirect URI

Example provider configuration in migrations:

```javascript
migrate((app) => {
  const users = app.findCollectionByNameOrId('users')
  users.oauth2.enabled = true
  users.oauth2.providers = [
    {
      name: 'google',
      provider: 'google',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    },
  ]
  app.save(users)
})
```

## Error Handling

Common OAuth2 errors to handle:

- Missing or invalid state parameter
- Invalid authorization code
- User cancelled authentication
- Provider configuration errors
- Network connectivity issues

Always wrap OAuth2 operations in try/catch blocks and provide clear error messages to users.

## Security Considerations

1. Keep client secrets secure
2. Validate state parameters
3. Use HTTPS for all OAuth2 traffic
4. Set appropriate token expiration times
5. Review provider permissions carefully

## Best Practices

1. Provide clear login buttons for each provider
2. Handle authentication cancellation gracefully
3. Consider implementing account linking
4. Provide fallback authentication methods
5. Test with all configured providers
