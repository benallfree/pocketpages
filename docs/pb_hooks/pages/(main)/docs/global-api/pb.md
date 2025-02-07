---
title: pb - PocketBase Client
description: Access the PocketBase JS SDK client adapted for JSVM
---

# `pb()` - PocketBase Client

The `pb()` function returns a configured PocketBase client instance that is ready to communicate with your PocketBase server directly in the JSVM.

## Basic Usage

```javascript
const pb = require('pocketpages').pb()

// Use any PocketBase SDK method
const users = pb.collection('users').getFullList()
const posts = pb.collection('posts').getList(1, 20)
```

## Configuration

The client is automatically configured using your `+config.js` settings:

```javascript
// +config.js
export default {
  host: 'http://127.0.0.1:8090', // Default PocketBase URL
}
```

## SDK References

The client uses a special JSVM-compatible version of the PocketBase JS SDK that provides synchronous methods instead of async/await:

- [JSVM SDK Documentation](https://www.npmjs.com/package/pocketbase-js-sdk-jsvm)
- [Original JS SDK Documentation](https://github.com/pocketbase/js-sdk)

## Benefits

While using the raw JSVM API might be slightly more efficient, the PocketBase REST API (via the SDK) offers several advantages:

- Well-documented and widely used API surface
- Consistent API between frontend and backend code
- Access to high-level features not easily available in raw JSVM
- Familiar JavaScript patterns and nomenclature
- Rich ecosystem of examples and community support

## Example Usage

```javascript
const pb = require('pocketpages').pb()

// Create a record
const post = pb.collection('posts').create({
  title: 'Hello World',
  content: 'This is my first post',
})

// Query with filters
const published = pb.collection('posts').getFullList({
  filter: 'status = "published"',
  sort: '-created',
})

// Update a record
pb.collection('posts').update(post.id, {
  views: post.views + 1,
})
```

## Template Usage

```ejs
<%%
  const pb = require('pocketpages').pb()

  // Get recent posts
  const posts = pb.collection('posts').getFullList({
    sort: '-created',
    filter: 'published = true',
    limit: 5
  })
%>

<%% posts.forEach(post => { %>
  <article>
    <h2><%%= post.title %></h2>
    <p><%%= post.content %></p>
  </article>
<%% }) %>
```

## Important Notes

- All SDK methods are synchronous (no async/await needed)
- Real-time features are not available in the JSVM version
- AsyncAuthStore is not supported
- The client is cached after first initialization

## Realtime Events

When using PocketBase in hooks (server-side), you cannot subscribe to realtime events since it runs in an isolated JSVM environment. However, you can send realtime events from hooks to connected clients using the subscriptions broker:

```js
// Send a custom event to specific subscribers
function pushCustomEvent(channel, data, filterFn = (client) => true) {
  const message = new SubscriptionMessage({
    name: channel,
    data: JSON.stringify(data)
  });

  // Get all connected clients
  const clients = $app.subscriptionsBroker().clients();

  // Filter clients that are subscribed to this channel
  const filteredClients = Object.entries(clients).filter(
    ([id, client]) => client.hasSubscription(channel) && filterFn(client)
  );

  // Send message to filtered clients
  filteredClients.forEach(([id, client]) => {
    client.send(message);
  });
}

// Example usage:
pushCustomEvent("rooms/123/delta", {
  type: "update",
  changes: { ... }
});
```

Note that client-side usage of the PocketBase SDK (in browsers) maintains full realtime subscription capabilities as normal.
