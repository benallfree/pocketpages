---
title: What's New in v0.10
description: Key improvements in PocketPages v0.10 including asset management, routing enhancements, and request context updates.
---

# What's New

PocketPages has undergone significant improvements to enhance developer experience and application performance. Here are the key updates:

## Asset Management & Fingerprinting

The asset management system has been completely revamped to provide better caching and version control:

- Automatic fingerprinting of static assets
- Built-in cache busting through content-based hashing
- Simplified asset references in templates
- Improved performance through optimized asset serving

Example usage:

```js
// In your template
<link href="<%%= asset('/css/main.css') %%>" rel="stylesheet">
<script src="<%%= asset('/js/app.js') %%>"></script>
```

Learn more in the [Asset Management](./asset-management) guide.

## Enhanced Routing

The routing system now supports all HTTP methods with improved flexibility:

- Full support for GET, POST, PUT, PATCH, DELETE methods
- Method-specific route handlers
- Improved pattern matching
- Better handling of dynamic segments

Example route configuration:

```js
// In your routes.js
export default {
  '/api/posts': {
    get: (ctx) => {
      // Handle GET requests
      return ctx.json(posts)
    },
    post: (ctx) => {
      // Handle POST requests
      return ctx.json({ status: 'created' })
    },
  },
}
```

## Overhauled Request Context

The request context (`ctx`) object has been redesigned to provide more powerful and intuitive APIs:

- Simplified access to request data
- Enhanced response helpers
- Improved type safety
- Better error handling

Example usage of the new context API:

```js
export default function handler(ctx) {
  // Easy access to query parameters
  const { page } = ctx.query

  // Simplified response methods
  if (!page) {
    return ctx.json({ error: 'Page required' }, 400)
  }

  // Enhanced request body handling
  const data = ctx.req.json()

  return ctx.json({
    page,
    data,
  })
}
```

These improvements make PocketPages more powerful while maintaining its simplicity and ease of use. Check out the individual documentation sections for detailed information about each feature.
