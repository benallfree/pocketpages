---
title: JS SDK Plugin
description: Adds PocketBase JavaScript SDK support to PocketPages with automatic authentication handling and JSVM compatibility.
---

# JS SDK Plugin

The JS SDK plugin (`pocketpages-plugin-js-sdk`) provides a JSVM-compatible version of the PocketBase JavaScript SDK, making it easy to interact with your PocketBase collections and authentication system.

## Installation

```bash
npm install pocketpages-plugin-js-sdk
```

## Configuration

Add the plugin to your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    'pocketpages-plugin-js-sdk',
    // ... other plugins
  ],
}
```

### Options

- **`host`**: PocketBase server URL (default: `'http://localhost:8090'`)
- **`debug`**: Enable debug output for the plugin (default: `false`)

## Usage

The plugin adds a `pb()` function to the global context that returns a configured PocketBase client:

```ejs
<%%
  // Get a reference to the PocketBase client
  const client = pb()

  // Use any PocketBase SDK method
  const records = client.collection('posts').getFullList({
    sort: '-created',
    expand: 'author',
  })
%>

<%% records.forEach(record => { %>
  <div class="post">
    <h2><%%= record.title %></h2>
    <p>By <%%= record.expand?.author?.name %></p>
  </div>
<%% }) %>
```

### Authentication Support

The client automatically handles authentication by checking for:

1. The `Authorization` header
2. The `pb_auth` cookie

This means you can use the same client for both authenticated and unauthenticated requests without additional configuration.

### Example: Working with Collections

```ejs
<%%
  const client = pb()

  // Create a record
  const post = client.collection('posts').create({
    title: 'Hello World',
    content: 'My first post',
  })

  // Query with filters
  const published = client.collection('posts').getFullList({
    filter: 'status = "published"',
    sort: '-created',
  })

  // Update a record
  client.collection('posts').update(post.id, {
    views: post.views + 1,
  })
%>
```

### Example: Authentication

```ejs
<%%
  const client = pb()

  try {
    // Attempt to authenticate
    const user = client.collection('users').authWithPassword(
      'user@example.com',
      'password123'
    )

    // Get the authenticated user's data
    const userData = client.authStore.model
  } catch (e) {
    // Handle authentication errors
  }
%>
```

## Benefits Over Raw JSVM API

While using the raw JSVM API might be slightly more efficient, the PocketBase REST API (via the SDK) offers several advantages:

- Well-documented and widely used API surface
- Consistent API between frontend and backend code
- Access to high-level features not easily available in raw JSVM
- Familiar JavaScript patterns and nomenclature
- Rich ecosystem of examples and community support

## SDK References

The plugin uses a special JSVM-compatible version of the PocketBase JS SDK that provides synchronous methods instead of async/await:

- [JSVM SDK Documentation](https://www.npmjs.com/package/pocketbase-js-sdk-jsvm)
- [Original JS SDK Documentation](https://github.com/pocketbase/js-sdk)
