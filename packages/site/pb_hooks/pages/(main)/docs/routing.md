---
title: 'File-Based Routing'
description: 'File-based routing maps URLs to EJS files in pb_hooks/pages/. Files and folders create corresponding routes, index.ejs serves as default page, nested directories create sub-routes, and trailing slashes redirect for index files to enable relative path loading.'
---

# File-Based Routing in PocketPages

PocketPages supports file-based routing, allowing you to create a clean and intuitive URL structure directly from your file and folder organization. This guide will discuss how to set up file-based routing using a nested directory structure, ensuring your application's URLs align with the layout of your EJS files.

## Understanding File-Based Routing

File-based routing means that the URLs in your application are automatically determined by the file and folder structure within the `pb_hooks/pages/` directory. Each `.ejs` file corresponds to a unique route, and the nested folders reflect URL paths.

### Special Files and Directories

PocketPages has two special naming conventions that affect routing:

1. Directories named `_private` are never routable and are used for storing private files
2. Files that begin with `+` (like `+load.js` and `+layout.ejs`) are special PocketPages files and are not routable

For example:

```text
pb_hooks/
  pages/
    _private/           # Not routable - for private files
      header.ejs
      config.js
    products/
      +load.js         # Not routable - special PocketPages file
      +layout.ejs      # Not routable - special PocketPages file
      index.ejs        # Routable at /products
      details.ejs      # Routable at /products/details
```

### Basic Example

Consider the following directory structure:

```text
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

  ```text
  /                -> pb_hooks/pages/index.ejs
  /about          -> pb_hooks/pages/about.ejs
  /contact        -> pb_hooks/pages/contact.ejs
  ```

- **Nested Routing**:

  ```text
  /products       -> pb_hooks/pages/products/index.ejs
  /products/details -> pb_hooks/pages/products/details.ejs
  ```

- **Deeper Nesting**:

  ```text
  /products/reviews        -> pb_hooks/pages/products/reviews/index.ejs
  /products/reviews/latest -> pb_hooks/pages/products/reviews/latest.ejs
  ```

## Organizing API Routes and Layouts

When building applications that serve both full pages and API endpoints (especially with HTMX), it's important to properly organize your routes to prevent unwanted layout inheritance.

### Recommended Structure

```text
pb_hooks/
  pages/
    (site)/           # Pages that should inherit layouts
      +layout.ejs     # Main site layout
      about.ejs
      products/
        index.ejs
    xapi/            # API endpoints (no layouts)
      count.ejs
      users.ejs
    +layout.ejs      # Global layout (if needed)
```

### Example

For an HTMX application:

```html
<!-- pages/(site)/index.ejs - Full page with layout -->
<div>
  <button hx-get="/xapi/count">Get Count</button>
  <div id="result"></div>
</div>

<!-- pages/xapi/count.ejs - Raw HTML response without layout -->
<span>Current count: <%%= count %></span>
```

### Practical Example

Consider the following files in your `pb_hooks/pages/` directory:

```text
pb_hooks/
  pages/
    foo/
      index.ejs
      bar.ejs
      image.png
```

When you visit `/foo`, it will redirect to `/foo/`. As a result:

```text
/foo/           -> serves index.ejs
/foo/image.png  -> serves image.png
/foo/bar        -> serves bar.ejs
```

This behavior ensures that your URLs remain clean and logical while maintaining the ability to use relative paths within your EJS templates efficiently.
