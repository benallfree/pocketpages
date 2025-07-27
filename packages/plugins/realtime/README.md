# PocketPages Realtime Plugin

Convience functions for [PocketBase realtime messaging](https://pocketbase.io/docs/js-realtime/)

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

## Usage

### Basic Example

In this basic example, we make an API call on an interval that causes SSE data to be sent from the server.

By default, messages are only sent to realtime clients that have subscribed to the topic.

```html
<script src="https://unpkg.com/pocketbase/dist/pocketbase.umd.js"></script>
<script>
  const pb = new PocketBase('http://127.0.0.1:8090')

  // Subscribe to realtime updates
  pb.realtime.subscribe('ping', (data) => {
    console.log('Received:', data)
  })

  // Generate a ping every 5s
  setInterval(() => {
    fetch(`api/ping`)
  }, 5000)
</script>
```

```html
<!-- pages/api/ping.ejs -->
<script server>
  context.realtime.send('ping', +new Date().toString())
</script>
```

### With Custom Filter

By default, messages are only sent to clients subscribed to the topic. However, you can assign a custom filter for more advanced use cases.

Here is a filter that sends the message to all authenticated clients.

```js
// pages/_private/sendAlert.js

const sendAlert = (context, message) => {
  context.realtime.send(
    `alert`,
    message,
    (clientId, client, topic, message) => {
      return client.get('auth')?.id
    }
  )
}
```

> Note: When you implement a custom filter, you must check `client.hasSubscription(topic)` yourself as needed.

### Hypermedia (HTMX, Datastar)

For hypermedia frameworks, you may wish to send HTML. The easiest way to do that is by creating a partial and stringifying the result.

```html
<!-- pages/api/chat.ejs -->
<script server>
  const { message } = body()

  realtime.send('chat', stringify(include('chat-msg.ejs', { message })))
</script>
```

## API

The plugin extends the context API with a `realtime` object:

### `realtime.send(topic, message, filter?)`

Sends a message to all subscribed clients.

- **topic** (string): The subscription topic name
- **message** (string): The message to send
- **filter** (function, optional): Custom filter function to target specific clients

```ts
const DefaultSseFilter: RealtimeFilter = (
  clientId: ClientId,
  client: Client,
  topic: string,
  message: string
) => {
  return client.hasSubscription(topic)
}
```
