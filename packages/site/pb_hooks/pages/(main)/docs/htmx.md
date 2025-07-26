---
title: 'HTMX Integration'
description: 'Learn how to effectively use HTMX with PocketPages, including route organization, partial responses, and best practices for dynamic web applications.'
---

# HTMX Integration with PocketPages

HTMX is a powerful library that allows you to access modern browser features directly from HTML, making it an excellent choice for building dynamic web applications with PocketPages. This guide will show you how to effectively integrate HTMX with PocketPages.

## Setting Up HTMX

1. Add HTMX and the SSE extension to your layout file:

```html
<script src="https://unpkg.com/htmx.org@1.9.10"></script>
<script src="https://unpkg.com/pocketbase-htmx-ext-sse"></script>
```

2. Enable the required plugins in your `+config.js`:

```javascript
module.exports = {
  plugins: ['pocketpages-plugin-ejs', 'pocketpages-plugin-realtime'],
}
```

## Route Organization

When working with HTMX, it's crucial to properly organize your routes to separate full pages from partial responses. Here's the recommended structure:

```
pb_hooks/
  pages/
    (site)/           # Pages with layouts
      +layout.ejs     # Main site layout
      index.ejs       # Home page
      products/
        index.ejs     # Products listing
    xapi/             # HTMX API endpoints (no layouts)
      products/
        search.ejs    # Returns product search results
        create.ejs    # Handles product creation
```

### Why This Structure?

1. The `(site)` directory contains full pages that inherit layouts
2. The `xapi` directory contains API endpoints that return raw HTML without layouts
3. This separation prevents HTMX responses from being wrapped in unnecessary layout markup

## Using the HTMX Starter Kit

PocketPages provides an HTMX starter kit that includes a basic setup with examples. You can create a new project using:

```bash
cp -r node_modules/pocketpages/starters/htmx .
```

The starter kit includes:

- Proper route organization with `(site)` and `xapi` directories
- Example HTMX interactions
- Basic layout structure
- Common patterns and best practices

## Managing Partials with HTMX

When building HTMX applications, you often need to render the same HTML fragment both in the initial page load and in HTMX responses. Instead of duplicating the HTML, use partials stored in the `_private` directory.

### Recommended Structure

```
pb_hooks/
  pages/
    _private/
      product-card.ejs    # Shared partial
    (site)/
      products/
        index.ejs         # Full page that includes the partial
    xapi/
      products/
        load.ejs         # HTMX endpoint that includes the same partial
```

### Example Implementation

```html
<!-- pages/_private/product-card.ejs -->
<div class="product-card" id="product-<%%= product.id %>">
  <h3><%%= product.name %></h3>
  <p><%%= product.description %></p>
  <button
    hx-delete="/xapi/products/delete/<%%= product.id %>"
    hx-target="closest .product-card"
    hx-swap="outerHTML"
  >
    Delete
  </button>
</div>
```

```html
<!-- pages/(site)/products/index.ejs -->
<div class="products-container">
  <%% products.forEach(product => { %> <%%- include('/_private/product-card', {
  product }) %> <%% }) %>

  <button
    hx-get="/xapi/products/load"
    hx-target=".products-container"
    hx-swap="beforeend"
  >
    Load More
  </button>
</div>
```

```html
<!-- pages/xapi/products/load.ejs -->
<%% products.items.forEach(product => { %> <%%-include('/_private/product-card',
{ product }) %> <%% }) %>
```

### Benefits of Using Partials

