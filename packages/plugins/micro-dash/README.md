# Micro Dash Plugin

The Micro Dash plugin (`pocketpages-plugin-micro-dash`) provides a set of lightweight utility functions for data manipulation, based on the `@s-libs/micro-dash` library.

## Installation

```bash
npm install pocketpages-plugin-micro-dash
```

## Configuration

Add the plugin to your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    'pocketpages-plugin-micro-dash',
    // ... other plugins
  ],
}
```

## Available Functions

The plugin adds several utility functions to the global context:

```typescript
// Collection Operations
function forEach<T>(
  collection: T[],
  iteratee: (value: T, key: number) => void
): void
function keys(object: object): string[]
function values<T>(object: { [key: string]: T }): T[]

// Object Operations
function merge(...objects: object[]): object
function pick<T extends object>(object: T, ...props: string[]): Partial<T>

// Array Operations
function shuffle<T>(array: T[]): T[]
```

## Usage Examples

### Collection Operations

```ejs
<%%
  // Iterate over arrays or objects
  forEach([1, 2, 3], (value) => {
    echo(value)
  })

  // Get object keys
  const obj = { a: 1, b: 2 }
  const objKeys = keys(obj) // ['a', 'b']

  // Get object values
  const objValues = values(obj) // [1, 2]
%>
```

### Object Operations

```ejs
<%%
  // Merge objects
  const merged = merge(
    { a: 1 },
    { b: 2 },
    { c: 3 }
  ) // { a: 1, b: 2, c: 3 }

  // Pick specific properties
  const user = {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    password: 'secret'
  }
  const safeUser = pick(user, 'id', 'name', 'email')
%>
```

### Array Operations

```ejs
<%%
  // Shuffle an array
  const numbers = [1, 2, 3, 4, 5]
  const shuffled = shuffle(numbers)
%>
```

## Performance

The micro-dash functions are optimized for size and performance, making them ideal for server-side use in the JSVM environment. They provide a subset of Lodash functionality without the full library overhead.

## Type Safety

All functions are fully typed and provide TypeScript support out of the box:

```typescript
interface User {
  id: number
  name: string
  email: string
}

// Types are preserved
const users: User[] = [
  /*...*/
]
forEach(users, (user: User) => {
  // user is properly typed
})

const userObj: User = {
  /*...*/
}
const partial = pick(userObj, 'id', 'name')
// partial is Partial<Pick<User, 'id' | 'name'>>
```
