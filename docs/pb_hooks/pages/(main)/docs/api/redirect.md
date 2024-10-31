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

### Form Processing

```ejs
<%%
if (formData.success) {
    redirect('/thank-you')
    return
}
%>
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
const auth = require('auth')
const perms = require('permissions')

if (!auth.isLoggedIn()) {
    redirect('/login')
    return
}

if (!perms.isAdmin()) {
    redirect('/unauthorized')
    return
}
%>

<!-- Admin page content here -->
```
