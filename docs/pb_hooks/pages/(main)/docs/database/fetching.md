# Fetching Records

The request context provides convenient methods for querying records from your PocketBase collections using filters.

## FilterOptions Type

The `FilterOptions` type defines the structure for filtering and pagination parameters:

```typescript
type FilterOptions = {
  filter?: string // Filter query expression (defaults to '1=1')
  sort?: string // Sort expression (e.g., '-created,title')
  limit?: number // Maximum number of records to return
  offset?: number // Number of records to skip
  filterParams?: Record<string, string> // Named parameters for the filter query
}
```

## `findRecordsByFilter`

- **Type**: `(collection: string, options?: Partial<FilterOptions>) => any[]`
- **Description**: Retrieves multiple records from a collection based on the provided filter options.
- **Parameters**:
  - `collection`: The name of the collection to query
  - `options`: Optional filter options (see `FilterOptions` type)
- **Returns**: An array of matching records, or an empty array if none found

## `findRecordByFilter`

- **Type**: `(collection: string, options?: Partial<FilterOptions>) => any`
- **Description**: Retrieves a single record from a collection based on the provided filter options. This is a convenience method that returns the first record from `findRecordsByFilter`.
- **Parameters**:
  - `collection`: The name of the collection to query
  - `options`: Optional filter options (see `FilterOptions` type)
- **Returns**: The first matching record, or undefined if none found

## Example Usage:

```ejs
<%%
  // Find all active users, sorted by creation date
  const activeUsers = findRecordsByFilter('users', {
    filter: 'active = true',
    sort: '-created'
  });

  // Find a specific user by email
  const user = findRecordByFilter('users', {
    filter: 'email = {:email}',
    filterParams: { email: 'user@example.com' }
  });

  // Find records with pagination
  const paginatedPosts = findRecordsByFilter('posts', {
    filter: 'status = "published"',
    sort: '-created',
    limit: 10,
    offset: 20  // Skip first 20 records
  });
%>

<h2>Active Users</h2>
<ul>
  <%% activeUsers.forEach(user => { %>
    <li><%%= user.name %></li>
  <%% }); %>
</ul>

<%% if (user) { %>
  <h2>Found User</h2>
  <p>Name: <%%= user.name %></p>
  <p>Email: <%%= user.email %></p>
<%% } %>
```
