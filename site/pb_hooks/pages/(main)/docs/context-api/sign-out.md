---
title: signOut - User Logout
description: Sign out the current user by clearing their authentication cookie in PocketPages templates.
---

# `signOut` - User Logout

- **Type**: `() => void`
- **Description**: Signs out the current user by clearing their authentication cookie. After calling this function, `request.auth` will be `undefined` on subsequent requests.

## Basic Usage

```ejs
<%%
signOut()
redirect('/login')
%>
```

## Common Use Cases

### Logout Button/Form

```ejs
<%%
if (request.method === 'POST' && formData.action === 'logout') {
  signOut()
  redirect('/login')
}
%>

<form method="POST">
  <input type="hidden" name="action" value="logout">
  <button type="submit">Sign Out</button>
</form>
```

### Session Expiry Handler

```ejs
<%%
if (request.auth) {
  const lastActivity = new Date(request.auth.get('lastActivity'))
  const now = new Date()
  const inactiveTime = now - lastActivity

  if (inactiveTime > 30 * 60 * 1000) { // 30 minutes
    signOut()
    redirect('/login?reason=session_expired')
    return
  }
}
%>
```

## Important Notes

1. **Cookie Management**: This function:

   - Clears the authentication cookie
   - Takes effect immediately
   - Does not require a server response

2. **Security Considerations**:

   - Always redirect after logout
   - Clear any client-side state
   - Consider implementing CSRF protection
   - Use POST requests for logout actions

3. **Best Practices**:

   - Redirect to login page after logout
   - Show confirmation messages
   - Handle errors gracefully
   - Consider cleanup of user-specific data

4. **Client-Side Integration**:
   - This function only clears the server-side cookie
   - If using the PocketBase JS SDK on the frontend, you'll need to handle its authentication state separately
   - The SDK uses localStorage for JWT storage, which isn't affected by cookie changes
   - Consider implementing a complete logout that handles both:

```ejs
<!-- Complete logout handling -->
<script>
// Assuming you have the PocketBase SDK initialized as 'pb'
async function handleLogout() {
  // Clear SDK state
  pb.authStore.clear()

  // Call server-side logout
  await fetch('/logout', { method: 'POST' })

  // Redirect to login
  window.location.href = '/login'
}
</script>

<button onclick="handleLogout()">Sign Out</button>
```

## Related Topics

- [`signInWithPassword`](/docs/context-api/sign-in-with-password)
- [`signInWithToken`](/docs/context-api/sign-in-with-token)
- [`request.auth`](/docs/context-api/auth)
- [Authentication Guide](/docs/authentication)
