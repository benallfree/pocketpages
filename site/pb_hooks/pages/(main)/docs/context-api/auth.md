---
title: Auth Context API
description: Learn how to work with the authenticated user record in PocketPages templates
---

# Auth Context API

The `request.auth` property provides access to the currently authenticated user's record. When a user is authenticated (see [Authentication](/docs/authentication)), this property contains a [core.Record](https://pocketbase.io/jsvm/interfaces/core.Record.html#email) instance with the user's data.

## Checking Authentication Status

```ejs
<%% if (request.auth) { %>
  <!-- User is authenticated -->
<%% } else { %>
  <!-- No authenticated user -->
<%% } %>
```

## Record Methods

### Basic Data Access

```ejs
<!-- Get field values -->
<%%= request.auth.get('email') %>
<%%= request.auth.get('username') %>
<%%= request.auth.get('name') %>

<!-- Check if field exists -->
<%% if (request.auth.has('avatar')) { %>
  <img src="<%%= request.auth.get('avatar') %>">
<%% } %>
```

### Authentication Status

```ejs
<!-- Check email verification -->
<%% if (request.auth.verified()) { %>
  <span class="verified">✓</span>
<%% } %>

<!-- Check admin status -->
<%% if (request.auth.isSuperuser()) { %>
  <a href="/admin">Admin Panel</a>
<%% } %>
```

### Collection Access

```ejs
<!-- Get user's collection -->
<%% const collection = request.auth.collection() %>
<%%= collection.name %>

<!-- Get creation date -->
<%%= request.auth.created %>

<!-- Get last update -->
<%%= request.auth.updated %>
```

## Type Definition

The auth record implements the `core.Record` interface:

```typescript
interface Record {
  id: string
  created: string
  updated: string

  // Data access
  get(field: string): any
  set(field: string, value: any): void
  has(field: string): boolean

  // Auth specific
  verified(): boolean
  isSuperuser(): boolean
  collection(): Collection

  // ... other methods
}
```

## Common Use Cases

### Profile Data

```ejs
<!-- User profile example -->
<div class="profile">
  <h2><%%= request.auth.get('name') %></h2>

  <%% if (request.auth.has('avatar')) { %>
    <img src="<%%= request.auth.get('avatar') %>">
  <%% } %>

  <dl>
    <dt>Email</dt>
    <dd>
      <%%= request.auth.get('email') %>
      <%% if (request.auth.verified()) { %>
        <span title="Verified">✓</span>
      <%% } %>
    </dd>

    <dt>Member Since</dt>
    <dd><%%= request.auth.created %></dd>
  </dl>
</div>
```

### Access Control

```ejs
<!-- Role-based access control -->
<%% if (request.auth) { %>
  <%% if (request.auth.isSuperuser()) { %>
    <!-- Admin content -->
  <%% } else if (request.auth.get('role') === 'editor') { %>
    <!-- Editor content -->
  <%% } else { %>
    <!-- Regular user content -->
  <%% } %>
<%% } %>
```

### Custom Fields

```ejs
<!-- Working with custom fields -->
<%% if (request.auth.has('preferences')) { %>
  <%% const prefs = request.auth.get('preferences') %>

  <%% if (prefs.darkMode) { %>
    <link rel="stylesheet" href="<%%= asset('css/dark.css') %>">
  <%% } %>
<%% } %>
```

## Related Topics

- [Authentication Guide](/docs/authentication)
- [Request Context](/docs/context-api/request)
- [PocketBase Auth Documentation](https://pocketbase.io/docs/authentication)
