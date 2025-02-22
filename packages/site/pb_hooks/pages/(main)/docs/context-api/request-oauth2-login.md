# requestOAuth2Login

Initiates the OAuth2 authentication flow by redirecting to the provider's authorization endpoint.

## Usage

```javascript
const authUrl = requestOAuth2Login(providerName)
```

## Parameters

- `providerName` (string) - The name of the OAuth2 provider (e.g. "google", "github")
- `options` (object, optional)
  - `collection` (string) - The collection to authenticate against (defaults to "users")
  - `redirectPath` (string) - The path to redirect to after authentication (defaults to "/auth/oauth/confirm")
  - `cookieName` (string) - The name of the cookie to store OAuth2 state (defaults to "pp_oauth_state")
  - `autoRedirect` (boolean) - Whether to automatically redirect to the provider (defaults to true)

## Returns

Returns the authorization URL if `autoRedirect` is false. Otherwise redirects to the provider's authorization endpoint.

## Example

```javascript
<script server>
  if (request.method === 'POST') {
    try {
      const url = requestOAuth2Login(body().provider)
      // With default options, this will automatically redirect
    } catch (error) {
      // Handle error
    }
  }
</script>

<form method="POST">
  <input type="hidden" name="provider" value="google">
  <button type="submit">Log in with Google</button>
</form>
```

## Notes

- The function automatically generates and stores a state parameter to prevent CSRF attacks
- The state and other OAuth2 parameters are stored in a cookie for validation during callback
- The default redirect URL is constructed using your app's base URL + the redirectPath option
- Make sure the redirect URL matches what is configured in your OAuth2 provider settings
