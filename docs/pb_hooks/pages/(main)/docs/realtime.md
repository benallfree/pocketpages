---
title: Realtime Events
description: Understanding realtime events in PocketPages, including server-side sending and client-side listening
---

# Realtime Events

PocketBase provides realtime capabilities through WebSocket connections. However, there are important differences between server-side and client-side usage.

## Server-Side (JSVM)

When using PocketBase in hooks or PocketPages (server-side), you cannot subscribe to realtime events since the JSVM environment doesn't support WebSocket connections. However, you can send realtime events to connected clients:

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

## Client-Side (Browser/Node.js)

In client-side code, you can use the full PocketBase JavaScript SDK to both send and receive realtime events:

```js
// Initialize the PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090')

// Subscribe to a specific channel
const unsubscribe = pb.realtime.subscribe(`rooms/${ROOM_ID}/delta`, (e) => {
  console.log('Received delta:', e)
  applyDeltas(roomState, e)
  console.log('Room state after deltas:', roomState)
})

// Later, unsubscribe if needed
unsubscribe()
```

### Auto-Reconnection

The PocketBase JS SDK automatically handles connection management:

- Automatically reconnects when the connection is lost
- Resubscribes to previous channels after reconnection
- Provides connection status via `pb.realtime.isConnected`

You can also listen for disconnect events:

```js
pb.realtime.onDisconnect = function (activeSubscriptions) {
  console.log('Disconnected with active subscriptions:', activeSubscriptions)
  // Optionally handle the disconnect event
  // The client will automatically attempt to reconnect
}
```

## Important Notes

1. **Server vs Client**

   - Server (JSVM) can only send events
   - Clients can both send and receive events
   - Use the appropriate SDK for each environment

2. **SDK Versions**

   - Browser/Node.js: Use [pocketbase/js-sdk](https://github.com/pocketbase/js-sdk)
   - Server/JSVM: Use [pocketbase-js-sdk-jsvm](https://github.com/benallfree/pocketbase-js-sdk)

3. **Best Practices**
   - Keep channel names consistent and well-structured
   - Clean up subscriptions when no longer needed
   - Handle reconnection gracefully
   - Consider implementing retry logic for critical messages

## See Also

- [PocketBase JS SDK Documentation](https://github.com/pocketbase/js-sdk#realtimeservice)
- [PocketBase JSVM Documentation](https://pocketbase.io/docs/js-overview/)
