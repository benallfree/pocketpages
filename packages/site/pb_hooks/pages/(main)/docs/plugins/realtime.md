---
title: Realtime Plugin
description: Add Server-Sent Events (SSE) support to PocketPages for real-time updates and notifications.
---

# Realtime Plugin

The Realtime plugin (`pocketpages-plugin-sse`) adds Server-Sent Events (SSE) support to PocketPages, enabling real-time updates and notifications in your application.

## Installation

```bash
npm install pocketpages-plugin-sse
```

## Configuration

Add the plugin to your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    'pocketpages-plugin-sse',
    // ... other plugins
  ],
}
```

## Usage

The plugin adds an `sseSend()` function to the global context that can be used in two ways:

### 1. Direct Message Sending

Send a message immediately to all subscribed clients:

```ejs
<%%
  // Send to all subscribers of 'chat'
  sseSend('chat', 'New message arrived!')

  // Send only to specific clients using a filter
  sseSend('chat', 'Private message', (clientId, client) => {
    return client.get('roomId') === '123'
  })
%>
```

### 2. Render Capture Mode

When `sseSend()` is called with only a channel name (or with a filter function as the second parameter), it captures and broadcasts the rendered output of the template:

```ejs
<%%
  // Capture and send everything rendered after this point
  sseSend('chat')

  // Or with a filter to control who receives the update
  sseSend('chat', (clientId, client) => {
    return client.get('roomId') === currentRoom.id
  })
%>
<div class="message">
  <strong><%%= user.name %>:</strong> <%%= message %>
</div>
```

This is particularly useful with HTMX integration:

```html
<!-- Client-side template -->
<div hx-ext="pocketbase-sse">
  <div sse-swap="chat" hx-swap="beforeend">
    <!-- SSE content will be appended here -->
  </div>
</div>
```

```ejs
<!-- Server-side API endpoint -->
<%%
  const { message } = body()
  sseSend('chat') // Capture mode
%>
<div class="message">
  <%%= message %>
</div>
```

The rendered HTML content is automatically JSON-stringified to safely handle newlines and special characters.

## Client-Side Integration

### 1. Connect to the SSE Stream

```javascript
// Initialize the PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090')

// Subscribe to realtime updates
const unsubscribe = pb.realtime.subscribe('chat', (data) => {
  console.log('New chat message:', data)
})

// Later, unsubscribe if needed
unsubscribe()

// Check connection status
if (pb.realtime.isConnected) {
  console.log('Connected to realtime API')
}

// Handle disconnects
pb.realtime.onDisconnect = function (subscriptions) {
  console.log('Disconnected, active subscriptions:', subscriptions)
}
```

### 2. Example: Real-time Chat

```ejs
<!-- chat.ejs -->
<%%
  if (request.method === 'POST') {
    const message = formData.get('message')

    // Store the message
    pb().collection('messages').create({
      text: message,
      user: auth.id,
    })

    // Broadcast to all chat subscribers
    sseSend('chat', {
      text: message,
      user: auth.name,
    })

    return { status: 'sent' }
  }
%>

<div id="chat-messages"></div>

<form hx-post="/chat" hx-swap="none">
  <input type="text" name="message">
  <button type="submit">Send</button>
</form>

<script>
  const pb = new PocketBase('http://127.0.0.1:8090')
  const messages = document.getElementById('chat-messages')

  pb.realtime.subscribe('chat', (data) => {
    const msg = data
    messages.innerHTML += `
      <div class="message">
        <strong>${msg.user}:</strong> ${msg.text}
      </div>
    `
  })
</script>
```

## Authentication and Filtering

The plugin automatically handles authentication state:

- By default, authenticated users only receive messages intended for them
- Unauthenticated users receive public messages
- Custom filters can override this behavior

### Client Object

The `client` parameter in filter functions is a [PocketBase Subscription Client](https://pocketbase.io/jsvm/interfaces/subscriptions.Client.html) instance with these key methods:

```typescript
interface Client {
  // Get a stored client value by key
  get(key: string): any

  // Store a value for the client
  set(key: string, value: any): void

