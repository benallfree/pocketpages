---
title: Serving Static Content in PocketPages
description: Static content in PocketPages includes files like HTML, CSS, JavaScript, images, and documents that are served directly to clients without server-side processing. The Echo framework manages content type inference, streaming, and caching for these files.
---

In PocketPages, serving static content is straightforward and integrated seamlessly into the framework. Any file that isn't an EJS template (`*.ejs`) and doesn't begin with a `+` or `_` is treated as a static file. These static files are served directly by the underlying Echo framework, which handles content type inference, streaming, and other necessary details.

## What is Considered Static Content?

Static content refers to files that are served directly to the client without server-side processing or dynamic generation. These files typically include:

- HTML files (`*.html`)
- CSS files (`*.css`)
- JavaScript files (`*.js`)
- Image files (`*.jpg`, `*.png`, etc.)
- Font files (`*.woff`, `*.ttf`, etc.)
- Other binary files or documents (e.g., PDFs, videos)

### Example Directory Structure
