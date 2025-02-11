---
title: send - Realtime Messaging
description: Send realtime messages to connected clients from PocketPages routes.
---

# `send` - Realtime Messaging

- **Type**: `(topic: string, message: string, filter?: (clientId: string, client: any) => boolean) => void`
- **Description**: Sends a realtime message to connected clients. Messages can be broadcast to all clients or filtered to specific recipients. By default, messages are filtered to only reach the current authenticated user.

## Parameters

- `topic`: The message topic/channel
- `message`: The message content to send
- `filter`: (Optional) Function to filter which clients receive the message. Defaults to only sending to the current authenticated user. Pass a custom filter to override this behavior.

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
  <input type="text" name="message" placeholder="Type a message...">
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
  // Update record...
  const record = $app.dao().findRecordById('products', formData.id)

  // Broadcast update to all clients viewing this product
  send(`product-${record.id}`, stringify({
    action: 'update',
    data: record
  }), () => true) // Override default filter to send to all viewers
}
%>

<!-- Client-side listener -->
<script>
const productId = '<%%= params.id %>'
pb.realtime.subscribe(`product-${productId}`, (data) => {
  const update = JSON.parse(data)
  if (update.action === 'update') {
    updateProductUI(update.data)
  }
})
</script>
```

## Important Notes

1. **Message Format**:

   - Messages are sent as strings
   - Use `stringify()` for sending structured data
   - Clients need to parse JSON messages

2. **Client Filtering**:

   - Default filter only sends to current authenticated user
   - Filter function receives client ID and client object
   - Return `true` to send to that client
   - Return `false` to skip that client
   - Pass `() => true` to broadcast to all subscribers

3. **Performance Considerations**:

   - Messages are sent asynchronously
   - Large messages may impact performance
   - Consider rate limiting for high-frequency updates
   - Filter unnecessary broadcasts

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
