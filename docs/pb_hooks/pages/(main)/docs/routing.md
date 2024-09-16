# File-Based Routing in PocketPages

PocketPages supports file-based routing, allowing you to create a clean and intuitive URL structure directly from your file and folder organization. This guide will discuss how to set up file-based routing using a nested directory structure, ensuring your application's URLs align with the layout of your EJS files.

<!-- TOC -->

- [Understanding File-Based Routing](#understanding-file-based-routing)
  - [Basic Example](#basic-example)
  - [How the Routing Works](#how-the-routing-works)
  - [Special Cases - index.ejs](#special-cases---indexejs)
  - [Example Directory and Routes](#example-directory-and-routes)
- [Tips for Structuring Your Routes](#tips-for-structuring-your-routes)
  - [PocketPages Routing Priority](#pocketpages-routing-priority)
    - [Example Scenario](#example-scenario)
  - [Key Points](#key-points)
- [Trailing Slash Redirects for index Files](#trailing-slash-redirects-for-index-files)
  - [Example Scenario](#example-scenario)
  - [Why This Matters](#why-this-matters)
  - [Practical Example](#practical-example)
- [Summary](#summary)

<!-- /TOC -->

## Understanding File-Based Routing

File-based routing means that the URLs in your application are automatically determined by the file and folder structure within the `pb_hooks/pages/` directory. Each `.ejs` file corresponds to a unique route, and the nested folders reflect URL paths.

### Basic Example

Consider the following directory structure:

```
pb_hooks/
  pages/
    about.ejs
    contact.ejs
    index.ejs
    products/
      details.ejs
      index.ejs
      reviews/
        index.ejs
        latest.ejs
```

### How the Routing Works

- **Root-Level Routing**:

  - `index.ejs` at the root level (`pb_hooks/pages/index.ejs`) is served at the root URL `/`.
  - Other root-level `.ejs` files like `about.ejs` and `contact.ejs` are served at `/about` and `/contact`, respectively.

- **Nested Routing**:

  - The `products/` folder represents the `/products` URL path.
  - `products/index.ejs` is served at `/products`. If no other file in the `products/` directory matches the URL, this `index.ejs` file is used by default.
  - `products/details.ejs` is served at `/products/details`.

- **Deeper Nesting**:
  - The `reviews/` folder inside `products/` represents the `/products/reviews` path.
  - `products/reviews/index.ejs` is served at `/products/reviews`.
  - `products/reviews/latest.ejs` is served at `/products/reviews/latest`.

### Special Cases - `index.ejs`

As mentioned, `index.ejs` files have a special role:

- **Default Route Handling**: If a user visits a path like `/products` and there is an `index.ejs` file within that folder (`pb_hooks/pages/products/index.ejs`), this file will be served without the need for specifying `/products/index` in the URL.
- **Root Page**: The `index.ejs` at the root of `pb_hooks/pages/` serves as the homepage (`/`).

### Example Directory and Routes

Let’s break down the example directory structure with corresponding routes:

- **Root Level**

  - `pb_hooks/pages/index.ejs` -> `/`
  - `pb_hooks/pages/about.ejs` -> `/about`
  - `pb_hooks/pages/contact.ejs` -> `/contact`

- **Products**
  - `pb_hooks/pages/products/index.ejs` -> `/products`
  - `pb_hooks/pages/products/details.ejs` -> `/products/details`
  - `pb_hooks/pages/products/reviews/index.ejs` -> `/products/reviews`
  - `pb_hooks/pages/products/reviews/latest.ejs` -> `/products/reviews/latest`

## Tips for Structuring Your Routes

1. **Keep It Organized**: Reflect the logical structure of your application within your directory layout. For example, if you have sections of your site dedicated to products, services, and contact information, create corresponding folders in `pb_hooks/pages/`.

2. **Use `index.ejs` for Default Pages**: Utilize `index.ejs` within any folder to create a default route for that path. This helps simplify URLs, making them more user-friendly.

3. **Deep Nesting for Complex Structures**: For applications with more complex navigation, use deep nesting. Ensure that each folder only contains related pages to maintain clarity in your routes.

4. **Avoid Over-Nesting**: While nesting is powerful, avoid creating unnecessarily deep structures. This can lead to cumbersome URLs that are hard to navigate and remember.

### PocketPages Routing Priority

In PocketPages, the routing system is designed to take precedence over any default PocketBase routes and static files served from the `pb_public/` directory. This means that if a route or file exists both in PocketPages and PocketBase, the PocketPages route will be served instead.

This behavior occurs because the PocketPages middleware runs first, ensuring that your custom routes, dynamic content, and EJS templates are always prioritized over default PocketBase routes or static content.

#### Example Scenario

- **PocketPages Route**: You have an EJS file located at `about/index.ejs`.
- **PocketBase Route**: There is a static HTML file located at `pb_public/about.html`.

When a request is made to `/about`, the PocketPages route (`index.ejs`) will be served, even though there is a static file in `pb_public/`.

### Key Points

- **Middleware Execution Order**: The PocketPages middleware is executed before PocketBase handles any routes or serves static files, ensuring your PocketPages routes always take priority.
- **Routing Conflicts**: If you have a route defined in both PocketPages and PocketBase, the PocketPages version will be served.

This routing priority ensures that your custom logic and dynamic content in PocketPages are always prioritized, giving you full control over the routing and content delivery in your application.

## Trailing Slash Redirects for index Files

In PocketPages, any route endpoint that resolves to an `index` (of any extension) will automatically be redirected to use a trailing slash (`/`). This redirection ensures that sibling files can be loaded using relative paths from the browser URL.

### Example Scenario

- **Without Trailing Slash**: If you navigate to `/foo`, which corresponds to `/pb_hooks/pages/foo/index.ejs`, the browser might try to load sibling resources with absolute paths, like `/foo/bar.ejs`. This can cause issues if you're relying on relative paths in your EJS templates.

- **With Trailing Slash**: When `/pb_hooks/pages/foo/index.ejs` is accessed, it will automatically redirect to `/foo/`. This allows you to load sibling files like `/pb_hooks/pages/foo/bar.ejs` or resources such as `/pb_hooks/pages/foo/image.png` using relative paths directly from `/foo/index.ejs`.

### Why This Matters

This trailing slash behavior is crucial for maintaining consistent and predictable file loading. For example:

- **EJS Template**: If `/pb_hooks/pages/foo/index.ejs` includes an image file, you can reference it with a relative path:

  ```html
  <img src="image.png" />
  ```

- **Expected Behavior**: With the redirect to `/foo/`, this relative path correctly resolves to `/pb_hooks/pages/foo/image.png`, simplifying resource management.

### Practical Example

Consider the following files in your `pb_hooks/pages/` directory:

```
pb_hooks/
  pages/
    foo/
      index.ejs
      bar.ejs
      image.png
```

When you visit `/foo`, it will redirect to `/foo/`. As a result:

- `/foo/` serves `index.ejs`
- Relative paths like `<img src="image.png" />` within `index.ejs` resolve correctly to `/foo/image.png`.
- Sibling files like `bar.ejs` can be accessed via `/foo/bar`.

This behavior ensures that your URLs remain clean and logical while maintaining the ability to use relative paths within your EJS templates efficiently.
