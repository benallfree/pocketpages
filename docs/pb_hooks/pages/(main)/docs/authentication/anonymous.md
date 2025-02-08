---
title: Anonymous Authentication
description: Learn how to implement anonymous authentication in PocketPages
---

# Anonymous Authentication

Anonymous authentication allows users to access your application without providing credentials, while still maintaining a unique identity for each user.

## Basic Usage

The context API provides a single method for anonymous authentication:

```javascript
const authData = context.signInAnonymously()
```

This returns an `AuthData` object containing the authentication token and user record:

```javascript
{
  token: "JWT_TOKEN_HERE",
  record: {
    id: "RECORD_ID",
    email: "anonymous-123456789@example.com",
    verified: false,
    // ... other user fields
  }
}
```

## Implementation Example

Here's a complete anonymous login implementation:

```ejs
<script server>
  let error = null

  if (request.method === 'POST' && body().mode === 'anonymous') {
    try {
      const authData = signInAnonymously()
      redirect('/')
    } catch (e) {
      error = e.message
    }
  }
</script>

<h3>Anonymous Login</h3>

<% if (error) { %>
  <mark><%= error %></mark>
<% } %>

<form method="post">
  <input type="hidden" name="mode" value="anonymous" />
  <button type="submit">Continue as Guest</button>
</form>
```

## API Reference

### signInAnonymously()

```typescript
signInAnonymously(
  options?: {
    collection?: string  // defaults to "users"
  }
): AuthData
```

The `signInAnonymously()` method:

1. Creates a new user record with:
   - Random email (format: `anonymous-{random}@example.com`)
   - Random password
   - Unverified status
2. Signs in the user automatically
3. Sets the `pb_auth` cookie
4. Returns the auth data containing the token and user record

## Configuration

Anonymous authentication requires password authentication to be enabled in PocketBase:

1. Go to Settings > Auth Options
2. Enable "Allow authentication with password"

## Error Handling

Common errors to handle:

- Email generation conflicts
- Collection permission issues
- Rate limiting errors

Always wrap authentication operations in try/catch blocks and provide clear error messages to users.

## Security Considerations

1. Consider implementing rate limiting
2. Set appropriate token expiration times
3. Be cautious with anonymous user permissions
4. Monitor anonymous user activity
5. Consider implementing conversion flows to regular accounts

## Best Practices

1. Clearly indicate anonymous status to users
2. Provide easy paths to convert to full accounts
3. Consider data retention policies for anonymous accounts
4. Handle token expiration gracefully
5. Implement appropriate access controls
