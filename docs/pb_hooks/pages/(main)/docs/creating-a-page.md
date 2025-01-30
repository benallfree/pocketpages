---
title: Creating a PocketPages Page
description: Step-by-step process for creating and organizing EJS template files in PocketPages, including file naming conventions, directory structure, and URL routing patterns.
---

# Creating a PocketPages Page

PocketPages allows you to create dynamic pages for your application using EJS templating. Below are the steps and guidelines to create a page that will be served by PocketPages.

## Creating Pages

1. **Create an EJS File**: Inside the `pb_hooks/pages/` directory, create an `.ejs` file. This file will represent the page that you want to serve.

For example, to create an "About" page:

```text
pb_hooks/pages/about.ejs
```

2. **Special Case - `index.ejs`**: The `index.ejs` file has a special role at any directory level.

At the root level:

```text
pb_hooks/pages/index.ejs -> serves "/"
```

In subdirectories:

```text
pb_hooks/pages/products/index.ejs -> serves "/products"
```

3. **Serving Pages**: Any `.ejs` file within `pb_hooks/pages/` can be served directly. The name of the file (minus the `.ejs` extension) will correspond to the URL path.

Example file structure:

```text
pb_hooks/pages/
├── index.ejs         -> "/"
├── about.ejs         -> "/about"
├── contact.ejs       -> "/contact"
└── products/
    ├── index.ejs     -> "/products"
    └── details.ejs   -> "/products/details"
```

4. **Nested Pages**: You can organize your pages into subdirectories. The routing will follow the directory structure. If no specific file matches the route, an `index.ejs` in the corresponding directory will be served.

Example routing table:

```text
URL Path              File Path
/                    pb_hooks/pages/index.ejs
/about               pb_hooks/pages/about.ejs
/contact             pb_hooks/pages/contact.ejs
/products            pb_hooks/pages/products/index.ejs
/products/details    pb_hooks/pages/products/details.ejs
```
