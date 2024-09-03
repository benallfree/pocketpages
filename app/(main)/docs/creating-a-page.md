# Creating a PocketPages Page

PocketPages allows you to create dynamic pages for your application using EJS templating. Below are the steps and guidelines to create a page that will be served by PocketPages.

## Directory Structure

All PocketPages must reside within the `app/` directory of your project. This is the designated location where PocketPages looks for pages to serve.

### Example Structure:

```
app/
  pb_hooks/
    pages/
      index.ejs
      about.ejs
      contact.ejs
      products/
        index.ejs
        details.ejs
```

## Creating Pages

1. **Create an EJS File**: Inside the `app/` directory, create an `.ejs` file. This file will represent the page that you want to serve.

   - For example, to create an "About" page, you would create a file named `about.ejs` in `app/`.

2. **Special Case - `index.ejs`**: The `index.ejs` file has a special role at any directory level.

   - At the root level, `index.ejs` will be served as the root page of your PocketPages application. You do not need to specify the filename in the URL; simply navigating to `/` will render `index.ejs`.
   - If you place an `index.ejs` file inside a subdirectory (e.g., `app/products/index.ejs`), it will serve as the default page for that directory level. Navigating to `/products` will render `products/index.ejs` if no other file in that directory matches the route.

3. **Serving Pages**: Any `.ejs` file within `app/` can be served directly. The name of the file (minus the `.ejs` extension) will correspond to the URL path.

   - For example, if you have a file `contact.ejs` in `app/`, it will be served at `/contact`.

4. **Nested Pages**: You can organize your pages into subdirectories. The routing will follow the directory structure. If no specific file matches the route, an `index.ejs` in the corresponding directory will be served.

### Example:

- `app/index.ejs` -> Accessible at `/`
- `app/about.ejs` -> Accessible at `/about`
- `app/contact.ejs` -> Accessible at `/contact`
- `app/products/index.ejs` -> Accessible at `/products`
- `app/products/details.ejs` -> Accessible at `/products/details`

## Summary

To create a PocketPages page:

1. Place your `.ejs` files in the `pages/` directory.
2. Use `index.ejs` for your home page or for default pages at any directory level, which will be served at the root URL or at the corresponding directory path.
3. Any other `.ejs` files will be served at their corresponding paths.

By following these guidelines, you can easily create and manage the dynamic pages of your PocketPages application, with `index.ejs` serving as a flexible default page at any directory level.