  // Check if client is subscribed to a topic
  hasSubscription(topic: string): boolean

  // Send a message to the client
  send(message: Message): void

  // Get all client subscriptions
  subscriptions(): Array<string>
}
```

A common use case is accessing the client's auth record via `client.get('auth')`, which returns a [PocketBase Record](https://pocketbase.io/jsvm/interfaces/core.Record.html) instance with methods like:

```typescript
interface Record {
  // Get any field value
  get(key: string): any

  // Common auth record fields
  id: string
  email(): string
  verified(): boolean
  username?: string

  // Check if user is admin
  isSuperuser(): boolean
}
```

### Custom Filter Examples

```ejs
<%%
  // Filter by stored room ID
  sseSend('room-update', 'User joined', (clientId, client) => {
    const roomId = client.get('roomId')
    return roomId === currentRoom.id
  })

  // Filter by auth status
  sseSend('private', 'Personal notification', (clientId, client) => {
    const auth = client.get('auth') // PocketBase Record
    if (!auth) return false

    // Check various auth conditions
    return (
      auth.id === targetUser.id ||     // Specific user
      auth.isSuperuser() ||            // Admin user
      auth.get('role') === 'moderator' // Custom field
    )
  })

  // Filter by subscription
  sseSend('broadcast', 'News update', (clientId, client) => {
    return client.hasSubscription('news')
  })
%>
```

## Best Practices

1. **Message Format**: Always send structured data that can be parsed as JSON
2. **Error Handling**: Add error listeners on the client side
3. **Reconnection**: The EventSource will automatically attempt to reconnect
4. **Authentication**: Use the built-in auth filtering when possible
5. **Performance**: Use specific event types rather than a single generic one

```javascript
// Good - specific events
events.addEventListener('chat', handleChat)
events.addEventListener('notifications', handleNotifications)

// Less Good - generic event handling
events.onmessage = (e) => {
  const data = JSON.parse(e.data)
  switch (data.type) {
    case 'chat': // ...
    case 'notification': // ...
  }
}
```

## Default Filtering

The default filter implementation:

```javascript
// This is the built-in default filter
;(clientId, client) =>
  // If user is authenticated, only send to their sessions
  api.auth?.id
    ? client.get('auth')?.id === api.auth?.id
    : // If no user is authenticated, send to all clients
      true
```

## Common Use Cases

### Chat Application

```ejs
<%%
if (request.method === 'POST' && formData.message) {
  // Get user info
  const userId = request.auth?.id
  const username = request.auth?.get('username')

  // Create message payload
  const payload = stringify({
    userId,
    username,
    message: formData.message,
    timestamp: new Date().toISOString()
  })

  // Broadcast to all chat participants by overriding default filter
  sseSend('chat', payload, () => true)

  // Optionally store in database
  pb().collection('messages').create({
    userId,
    message: formData.message
  })
}
%>
```

## HTMX Integration

As an alternative to using the PocketBase JS SDK directly, you can use the PocketBase HTMX SSE extension for a more declarative approach:

```html
<!-- Include the extension -->
<script src="https://unpkg.com/pocketbase-htmx-ext-sse"></script>

<!-- Chat interface -->
<div hx-ext="pocketbase-sse">
  <!-- Messages will be appended here -->
  <div sse-swap="chat" hx-swap="beforeend"></div>

  <!-- Form automatically triggers SSE update -->
  <form
    hx-post="/api/chat"
    hx-swap="none"
    hx-on::after-request="if(event.detail.successful) { this.reset(); }"
  >
    <input type="text" name="message" />
    <button type="submit">Send</button>
  </form>
</div>
```

And the corresponding server-side endpoint:

```ejs
<!-- /api/chat.ejs -->
<%%
  const { message } = body()
  sseSend('chat') // Enable render capture mode
%>
<div class="message">
  <%%= message %>
</div>
```

This approach:

1. Requires less JavaScript code
2. Uses a more declarative syntax
3. Handles reconnection automatically
4. Integrates well with other HTMX features

See the [HTMX starter kit](https://github.com/benallfree/pocketpages/tree/main/packages/starters/htmx) for a complete example.
