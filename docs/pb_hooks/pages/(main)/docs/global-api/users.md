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
const user = createUser('user@example.com', 'password123')
```

### Parameters

- `email` (string): User's email address
- `password` (string): User's password

### Returns

Returns the created user object.

### Error Handling

Throws an error if:

- Email is empty or only whitespace
- Password is empty or only whitespace

## createAnonymousUser()

Creates a user with randomly generated credentials.

```javascript
const { user, email, password } = createAnonymousUser()
```

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

## Security Notes

- Passwords are automatically hashed by PocketBase
- Anonymous users are real users with random credentials
- Consider implementing cleanup for anonymous users
