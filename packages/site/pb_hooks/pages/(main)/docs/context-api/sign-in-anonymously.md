---
title: signInAnonymously - Anonymous Authentication
description: Create and authenticate anonymous users in PocketPages templates.
---

# `signInAnonymously` - Anonymous Authentication

- **Type**: `(options?: AuthOptions) => AuthData`
- **Description**: Creates a new anonymous user account and automatically signs them in. This is useful for allowing users to try your application before creating a full account.

## Parameters

- `options`: (Optional) Authentication options
  ```typescript
  type AuthOptions = {
    collection: string // The collection to authenticate against (defaults to "users")
  }
  ```

## Basic Usage

```ejs
<%%
try {
  // Default usage - creates anonymous user in "users" collection
  const authData = signInAnonymously()

  // Or specify a custom collection
  const authData = signInAnonymously({
    collection: 'customers'
  })

  // User is now anonymously authenticated
  redirect('/welcome')
} catch (error) {
  // Handle creation/authentication error
}
%>
```

## Return Value

Returns an `AuthData` object containing:

```typescript
interface AuthData {
  token: string // The authentication token
  record: {
    // The authenticated user record
    id: string
    email: string
    username: string
    verified: boolean
    // ... other user fields
  }
}
```

## Implementation Details

This function:

1. Creates a new user with a random email and password in the specified collection
2. Signs in with those credentials
3. Sets the authentication cookie via `signInWithToken`

## Example Implementation

### Guest Checkout Flow

```ejs
<%%
if (request.method === 'POST' && formData.action === 'guest-checkout') {
  try {
    const authData = signInAnonymously({
      collection: 'customers'
    })

    // Store cart data with anonymous user
    const cart = resolve('cart')
    cart.associateWithUser(authData.record.id)

    redirect('/checkout')
  } catch (error) {
    %>
    <div class="error">
      Failed to create guest account: <%%= error.message %>
    </div>
    <%%
  }
}
%>

<div class="checkout-options">
  <form method="POST">
    <input type="hidden" name="action" value="guest-checkout">
    <button type="submit">Continue as Guest</button>
  </form>

  <div class="separator">or</div>

  <a href="/login" class="button">Sign In</a>
</div>
```

### Try Before You Buy

```ejs
<%%
if (!request.auth) {
  // Auto-create anonymous account for new visitors
  try {
    signInAnonymously()
    redirect(request.url) // Reload current page
  } catch (error) {
    // Handle error
  }
}
%>
```

## Important Notes

1. **Anonymous Users**:

   - Have randomly generated email/password
   - Are real user records in your database
   - Can be converted to regular accounts later
   - Have full authentication capabilities

2. **Security Considerations**:

   - Anonymous users can access authenticated routes
   - Consider cleanup policies for unused accounts
   - May want to limit capabilities of anonymous users
   - Should implement conversion flow to regular accounts

3. **Best Practices**:
   - Use for "try before you buy" experiences
   - Implement guest checkout flows
   - Allow easy conversion to full accounts
   - Consider automatic cleanup of inactive anonymous accounts

## Related Topics

- [`signInWithPassword`](/docs/context-api/sign-in-with-password)
- [`registerWithPassword`](/docs/context-api/register-with-password)
- [`request.auth`](/docs/context-api/auth)
- [Authentication Guide](/docs/authentication)
