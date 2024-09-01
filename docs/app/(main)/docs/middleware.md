# Using `+middleware.js` Files in PocketPages

PocketPages provides a flexible way to handle request processing and enhance the functionality of your application through the use of `+middleware.js` files. These files can be placed at any level within your directory structure and are executed in a top-down manner, from the root level down to the current route level. This guide will explain how `+middleware.js` files work and how to use them effectively in your PocketPages application.

## What is `+middleware.js`?

`+middleware.js` files allow you to define middleware functions that can intercept and modify requests before they reach your EJS templates. Unlike `+load.js`, which is executed only at the current route level, all `+middleware.js` files from the root level down to the current route level are executed in order. The results from these middleware functions are merged into the `data` object, with later results overriding earlier ones.

### Example Directory Structure

```plaintext
app/
  +middleware.js
  products/
    +middleware.js
    [productId]/
      +middleware.js
      index.ejs
```

### How Middleware Execution Works

1. **Root Level Middleware**: The `+middleware.js` file at the root level (`+middleware.js`) is executed first.
2. **Nested Middleware**: The `+middleware.js` file in the `products/` directory is executed next, and its results are merged with those from the root level.
3. **Deepest Level Middleware**: Finally, the `+middleware.js` file in the `[productId]/` directory is executed, with its results merging and potentially overriding earlier results.
4. **Merged Data**: The final merged data from all middleware files is available in the `data` object within your EJS templates.

### Example `+middleware.js` File

Here’s how you might define a `+middleware.js` file:

```javascript
module.exports = (context) => {
  const { params, header } = context

  // Example: Add a custom header to the response
  header('X-Custom-Header', 'CustomValue')

  // Example: Perform an auth check and add user info to the data
  if (!context.authenticated) {
    return {
      error: 'User not authenticated',
    }
  }

  return {
    user: context.user,
    requestId: context.request.id,
  }
}
```

### How It Works:

- **Custom Headers**: The middleware can modify the response headers using `header('X-Custom-Header', 'CustomValue')`.
- **Authentication Checks**: Middleware can perform authentication checks and include user information in the `data` object if the user is authenticated.
- **Returning Data**: The object returned by the middleware is merged into the `data` object, making it available in the EJS templates.

### Throwing Errors in Middleware

In addition to returning data, you can also throw errors in your middleware to handle invalid requests or stop further execution. PocketPages supports throwing a special type of error, `BadRequestError`, which will immediately halt the execution of all middleware and end the request.

### Example: Throwing a `BadRequestError`

```javascript
const { BadRequestError } = require('pocketbase')

module.exports = (context) => {
  const { params } = context

  // Example: Validate a query parameter
  if (!params.requiredParam) {
    throw new BadRequestError('Missing required query parameter')
  }

  return {}
}
```

### How It Works:

- **Error Handling**: When a `BadRequestError` is thrown, all further execution is stopped, and the request is ended with an appropriate error response. This is useful for validating incoming requests and ensuring they meet the necessary criteria before proceeding.

## Use Cases for `+middleware.js`

### 1. Authentication Guards

You can use `+middleware.js` to enforce authentication across different levels of your application. For example, a root-level middleware could check if the user is logged in, while a nested middleware could enforce additional role-based access control for specific routes.

```javascript
module.exports = (context) => {
  const { header } = context

  if (!context.authenticated) {
    header('Content-Type', 'application/json')
    return { error: 'Unauthorized access' }
  }

  return {
    user: context.user,
  }
}
```

### 2. Response Header Modification

Middleware can be used to set or modify HTTP headers for your responses. For example, you might want to add security headers or custom tracking headers.

```javascript
module.exports = (context) => {
  const { header } = context

  header('X-Frame-Options', 'DENY')
  header('X-Content-Type-Options', 'nosniff')

  return {}
}
```

### 3. Data Preprocessing

You can use middleware to preprocess or load data that is common across multiple routes. For example, loading user preferences or global settings at the root level and more specific data at deeper levels.

```javascript
module.exports = (context) => {
  return {
    globalSettings: getGlobalSettings(),
  }
}
```

### 4. Request Validation

By throwing a `BadRequestError` in your middleware, you can enforce strict validation rules for incoming requests, ensuring that all necessary parameters are present and valid before proceeding with the request.

```javascript
const { BadRequestError } = require('pocketbase')

module.exports = (context) => {
  const { params } = context

  // Validate required parameters
  if (!params.requiredParam) {
    throw new BadRequestError('Missing required query parameter')
  }

  return {}
}
```

## Summary

`+middleware.js` files in PocketPages provide a powerful way to handle request processing across different levels of your application. By placing `+middleware.js` files at various levels in your directory structure, you can implement features like authentication guards, header modifications, data preprocessing, and request validation. Middleware functions are executed from the root level down to the current route level, with their results merged into the `data` object. Additionally, you can throw a `BadRequestError` to immediately stop execution and return an error response, allowing for robust and flexible request handling in your PocketPages application.
