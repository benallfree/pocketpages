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

```html
<script <%='server'%>>
  context.realtime.send('updates', 'New dataavailable')
</script>
```

### Chat Example

```html
// pages/api/chat.ejs
<script <%='server'%>>
  const {message} = body()
  realtime.send('chat', stringify(include(`chat-msg.ejs`, {message})))
</script>
```

### With Custom Filter

```html
<script <%='server'%>>
// pages/api/private.ejs
context.realtime.send('private', 'Secret message', (clientId, client) => {
  return client.get('auth')?.id === context.auth?.id
})
</script>
```

### Client-Side Subscription

```html
<script <%='server'%>>
  const {message} = body()
  realtime.send('chat', stringify(include(`chat-msg.ejs`, {message})))
</script>
```

## Default Filter

The plugin includes a default filter that ensures private messages are only sent to authenticated users:

```javascript
const DefaultSseFilter = (clientId, client) => {
  return api.auth?.id ? client.get('auth')?.id === api.auth?.id : true
}
```
