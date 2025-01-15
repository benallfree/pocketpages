---
title: Database Query Helpers
description: Query PocketBase collections using findRecordByFilter and findRecordsByFilter helpers.
---

# Database Query Helpers

PocketPages provides two helper functions for querying your PocketBase collections:

- `findRecordsByFilter()` - Get multiple records
- `findRecordByFilter()` - Get a single record

Both functions are available globally and through the API object.

## Basic Usage

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter, findRecordByFilter } = api

  // Get multiple records
  const posts = findRecordsByFilter('posts', {
    filter: 'published = true',
    sort: '-created',
  })

  // Get single record
  const featuredPost = findRecordByFilter('posts', {
    filter: 'featured = true',
  })

  return { posts, featuredPost }
}
```

## Filter Options

Both functions accept a `FilterOptions` object:

```typescript
type FilterOptions = {
  filter?: string // Filter query (default: '1=1')
  sort?: string // Sort expression
  limit?: number // Max records to return
  offset?: number // Records to skip
  filterParams?: Record<string, string> // Named parameters
}
```

## Common Queries

### Basic Filtering

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter } = api

  const activeUsers = findRecordsByFilter('users', {
    filter: 'active = true',
    sort: '-created',
  })

  return { activeUsers }
}
```

### Using Parameters

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordByFilter } = api

  const user = findRecordByFilter('users', {
    filter: 'email = {:email}',
    filterParams: { email: 'user@example.com' },
  })

  return { user }
}
```

### Pagination

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { findRecordsByFilter } = api

  const posts = findRecordsByFilter('posts', {
    filter: 'published = true',
    sort: '-created',
    limit: 10,
    offset: 20, // Skip first 20
  })

  return { posts }
}
```

## Template Usage

### Basic Example

```ejs
<!-- Using global helper -->
<%% const users = findRecordsByFilter('users') %>

<ul>
  <%% users.forEach(user => { %>
    <li><%%= user.name %></li>
  <%% }) %>
</ul>
```

### Complete Example

```ejs
<%%
const { findRecordsByFilter, findRecordByFilter } = api

// Get featured post
const featured = findRecordByFilter('posts', {
  filter: 'featured = true'
})

// Get recent posts
const recent = findRecordsByFilter('posts', {
  filter: 'published = true',
  sort: '-created',
  limit: 5
})
%>

<!-- Featured Post -->
<%% if (featured) { %>
  <article class="featured">
    <h1><%%= featured.title %></h1>
    <p><%%= featured.excerpt %></p>
  </article>
<%% } %>

<!-- Recent Posts -->
<section class="recent">
  <h2>Recent Posts</h2>
  <%% recent.forEach(post => { %>
    <article>
      <h3><%%= post.title %></h3>
      <time><%%= post.created %></time>
    </article>
  <%% }) %>
</section>
```

## Best Practices

1. **Use Parameters**

   ```javascript
   // Good: Safe from injection
   findRecordByFilter('users', {
     filter: 'id = {:id}',
     filterParams: { id },
   })

   // Bad: Potential injection risk
   findRecordByFilter('users', {
     filter: `id = "${id}"`,
   })
   ```

2. **Limit Results**

   ```javascript
   // Good: Limited query
   findRecordsByFilter('posts', {
     limit: 10,
   })

   // Bad: Could return too many
   findRecordsByFilter('posts')
   ```

3. **Efficient Filtering**

   ```javascript
   // Good: Specific filter
   findRecordsByFilter('posts', {
     filter: 'status = "published"',
   })

   // Bad: Filter in code
   findRecordsByFilter('posts').filter((p) => p.status === 'published')
   ```

## Important Notes

- Queries execute synchronously
- Returns plain objects (JSON-safe)
- Use filterParams for safety
- Consider pagination for large sets
- Results are cached per request

## Reference

- [PocketBase Filter Syntax](https://pocketbase.io/docs-next/filtering)
- [API Documentation](/docs-next/api)
- [Loading Data Guide](/docs-next/loading-data)
