# signInWithOAuth2

Completes the OAuth2 authentication flow by exchanging the authorization code for an access token and user data.

## Usage

```javascript
const authData = signInWithOAuth2(state, code)
```

## Parameters

- `state` (string) - The state parameter returned from the OAuth2 provider
- `code` (string) - The authorization code returned from the OAuth2 provider
- `options` (object, optional) - Additional options
  - `collection` (string) - The collection to authenticate against (defaults to "users")
  - `cookieName` (string) - The name of the cookie storing the OAuth2 state (defaults to "pp_oauth_state")

## Returns

Returns an object containing:

- `token` - The authentication token
- `record` - The user record

## Example

```javascript
<script server>
  const { state, code } = params

  try {
    const authData = signInWithOAuth2(state, code)
    redirect('/')
  } catch (e) {
    // Handle error
  }
</script>
```

## Notes

- This function is typically called on your OAuth2 callback route after the provider redirects back to your application
- The function automatically validates the state parameter against the stored state to prevent CSRF attacks
- On successful authentication, the user is automatically signed in and the auth cookie is set
- Throws an error if the state validation fails or if the OAuth2 flow cannot be completed
