---
title: User Management Functions
description: Create regular and anonymous users in PocketPages applications
---

# User Management Functions

PocketPages provides two helper functions for creating users:

- `createUser()` - Create a regular user account
- `createAnonymousUser()` - Create an anonymous user account

## createUser()

Creates a new user with the specified email and password.

```javascript
// Create user in default 'users' collection
const user = createUser('user@example.com', 'password123')

// Create user in custom collection
const user = createUser('user@example.com', 'password123', {
  collection: 'customers',
})
```

### Parameters

- `email` (string): User's email address
- `password` (string): User's password
- `options` (optional): Authentication options
  - `collection` (string): Collection name for the user (defaults to 'users')

### Returns

Returns the created user object.

### Error Handling

Throws an error if:

- Email is empty or only whitespace
- Password is empty or only whitespace

## createAnonymousUser()

Creates a user with randomly generated credentials.

```javascript
// Create anonymous user in default 'users' collection
const { user, email, password } = createAnonymousUser()

// Create anonymous user in custom collection
const { user, email, password } = createAnonymousUser({
  collection: 'customers',
})
```

### Parameters

- `options` (optional): Authentication options
  - `collection` (string): Collection name for the user (defaults to 'users')

### Returns

Returns an object containing:

- `user`: The created user object
- `email`: Generated email (format: `anonymous-[numbers]@example.com`)
- `password`: Generated password

## Template Usage

```ejs
<%%
  // Create regular user
  try {
    const user = createUser('test@example.com', 'password123')
    info('Created user:', user.id)
  } catch (e) {
    error('Failed to create user:', e)
  }

  // Create user in custom collection
  const user = createUser('test@example.com', 'password123', {
    collection: 'customers'
  })

  // Create anonymous user
  const { user: anonUser } = createAnonymousUser()
  info('Created anonymous user:', anonUser.id)
%>
```

## Best Practices

1. **Error Handling**

```javascript
try {
  const user = createUser(email, password)
  // Handle success
} catch (e) {
  error('User creation failed:', e)
  // Handle error
}
```

2. **Anonymous Users**

```javascript
// Store credentials if needed
const { user, email, password } = createAnonymousUser()
// Save email/password for later authentication
```

3. **Custom Collections**

```javascript
// Use consistent collection names
const options = { collection: 'customers' }
const user = createUser(email, password, options)
const anonUser = createAnonymousUser(options)
```

## Security Notes

- Passwords are automatically hashed by PocketBase
- Anonymous users are real users with random credentials
- Consider implementing cleanup for anonymous users
- Collection permissions still apply to user creation
