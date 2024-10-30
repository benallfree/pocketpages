---
title: redirect - Navigation Helper
description: Perform HTTP redirects in PocketPages templates using the redirect helper function.
---

# `redirect` - Navigation Helper

- **Type**: `(path: string, status?: number) => void`
- **Description**: A PocketPages helper function that performs an immediate HTTP redirect to the specified path. By default, it uses a 302 (temporary) redirect status code, but you can specify a different status code if needed.

## Parameters:

- `path`: The URL path to redirect to
- `status`: (Optional) HTTP status code (defaults to 302)

## Basic Usage:

```ejs
<%%
// Basic redirect with default 302 status
redirect('/dashboard')

// Redirect with permanent status (301)
redirect('/new-location', 301)
%>
```

## Common Use Cases:

### Authentication Redirects

```ejs
<%%
const auth = requirePrivate('auth')
if (!auth.isLoggedIn(ctx)) {
    redirect('/login')
    return
}
%>
```

### Form Processing

```ejs
<%%
if (formData.success) {
    redirect('/thank-you')
    return
}
%>
```

### URL Normalization

```ejs
<%%
// Ensure URLs end with trailing slash
if (!ctx.path().endsWith('/')) {
    redirect(ctx.path() + '/')
    return
}
%>
```

## Important Notes:

1. Always `return` after calling `redirect` to prevent further code execution
2. The redirect is immediate - no code after the redirect will execute
3. Don't write any response data after calling redirect
4. Common status codes:
   - 302: Temporary redirect (default)
   - 301: Permanent redirect
   - 303: See Other (common after POST)
   - 307: Temporary redirect (preserves method)
   - 308: Permanent redirect (preserves method)

## Comparison with ctx.redirect()

While `ctx.redirect()` is available through the Echo context, the `redirect` helper is recommended because:

1. It's specifically designed for PocketPages
2. It ensures proper handling of the response
3. It's more concise and easier to use

```ejs
// Recommended (PocketPages helper)
<%% redirect('/dashboard') %>

// Not recommended (Echo context)
<%% ctx.redirect(302, '/dashboard') %>
```

## Examples in Context:

### Multi-Step Form

```ejs
<%%
// _private/form-handler.js
module.exports = ({ formData, redirect }) => {
    if (!formData.step) {
        redirect('/form/step-1')
        return
    }

    switch (formData.step) {
        case '1':
            if (formData.isValid) {
                redirect('/form/step-2')
                return
            }
            break
        case '2':
            if (formData.isComplete) {
                redirect('/form/complete')
                return
            }
            break
    }
}
%>
```

### Access Control

```ejs
<%%
// Check permissions before showing admin page
const auth = requirePrivate('auth')
const perms = requirePrivate('permissions')

if (!auth.isLoggedIn(ctx)) {
    redirect('/login')
    return
}

if (!perms.isAdmin(ctx)) {
    redirect('/unauthorized')
    return
}
%>

<!-- Admin page content here -->
```
