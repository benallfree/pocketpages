# Realtime Plugin

Server-Sent Events (SSE) plugin for PocketPages that enables real-time communication between server and clients.

## Installation

```bash
npm install pocketpages-plugin-realtime
```

## Setup

```javascript
// +config.js
module.exports = {
  plugins: ['pocketpages-plugin-realtime'],
}
```

## API

The plugin extends the context API with a `realtime` object:

### `realtime.send(topic, message, filter?)`

Sends a message to all subscribed clients.

- **topic** (string): The subscription topic name
- **message** (string): The message to send
- **filter** (function, optional): Custom filter function to target specific clients

## Usage

### Basic Example

```javascript
// pages/api/notify.ejs
<%= context.realtime.send('updates', 'New data available') %>
```

### Chat Example

```javascript
// pages/api/chat.ejs
<script server>
  const {message} = body() realtime.send('chat',
  stringify(include(`chat-msg.ejs`, {message})))
</script>
```

### With Custom Filter

```javascript
// pages/api/private.ejs
<%= context.realtime.send('private', 'Secret message', (clientId, client) => {
  return client.get('auth')?.id === context.auth?.id
}) %>
```

### Client-Side Subscription

```html
<!-- pages/index.ejs -->
<script src="https://unpkg.com/pocketbase/dist/pocketbase.umd.js"></script>
<script>
  const pb = new PocketBase('http://127.0.0.1:8090')

  // Subscribe to realtime updates
  const unsubscribe1 = pb.realtime.subscribe('updates', (data) => {
    console.log('Received:', data)
  })

  const unsubscribe2 = pb.realtime.subscribe('private', (data) => {
    console.log('Private message:', data)
  })

  // Later, unsubscribe if needed
  // unsubscribe1()
  // unsubscribe2()
</script>
```

### SSE Endpoint

Create an SSE endpoint that clients can connect to:

```javascript
// pages/api/realtime.ejs
<%= context.pb.sse.subscribe('updates', 'private') %>
```

This creates the WebSocket/SSE connection endpoint that the PocketBase client connects to automatically.

## Default Filter

The plugin includes a default filter that ensures private messages are only sent to authenticated users:

```javascript
const DefaultSseFilter = (clientId, client) => {
  return api.auth?.id ? client.get('auth')?.id === api.auth?.id : true
}
```

## Features

- **Topic-based messaging**: Send messages to specific subscription topics
- **Client filtering**: Target specific clients with custom filter functions
- **Authentication-aware**: Built-in support for user-specific messaging
- **Lightweight**: Minimal overhead with efficient client management
