---
title: Serving Static Content in PocketPages
description: Static content in PocketPages includes files like HTML, CSS, JavaScript, images, and documents that are served directly to clients without server-side processing. The Echo framework manages content type inference, streaming, and caching for these files.
---

# Serving Static Content in PocketPages

In PocketPages, serving static content is straightforward and integrated seamlessly into the framework. Any file that isn't an EJS template (`*.ejs`) and doesn't begin with a `+` or `_` is treated as a static file. These files are served directly by the underlying Echo framework, which handles content type inference, streaming, and other necessary details.

## What is Considered Static Content?

Static content refers to files that are served directly to the client without server-side processing or dynamic generation. These files typically include:

- HTML files (`*.html`)
- CSS files (`*.css`)
- JavaScript files (`*.js`)
- Image files (`*.jpg`, `*.png`, etc.)
- Font files (`*.woff`, `*.ttf`, etc.)
- Other binary files or documents (e.g., PDFs, videos)

For dynamic asset handling in your templates and pages, PocketPages provides the `asset()` function that helps generate correct URLs for your static assets. This function ensures your assets are properly referenced regardless of your application's base path configuration.

For more details on managing and organizing your static assets effectively, see the [Asset Management Guide](/docs/guides/asset-management).

### Example Directory Structure

```plaintext
my-pocketpages-app/
├── pages/
│ ├── assets/ # Static assets directory
│ │ ├── css/
│ │ │ ├── main.css
│ │ │ └── components.css
│ │ ├── js/
│ │ │ ├── app.js
│ │ │ └── utils.js
│ │ ├── images/
│ │ │ ├── logo.png
│ │ │ └── hero.jpg
│ │ └── fonts/
│ │ ├── OpenSans.woff2
│ │ └── Roboto.woff2
│ ├── documents/ # Static documents
│ │ ├── terms.pdf
│ │ └── privacy.pdf
│ ├── layout.ejs # Layout template (not served as static)
│ ├── +middleware.js # Middleware file (not served as static)
│ ├── index.ejs # Dynamic page template
│ └── about.html # Static HTML page
```
