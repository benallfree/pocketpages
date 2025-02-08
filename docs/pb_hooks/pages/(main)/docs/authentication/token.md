---
title: Token Authentication
description: Learn how to implement token-based authentication in PocketPages
---

# Token Authentication

Token authentication allows you to manually set authentication state using JWT tokens. This is useful for implementing custom authentication flows or integrating with external authentication systems.

## Basic Usage

The context API provides a simple method for token authentication:

```javascript
api.signInWithToken(token)
```

## Implementation Example

Here's an example of implementing token authentication:

```ejs
<script server>
  let error = null

  if (request.method === 'POST') {
    try {
      const { token } = body()
      signInWithToken(token)
      redirect('/')
    } catch (e) {
      error = e.message
    }
  }
</script>

<% if (error) { %>
  <mark><%= error %></mark>
<% } %>

<form method="post">
  <input name="token" type="text" placeholder="Enter JWT token" />
  <button type="submit">Sign In</button>
</form>
```

## API Reference

### signInWithToken()

```typescript
signInWithToken(token: string): void
```

The `signInWithToken()` method:

1. Sets the `pb_auth` cookie with the provided token
2. Does not validate the token
3. Returns void

## Cookie Behavior

PocketPages stores the authentication token in a cookie named `pb_auth`. This cookie:

- Is automatically included in subsequent requests
- Is readable by both server and client-side code
- Can be cleared by setting an empty value
- Has no explicit expiration (session cookie)

## Common Use Cases

### API Integration

```ejs
<script server>
  // Obtain token from external API
  const response = await fetch('https://api.example.com/auth', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  const { token } = await response.json()

  // Set the token
  signInWithToken(token)
</script>
```

### Custom Authentication Flow

```ejs
<script server>
  // Your custom auth logic
  const user = await authenticateUser(credentials)
  const token = generateToken(user)

  // Set the token
  signInWithToken(token)
</script>
```

### Token Clearing

```ejs
<script server>
  // Clear the auth token
  signInWithToken('')

  // Or use signOut() which does the same thing
  signOut()
</script>
```

## Security Considerations

1. Always transmit tokens over HTTPS
2. Validate tokens on the server side
3. Use appropriate token expiration times
4. Consider implementing token refresh flows
5. Be cautious with token storage in client-side code

## Best Practices

1. Use short-lived tokens
2. Implement proper token validation
3. Handle token expiration gracefully
4. Consider implementing refresh tokens
5. Log authentication events for security monitoring
