---
title: redirect - Navigation Helper
description: Perform HTTP redirects in PocketPages templates using the redirect helper function.
---

# `redirect` - Navigation Helper

- **Type**: `(path: string, options?: RedirectOptions) => void`
- **Description**: A PocketPages helper function that performs an immediate HTTP redirect to the specified path. Optionally accepts a status code and flash message.

## Parameters

- `path`: The URL path to redirect to
- `options`: (Optional) Configuration object:
  ```typescript
  {
    status?: number   // HTTP status code (defaults to 302)
    message?: string  // Flash message to display on next page
  }
  ```

## Basic Usage

```ejs
<%%
// Basic redirect with default 302 status
redirect('/dashboard')

// Redirect with custom status
redirect('/new-location', { status: 301 })

// Redirect with flash message
redirect('/login', { message: 'Please log in first' })

// Redirect with both options
redirect('/error', {
  status: 303,
  message: 'Something went wrong'
})
%>
```

## Flash Messages

When you provide a `message` in the options, PocketPages automatically:

1. Adds the message to the redirect URL as `__flash` query parameter
2. Makes it available on the next page load

Example handling flash messages:

```ejs
<%% if (params.__flash) { %>
  <div class="alert">
    <%%= params.__flash %>
  </div>
<%% } %>
```

## Common Use Cases

### Authentication Redirects

```ejs
<%%
if (!request.auth) {
  redirect('/login', {
    message: 'Please log in to access this page'
  })
  return
}
%>
```

### Form Processing

```ejs
<%%
if (formData.success) {
  redirect('/thank-you', {
    message: 'Your form was submitted successfully!'
  })
  return
}

if (formData.error) {
  redirect('/form', {
    status: 303,
    message: 'Please correct the errors and try again'
  })
  return
}
%>
```

### Multi-Step Forms

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
        redirect('/form/step-2', {
          message: 'Step 1 completed!'
        })
        return
      }
      break
    case '2':
      if (formData.isComplete) {
        redirect('/form/complete', {
          message: 'Form completed successfully!'
        })
        return
      }
      break
  }
}
%>
```

## Important Notes

1. **Flash Messages**

   - Are single-use (cleared after being displayed)
   - Passed via URL query parameter
   - Should be HTML-escaped when displayed
   - Best for simple success/error notifications

2. **Status Codes**

   - 302 (Found) - Default temporary redirect
   - 301 (Moved Permanently) - Permanent redirect
   - 303 (See Other) - Typically after POST requests
   - 307 (Temporary Redirect) - Preserves request method

3. **Best Practices**
   - Always return after calling redirect()
   - Use flash messages sparingly
   - Consider UX when choosing status codes
   - Keep flash messages concise

## See Also

- [Request Context](/docs/context-api/request)
- [Response Context](/docs/context-api/response)
- [Form Handling](/docs/forms)
