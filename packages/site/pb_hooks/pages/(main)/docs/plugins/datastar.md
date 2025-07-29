# PocketPages Datastar Backend SDK

Implements the [Datastar SDK ADR](https://github.com/starfederation/datastar/blob/develop/sdk/ADR.md) for PocketPages, providing realtime DOM updates and signal management.

## Installation

```bash
npm install pocketpages-plugin-datastar
```

## Configuration

Add to your `+config.js`:

```javascript
module.exports = {
  plugins: [
    'pocketpages-plugin-ejs',
    'pocketpages-plugin-datastar',
    'pocketpages-plugin-realtime',
  ],
}
```

Add to your `+layout.ejs` or similar:

```html
<head>
  <%%- datastar.scripts() %>
</head>
```

## API Reference

### Core Methods

#### `datastar.patchElements(elements, options?)`

Updates DOM elements with new HTML content.

```javascript
// Basic usage
datastar.patchElements('<div>New content</div>')

// With options
datastar.patchElements('<div>New content</div>', {
  selector: '#target',
  mode: 'inner',
  useViewTransition: true,
  eventId: 'unique-id',
  retryDuration: 1000,
})
```

**Options:**

- `selector` - CSS selector for target element
- `mode` - Patch mode: `outer`, `inner`, `remove`, `replace`, `prepend`, `append`, `before`, `after`
- `useViewTransition` - Enable ViewTransition API
- `eventId` - Unique event identifier
- `retryDuration` - SSE retry duration in milliseconds

#### `datastar.patchSignals(signals, options?)`

Updates client-side signals with new data.

```javascript
// Basic usage
datastar.patchSignals(stringify({ count: 42 }))

// With options
datastar.patchSignals(stringify({ count: 42 }), {
  onlyIfMissing: true,
  eventId: 'unique-id',
  retryDuration: 1000,
})
```

**Options:**

- `onlyIfMissing` - Only patch if signals don't exist
- `eventId` - Unique event identifier
- `retryDuration` - SSE retry duration in milliseconds

#### `datastar.readSignals(request, target)`

Reads signals from request and merges into target object.

```javascript
// Read signals into a new object
const data = datastar.readSignals(request, {})

// Read into existing object
const form = datastar.readSignals(request, { name: '', email: '' })
```

### Utility Methods

#### `datastar.executeScript(script, options?)`

Executes JavaScript on the client.

```javascript
datastar.executeScript('console.log("Hello from server")')

// With options
datastar.executeScript('alert("Hello")', {
  autoRemove: true,
  attributes: ['type="module"'],
  eventId: 'script-1',
  retryDuration: 1000,
})
```

#### `datastar.consoleLog(message, options?)`

Logs a message to client console.

```javascript
datastar.consoleLog('Server message')
```

#### `datastar.consoleError(error, options?)`

Logs an error to client console.

```javascript
datastar.consoleError('Something went wrong')
datastar.consoleError(new Error('Server error'))
```

#### `datastar.redirect(url, options?)`

Redirects the client to a new URL.

```javascript
datastar.redirect('/dashboard')
```

#### `datastar.dispatchCustomEvent(eventName, detail, options?)`

Dispatches a custom event on the client.

```javascript
datastar.dispatchCustomEvent('user-updated', { id: 123 })

// With options
datastar.dispatchCustomEvent(
  'custom-event',
  { data: 'value' },
  {
    selector: '.target',
    bubbles: true,
    cancelable: true,
    composed: true,
  }
)
```

#### `datastar.replaceURL(url, options?)`

Updates the browser URL without navigation.

```javascript
datastar.replaceURL('/new-path')
```

#### `datastar.prefetch(urls, options?)`

Prefetches URLs using speculation rules.

```javascript
datastar.prefetch(['/page1', '/page2'])
```

### Realtime Methods

#### `datastar.realtime.patchElements(elements, options?)`

Broadcasts element updates to all connected clients.

```javascript
datastar.realtime.patchElements('<div>Broadcast message</div>')
```

#### `datastar.realtime.patchSignals(signals, options?)`

Broadcasts signal updates to all connected clients.

```javascript
datastar.realtime.patchSignals(stringify({ globalCount: 100 }))
```

## Examples

### Chat Application

```javascript
// Save message and broadcast to all clients
const messages = store('messages') || []
const { from, message } = request.url.query.datastar
messages.push({ from, message })
store('messages', messages)

// Broadcast updated chat box
datastar.realtime.patchElements(include('chat-box.ejs', { messages }))

// Clear input
datastar.patchSignals(stringify({ message: '' }))
```

### Counter with Realtime Updates

```javascript
// Increment counter
$app.runInTransaction(() => {
  store('count', (store('count') || 1) + 1)
})

// Return updated counter
<%%- include('count.ejs') %>
```

### Form Handling

```javascript
// Read form data
const formData = datastar.readSignals(request, { name: '', email: '' })

// Process and respond
if (formData.name && formData.email) {
  datastar.patchElements('<div>Success!</div>')
} else {
  datastar.consoleError('Please fill all fields')
}
```

## Client-Side Integration

The plugin automatically injects the Datastar loader script. Use DataStar attributes in your HTML:

```html
<button data-on-click="@get('/api/increment')">
  Count: <span data-bind-count><%%= store('count') %></span>
</button>

<form data-on-submit="@post('/api/submit')">
  <input name="name" data-bind-name />
  <button type="submit">Submit</button>
</form>
```

### Hash Change Events

The plugin automatically listens for browser hash changes and dispatches a custom `hashchange` event.

With this event, you can do a "SPA lite" approach where changes to the URL hash can trigger actions.
You can listen for this event to handle hash-based navigation:

```html
<div data-on-hashchange="@get(`/update?topic`+evt.detail.hash)">
  <!-- Content that responds to hash changes -->
</div>
```

The event detail includes:

- `oldURL` - Previous URL
- `newURL` - New URL
- `hash` - Current hash value

## Event Types

- `datastar-patch-elements` - DOM element updates
- `datastar-patch-signals` - Signal updates
- `hashchange` - Browser hash change events

## Default Values

- `DefaultSseRetryDuration`: 1000ms
- `DefaultElementsUseViewTransitions`: false
- `DefaultPatchSignalsOnlyIfMissing`: false
- `DefaultElementPatchMode`: 'outer'

```

```
