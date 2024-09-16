# Loading Data in PocketPages

PocketPages provides a robust mechanism to load data dynamically before rendering your EJS templates using a special `+load.js` file. This file, when placed at any directory level, will be executed before any EJS template in that directory is rendered. Below, we'll explore how to use `+load.js`, demonstrate the module structure, and explain the execution flow with examples.

## The `+load.js` File

### Purpose

The `+load.js` file is designed to load or compute data that your EJS templates might need. The data returned by the loader function in `+load.js` will be made available to your EJS templates through the `data` property in the request context.

### Structure of `+load.js`

The `+load.js` file must use `module.exports` to export a loader function. This function will receive the request context as an argument and should return an object containing the data you wish to pass to the template.

### Example `+load.js` File

```javascript
module.exports = function (context) {
  // Perform data loading operations here
  const productId = context.params.productId

  // Example: Fetch product details from a database
  const productDetails = getProductDetails(productId)

  // Return an object containing the data
  return {
    product: productDetails,
  }
}
```

### How It Works

- **Execution**: When a request matches a route level with a `+load.js` file, the loader function in that file is executed.
- **Data Availability**: The returned object from the loader function is attached to the request context as `data`, making it accessible in the EJS templates.

## Example Scenario with Multiple `+load.js` Files

Consider the following directory structure:

```
pb_hooks/pages/
   +load.js
   index.ejs
   about/
      +load.js
      index.ejs
   products/
      +load.js
      [productId]/
         +load.js
         index.ejs
         details.ejs
   contact.ejs
```

### Loader Execution Scenarios

1. **Root Level Request (`/`)**:

   - **Files Involved**: `pb_hooks/pages/+load.js`, `pb_hooks/pages/index.ejs`
   - **Loader Executed**: The loader in `pages/+load.js` will execute when accessing the root URL (`/`). The data returned by this loader will be available in `pages/index.ejs`.

2. **About Page Request (`/about`)**:

   - **Files Involved**: `pb_hooks/pages/about/+load.js`, `pb_hooks/pages/about/index.ejs`
   - **Loader Executed**: The loader in `pages/about/+load.js` will execute when accessing `/about`. The data returned will be available in `about/index.ejs`.

3. **Products Page Request (`/products`)**:

   - **Files Involved**: `pb_hooks/pages/products/+load.js`, `pb_hooks/pages/products/index.ejs`
   - **Loader Executed**: The loader in `pages/products/+load.js` will execute when accessing `/products`. The data returned will be available in `products/index.ejs`.

4. **Product Details Request (`/products/123`)**:

   - **Files Involved**: `pb_hooks/pages/products/[productId]/+load.js`, `pb_hooks/pages/products/[productId]/index.ejs`
   - **Loader Executed**: The loader in `pages/products/[productId]/+load.js` will execute when accessing `/products/123`. The data returned will be available in `products/[productId]/index.ejs`.

5. **Product Details Specific Page (`/products/123/details`)**:

   - **Files Involved**: `pb_hooks/pages/products/[productId]/+load.js`, `pb_hooks/pages/products/[productId]/details.ejs`
   - **Loader Executed**: The same loader in `pages/products/[productId]/+load.js` will execute for both `index.ejs` and `details.ejs` under `[productId]`. Therefore, when accessing `/products/123/details`, this loader will still be executed, and its data will be available in `details.ejs`.

6. **Contact Page Request (`/contact`)**:
   - **Files Involved**: `pb_hooks/pages/contact.ejs`
   - **Loader Executed**: No loader is executed because there is no `+load.js` file in the `pages/` directory that directly corresponds to the `contact.ejs` file. The template will render without additional data loading.

### Key Points to Remember

- **Isolated Loaders**: Loaders in isolated directories (like `pages/about/+load.js`) only execute for requests that match the route corresponding to that directory (`/about` in this case).
- **Multiple EJS Files**: If you have multiple EJS files at the same directory level (like `index.ejs` and `details.ejs` in `products/[productId]/`), the same loader (`+load.js`) will be executed for any request that matches that directory.
- **No Loader Execution**: If there is no `+load.js` at the specific route level, no data loading will occur, and the EJS template will render as usual.
