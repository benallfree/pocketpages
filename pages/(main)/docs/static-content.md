# Serving Static Content in PocketPages

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

```plaintext
app/
  pb_hooks/
    pages/
      index.ejs
      about.ejs
      styles/
        main.css
      scripts/
        app.js
      images/
        logo.png
      documents/
        brochure.pdf
```

In this example:

- The `index.ejs` and `about.ejs` files are EJS templates and are processed dynamically.
- The `main.css`, `app.js`, `logo.png`, and `brochure.pdf` files are considered static content and will be served directly to the client.

## How Static Files are Served

Any file that meets the following criteria will be treated as a static file:

1. **Not an EJS Template**: The file does not have the `.ejs` extension.
2. **No Special Prefix**: The file or directory does not begin with a `+` or `_` character.

### Serving Process

The underlying Echo framework is responsible for serving these static files. This means:

- **Content Type Inference**: Echo will automatically infer the correct `Content-Type` header based on the file extension (e.g., `text/css` for CSS files, `image/png` for PNG files).
- **Streaming**: Echo handles the streaming of large files to the client, ensuring efficient delivery.
- **Caching**: You can leverage browser caching by setting appropriate headers on the static files if needed.

### Example Usage

If you have a CSS file at `styles/main.css`, it can be accessed directly via a URL like `/styles/main.css`. Similarly, an image located at `images/logo.png` would be accessible via `/images/logo.png`.

### Handling Static Files

Since static files are served directly without server-side processing, they are ideal for resources that do not change frequently and can be cached by the browser for improved performance.

### Serving Directories

If a directory contains only static files, the entire directory can be served. For example, if you have a directory structure like `images/`, all files within that directory are accessible via their respective paths.

## Best Practices for Static Content

1. **Organize Static Files**: Keep your static files organized in dedicated directories such as `styles/`, `scripts/`, `images/`, and `documents/`. This makes it easier to manage and reference these files in your templates.
2. **Use Caching**: Consider setting appropriate cache headers to improve performance for frequently accessed static resources.
3. **Minify Assets**: Minify CSS and JavaScript files to reduce their size and improve load times.
4. **Secure Sensitive Files**: Avoid storing sensitive information in static files, as they are publicly accessible.

## Summary

PocketPages automatically treats any file that isn't an EJS template and doesn't begin with a `+` or `_` as a static file. These files are served directly by the underlying Echo framework, which handles content type inference, streaming, and other necessary details. By organizing your static files and using best practices, you can ensure efficient and secure delivery of these resources to your users.