1. **DRY (Don't Repeat Yourself)**

   - Maintain HTML fragments in a single location
   - Changes to the partial automatically apply everywhere it's used

2. **Consistency**

   - Ensure the same HTML structure is used for both initial render and HTMX updates
   - Maintain consistent styling and behavior

3. **Maintainability**

   - Single source of truth for component markup
   - Easier to update and refactor

4. **Performance**
   - Partials are cached by PocketPages
   - Reduced risk of inconsistencies between initial and dynamic content

### Best Practices for Partials

1. **Naming Convention**

   - Use descriptive names that reflect the component's purpose
   - Consider prefixing with component type (e.g., `card-`, `list-`, `form-`)

2. **Scope**

   - Keep partials focused on a single responsibility
   - Pass only necessary data through the include parameters

3. **Organization**

   - Group related partials in subdirectories within `_private`
   - Consider creating an index file documenting available partials

4. **Documentation**
   - Comment expected parameters at the top of each partial
   - Include example usage if the partial is complex

## Basic Example: Dynamic Content Loading

Here's a simple example of loading content dynamically:

```html
<!-- pages/(site)/index.ejs -->
<div>
  <h1>Product Search</h1>
  <input
    type="search"
    name="search"
    hx-get="/xapi/products/search"
    hx-trigger="input changed delay:500ms"
    hx-target="#search-results"
    placeholder="Search products..."
  />
  <div id="search-results"></div>
</div>
```

```html
<!-- pages/xapi/products/search.ejs -->
<div class="search-results">
  <%% products.forEach(product => { %>
  <div class="product-card">
    <h3><%%= product.name %></h3>
    <p><%%= product.description %></p>
  </div>
  <%% }) %>
</div>
```

## Forms and Mutations

HTMX makes it easy to handle form submissions with partial page updates:

```html
<!-- pages/(site)/products/index.ejs -->
<div>
  <button hx-get="/xapi/products/create-form" hx-target="#form-container">
    Add Product
  </button>
  <div id="form-container"></div>
  <div id="products-list"></div>
</div>
```

```html
<!-- pages/xapi/products/create-form.ejs -->
<form
  hx-post="/xapi/products/create"
  hx-target="#products-list"
  hx-swap="beforeend"
>
  <input type="text" name="name" placeholder="Product Name" required />
  <textarea name="description" placeholder="Description" required></textarea>
  <button type="submit">Create Product</button>
</form>
```

```html
<!-- pages/xapi/products/create.ejs -->
<div class="product-card" id="product-<%%= product.id %>">
  <h3><%%= product.name %></h3>
  <p><%%= product.description %></p>
</div>
```

## Best Practices

1. **Route Organization**

   - Keep API endpoints in `xapi/` to avoid layout inheritance
   - Use meaningful route names that reflect the action being performed

2. **Response Size**

   - Return only the necessary HTML in HTMX responses
   - Use targeted updates instead of replacing large sections of the page

3. **Error Handling**

   ```html
   <form
     hx-post="/xapi/products/create"
     hx-target="#result"
     hx-swap="innerHTML"
     hx-error-class="error"
   >
     <!-- form content -->
   </form>
   ```

4. **Loading States**

   ```html
   <button
     hx-get="/xapi/products/load"
     hx-target="#content"
     class="button"
     hx-indicator="#spinner"
   >
     Load Products
   </button>
   <div id="spinner" class="htmx-indicator">Loading...</div>
   ```

## Advanced Techniques

### Out-of-Band Updates

Update multiple elements on the page with a single request:

```html
<!-- pages/xapi/products/create.ejs -->
<div id="main-content">
  <!-- Main response content -->
</div>

<div id="product-count" hx-swap-oob="true"><%%= productCount %> Products</div>
```

### Polling for Updates

Implement real-time updates with polling:

```html
<div
  hx-get="/xapi/products/latest"
  hx-trigger="every 30s"
  hx-target="#latest-products"
>
  <!-- Content will refresh every 30 seconds -->
</div>
```

## Security Considerations

1. **CSRF Protection**

   - Implement CSRF tokens for POST/PUT/DELETE requests
   - Use PocketBase's built-in authentication

2. **Input Validation**

   - Always validate input on both client and server side
   - Sanitize HTML content before rendering

3. **Rate Limiting**
   - Implement rate limiting for API endpoints. Recent versions of PocketBase include rate limiting. PocketHost and Cloudflare also include rate limiting.
   - Use appropriate debounce/throttle on HTMX triggers

## Realtime Updates with SSE

PocketPages provides Server-Sent Events (SSE) integration with HTMX for realtime updates. Here's how to use it:

### Basic Chat Example

```html
<!-- pages/(site)/index.ejs -->
<div hx-ext="pocketbase-sse">
  <div sse-swap="chat" hx-swap="beforeend">
    <!-- Content from SSE will be appended here -->
  </div>
</div>

<form
  hx-post="/api/chat"
  hx-swap="none"
  hx-on::after-request="if(event.detail.successful) { this.reset(); }"
>
  <input type="text" name="message" />
  <button type="submit">Send</button>
</form>
```

```ejs
<!-- pages/api/chat.ejs -->
<%%
  const { message } = body()
  realtime.send('chat')
%>
<div>
  <%%= message %>
</div>
```

### How SSE Works

1. **Server-Side Events**

   - The `realtime.send(topic, message)` function broadcasts rendered content to all subscribers
   - Multiple clients can receive updates simultaneously

2. **Client-Side Reception**
   - The `hx-ext="pocketbase-sse"` attribute enables SSE support
   - `sse-swap="topic"` subscribes to a specific topic
   - `hx-swap` determines how updates are inserted (e.g., `beforeend`, `innerHTML`)

### Example: Realtime Counter

```ejs
<!-- pages/(site)/index.ejs -->
<button hx-get="/api/count">
  <%%- include('count.ejs') %>
</button>

<!-- pages/_private/count.ejs -->
<b><%%= store('count')||1 %></b>

<!-- pages/api/count.ejs -->
<%%
  $app.runInTransaction(() => {
    store('count', (store('count') || 1) + 1)
  })
%>
<%%- include('count.ejs') %>
```

### Best Practices for Realtime

1. **Topic Management**

   - Use descriptive topic names (e.g., `chat`, `notifications`)
   - Consider namespacing for different features (`user:123:notifications`)
   - Keep topics focused and specific

2. **Performance**

   - Send minimal HTML updates
   - Use appropriate swap strategies
   - Consider debouncing frequent updates
   - Use transactions for atomic operations

3. **Error Handling**

   - Implement reconnection logic
   - Provide feedback for connection status
   - Handle failed updates gracefully
   - Log errors appropriately

4. **Security**
   - Validate user permissions before sending updates
   - Sanitize content before broadcasting
   - Implement rate limiting for message sending
   - Use appropriate CSRF protection
