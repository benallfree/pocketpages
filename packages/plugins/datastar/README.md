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
  plugins: ['pocketpages-plugin-datastar', 'pocketpages-plugin-realtime'],
}
```

Add to your `+layout.ejs` or similar:

```html
<head>
  <%- datastar.scripts() %>
</head>
```

**Important:** The `datastar.scripts()` call must be included in the `<head>` section of your HTML. This injects the Datastar loader script which is required for all Datastar functionality to work.

### Script Options

The `datastar.scripts()` function accepts optional configuration:

```ejs
<head>
  <%- datastar.scripts(
    {
      spa: {
        scope: 'body', // CSS selector for SPA scope
        selector: 'app' // Optional selector for content updates
      },
      realtime: true // Enable realtime functionality
    }
  ) %>
</head>
```

**Options:**

- `spa` (object, optional) - Enables Single Page Application mode
  - `scope` (string) - CSS selector for the scope where `<a>` tags will be converted to SPA navigation
  - `selector` (string, optional) - CSS selector for content updates. When specified, the `Datastar-Selector` header is sent with requests and the returned content is patched into the matching DOM element using the Datastar `selector` directive. This remedies cases where parent/container divs are lost because they were in `+layout.*` files and layouts are disabled when `Datastar-Request: true` is detected.
- `realtime` (boolean, optional) - Enables realtime functionality for broadcasting updates to all connected clients

## SPA Mode

When SPA mode is enabled, the plugin automatically converts all `<a>` tags within the specified scope to use client-side navigation instead of full page reloads. This creates a smooth single-page application experience.

### How SPA Mode Works

1. **Link Interception**: All `<a>` tags within the specified scope are automatically modified to prevent default navigation
2. **History Management**: Clicking links updates the browser history using `pushState()` without page reloads
3. **Content Updates**: The target page content is fetched and injected into the DOM
4. **Back/Forward Support**: Browser back/forward buttons work correctly with SPA navigation

### SPA Configuration Examples

```html
<!-- Basic SPA with body scope -->
<head>
  <%- datastar.scripts({ spa: { scope: 'body' } }) %>
</head>

<!-- SPA with specific selector for content updates -->
<head>
  <%- datastar.scripts({ spa: { scope: 'nav', selector: 'main-content' } }) %>
</head>

<!-- SPA with realtime enabled -->
<head>
  <%- datastar.scripts({ spa: { scope: 'body' }, realtime: true }) %>
</head>
```

### SPA Behavior

- **Scope**: Only `<a>` tags within the specified CSS selector are converted to SPA navigation
- **Selector**: If `selector` is provided, the `Datastar-Selector` header is sent with requests and returned content is patched into the matching DOM element using the Datastar `selector` directive. This remedies cases where parent/container divs are lost because they were in `+layout.*` files and layouts are disabled when `Datastar-Request: true` is detected
- **History**: Browser history is properly managed for back/forward navigation
- **Headers**: The `Datastar-Request: true` header is automatically sent with requests to disable layouts

### SPA Example

```html
<!DOCTYPE html>
<html>
  <head>
    <%- datastar.scripts({ spa: { scope: 'nav', selector: 'content' } }) %>
  </head>
  <body>
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/profile">Profile</a>
      <a href="/settings">Settings</a>
    </nav>

    <div id="content">
      <!-- Page content will be updated here -->
    </div>
  </body>
</html>
```

In this example, clicking navigation links will update only the `#content` div without full page reloads.

### Layout Behavior with SPA

When SPA mode is enabled, the `Datastar-Request: true` header is automatically sent with requests. This header disables layout rendering (`+layout.*` files) to prevent duplicate HTML structure from being returned.

**Why this matters:**

- Layout files typically contain the page structure (navigation, footer, etc.)
- When layouts are disabled, only the page-specific content is returned
- This can cause issues if your page content expects to be wrapped in a specific container div that was defined in the layout

**The `selector` option solves this by:**

