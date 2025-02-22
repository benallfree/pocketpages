---
title: send - Realtime Messaging
description: Send realtime messages to connected clients from PocketPages routes.
---

# `send` - Realtime Messaging

**Method Signatures**:

```typescript
type Filter = (clientId: string, client: subscriptions.Client) => boolean

// Send a message to clients
function send(topic: string, message: string, filter?: Filter): void

// Capture and send rendered content
function send(topic: string, filter?: Filter): void
```

- **Description**: Sends a realtime message to connected clients. Messages can be broadcast to all clients or filtered to specific recipients. By default, messages are filtered to only reach the current authenticated user.

See [Client interface documentation](https://pocketbase.io/jsvm/interfaces/subscriptions.Client.html) for details about the available client methods. Note that `client.get('auth')` returns a [core.Record](https://pocketbase.io/docs/js-records/) auth record when the client is authenticated.

## Parameters

- `topic`: The message topic/channel
- `messageOrFilter`: (Optional) Either the message content to send, or a filter function
- `filter`: (Optional) Function to filter which clients receive the message. Defaults to only sending to the current authenticated user.

## Basic Usage

```ejs
<%%
// Send to current authenticated user only (default behavior)
send('notifications', 'Hello!')

// Send to all clients subscribed to "chat"
send('chat', 'Hello everyone!', () => true)

// Send to specific user
send('notifications', 'New message', (clientId, client) => {
  return client.get('auth')?.id === '123'
})
%>
```

## Render Capture Mode

You can use `send()` to capture and broadcast the rendered output of a template. This is useful for real-time updates where the server renders HTML that should be sent to clients. The captured content is automatically JSON stringified to safely handle newlines and special characters.

```ejs
<%%
// Activate render capture mode - the rendered template output
// will be sent to the 'chat' topic
send('chat')

// Optional: Specify a custom filter
send('chat', (clientId, client) => client.get('auth')?.id === userId)
%>

<!-- This content will be captured and sent -->
<div class="message">
  <strong><%%= username %>:</strong>
  <%%= message %>
</div>
```

### Example Chat Implementation

```ejs
<!-- api/chat.ejs -->
<%%
const { message } = body()

// Activate render capture mode for 'chat' topic
send('chat')
%>
<div class="message">
  <%%= message %>
</div>
```

```html
<!-- Client-side -->
<form hx-post="/api/chat" hx-swap="none">
  <input name="message" />
  <button>Send</button>
</form>

<div id="messages" hx-ext="sse" sse-connect="/api/sse" sse-swap="chat">
  <!-- Messages will appear here -->
</div>
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
  send('chat', payload, () => true)

  // Optionally store in database
  $app.dao().createRecord('messages', {
    userId,
    message: formData.message
  })
}
%>

<!-- Chat form -->
<form method="POST">
  <input type="text" name="message" placeholder="Type a message..." />
  <button type="submit">Send</button>
</form>

<!-- Client-side listener -->
<script>
pb.realtime.subscribe('chat', (data) => {
  const msg = JSON.parse(data)
  appendMessage(msg)
})
</script>
```

### Notifications

```ejs
<%%
// Send notification to specific user
function notifyUser(userId, message) {
  send('notifications', stringify({ message }), (clientId, client) => {
    return client.get('auth')?.id === userId
  })
}

// Usage in form handler
if (request.method === 'POST') {
  // Process form...

  // Notify relevant users
  notifyUser('123', 'Your form was processed')
  notifyUser('456', 'New submission requires review')
}
%>
```

### Live Updates

```ejs
<%%
// After updating a record
if (request.method === 'POST' && formData.action === 'update') {
  const record = $app.dao().findRecordById('products', formData.id)

  // Activate render capture mode
  send(`product-${record.id}`, () => true)
%>
  <!-- Updated product view will be captured and sent -->
  <div class="product">
    <h2><%%= record.name %></h2>
    <p><%%= record.description %></p>
    <span class="price">$<%%= record.price %></span>
  </div>
<%% } %>
```

## Important Notes

1. **Message Formats**:

   - Direct messages are sent as strings
   - Use `stringify()` for sending structured data
   - In render capture mode, the rendered HTML is sent automatically

2. **Render Capture Mode**:

   - Activated by calling `send(topic)` or `send(topic, filter)`
   - Captures all rendered output after the `send()` call
   - Content is automatically JSON stringified for safe transmission
   - Useful for sending server-rendered HTML updates
   - Common with HTMX SSE integration

3. **Client Filtering**:

   - Default filter only sends to current authenticated user
   - Filter function receives client ID and client object
   - Return `true` to send to that client
   - Return `false` to skip that client
   - Pass `() => true` to broadcast to all subscribers

4. **Security**:
   - Default filtering helps prevent message leaks
   - Validate message content
   - Consider authentication state
   - Filter sensitive information
   - Protect against message injection

## Related Topics

- [Realtime Guide](/docs/realtime)
- [PocketBase Realtime API](https://pocketbase.io/docs/realtime)
- [Client-Side Integration](/docs/client-side)