- Sending the `Datastar-Selector` header with requests
- Using the Datastar `selector` directive to patch content into the matching DOM element
- Providing the missing container that would normally come from the layout
- Ensuring proper DOM structure for content updates

**Example scenario:**

```html
<!-- +layout.ejs -->
<div id="main-content"><%- content %></div>

<!-- page.ejs -->
<h1>Page Title</h1>
<p>Page content...</p>
```

Without the `selector` option, SPA requests would return just `<h1>Page Title</h1><p>Page content...</p>` and patch it into the entire page. With `selector: 'main-content'`, the content is patched into the `#main-content` element using the Datastar `selector` directive, ensuring it goes into the correct container.

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

#### `datastar.realtime.patchElements(elements, patchOptions?, realtimeOptions?)`

Broadcasts element updates to all connected clients.

```javascript
// Basic usage
datastar.realtime.patchElements('<div>Broadcast message</div>')

// With patch options
datastar.realtime.patchElements('<div>Broadcast message</div>', {
  selector: '#target',
  mode: 'inner',
  useViewTransition: true,
})

// With realtime options for custom filtering
datastar.realtime.patchElements(
  '<div>Broadcast message</div>',
  {},
  {
    filter: (clientId, client, topic, message) => {
      // Only send to authenticated clients
      return client.get('auth')?.id
    },
  }
)
```

**Parameters:**

- `elements` (string) - HTML content to broadcast
- `patchOptions` (object, optional) - Element patch configuration
- `realtimeOptions` (object, optional) - Realtime delivery options
  - `filter` (function, optional) - Custom filter function to target specific clients

#### `datastar.realtime.patchSignals(signals, options?)`

Broadcasts signal updates to all connected clients.

```javascript
datastar.realtime.patchSignals(stringify({ globalCount: 100 }))
```

## Examples

**Note:** All examples assume you have included `<%- datastar.scripts() %>` in your HTML `<head>` section as shown in the Configuration section above.

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
<%- include('count.ejs') %>
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

The plugin automatically injects the Datastar loader script. Use Datastar attributes in your HTML:

```html
<button data-on-click="@get('/api/increment')">
  Count: <span data-bind-count><%= store('count') %></span>
</button>

<form data-on-submit="@post('/api/submit')">
  <input name="name" data-bind-name />
  <button type="submit">Submit</button>
</form>
```

### Client-Side Helper Functions

#### `patchSignals(signals)`

A client-side helper function that dispatches a `datastar-fetch` event to patch signals. This function is automatically available in the global scope when the datastar plugin is loaded.

```javascript
// Patch signals from client-side JavaScript
patchSignals({ count: 42, message: 'Hello' })

// Patch signals with complex data
patchSignals({
  user: { id: 123, name: 'John' },
  settings: { theme: 'dark' },
})
```

This function is particularly useful for:

- Updating signals from client-side event handlers
- Syncing state between different parts of your application
- Triggering signal updates from custom JavaScript code

#### `$clientId` Signal

The `$clientId` signal is automatically set when the realtime connection is established. This signal contains the unique client identifier assigned by PocketBase's realtime system.

```html
<!-- Display the client ID -->
<div data-text="$clientId"></div>

<!-- Use in conditional rendering -->
<div data-if="$clientId">
  Connected with ID: <span data-text="$clientId"></span>
</div>

<!-- Use in data attributes -->
<button data-on-click="@get('/api/action')" data-client-id="$clientId">
  Perform Action
</button>
```

The `$clientId` is useful for:

- Identifying the current client in realtime communications
- Debugging connection issues
- Creating client-specific functionality
- Tracking user sessions

## Event Types

- `datastar-patch-elements` - DOM element updates
- `datastar-patch-signals` - Signal updates

## Default Values

- `DefaultSseRetryDuration`: 1000ms
- `DefaultElementsUseViewTransitions`: false
- `DefaultPatchSignalsOnlyIfMissing`: false
- `DefaultElementPatchMode`: 'outer'
