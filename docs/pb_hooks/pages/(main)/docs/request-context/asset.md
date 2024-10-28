---
title: asset - Asset URL Helper
description: Generate cache-aware URLs for static assets in PocketPages templates, with automatic path resolution for local assets.
---

# `asset` - Asset URL Helper

- **Type**: `Function(path: string) => string`
- **Description**: The `asset` function generates URLs for static assets, automatically handling path resolution and cache busting. In development mode, it appends a timestamp query parameter to bypass CDN and browser caching.

## Automatic Path Resolution

PocketPages automatically resolves relative asset paths based on the current file's location:

```
pb_hooks/
  pages/
    feature/
      index.md         # Can use ![](image.png) directly
      image.png        # Will resolve to /feature/image.png
    products/
      details.ejs      # asset('style.css') resolves to /products/style.css
      style.css
```

### In Markdown Files

Markdown image syntax automatically resolves relative to the current file:

```markdown
<!-- feature/index.md -->

![My Image](image.png) <!-- Resolves to /feature/image.png -->
![Other Image](../logo.png) <!-- Resolves to /logo.png -->
```

### In EJS Templates

Use the `asset()` helper for the same behavior:

```ejs
<!-- products/details.ejs -->
<img src="<%%= asset('product.jpg') %>">     <!-- Resolves to /products/product.jpg -->
<img src="<%%= asset('/logo.png') %>">       <!-- Resolves to /logo.png -->
```

## Cache Busting

In development mode, URLs include a timestamp to bypass caching:

```ejs
<!-- Template -->
<img src="<%%= asset('logo.png') %>" alt="Logo">

<!-- Development Output -->
<img src="logo.png?_r=1234567890" alt="Logo">

<!-- Production Output -->
<img src="logo.png" alt="Logo">
```

## Example Usage

### Basic Usage

```ejs
<!-- Using relative paths - automatically resolved -->
<img src="<%%= asset('header.jpg') %>" alt="Header">
<link rel="stylesheet" href="<%%= asset('style.css') %>">

<!-- Using absolute paths -->
<img src="<%%= asset('/images/logo.png') %>" alt="Logo">
```

### Complete Example

```ejs
<!DOCTYPE html>
<html>
<head>
    <!-- CSS files relative to current directory -->
    <link rel="stylesheet" href="<%%= asset('styles/main.css') %>">

    <!-- Global assets with absolute paths -->
    <link rel="icon" type="image/png" href="<%%= asset('/favicon.png') %>">
</head>
<body>
    <!-- Images relative to current directory -->
    <img src="<%%= asset('images/header.jpg') %>" alt="Header">

    <!-- Global images -->
    <img src="<%%= asset('/images/logo.png') %>" alt="Logo">
</body>
</html>
```

## Important Notes

1. Markdown image paths are automatically resolved relative to the current file
2. Use relative paths for assets in the same directory as your template
3. Use absolute paths (starting with /) for global assets
4. Cache busting only happens in development mode
5. Works with any static file type (images, CSS, JS, etc.)

## Best Practices

1. **Keep Assets Close to Their Usage**:

   ```
   feature/
     index.md          # Content using local assets
     header.jpg        # Used only in this feature
     style.css         # Feature-specific styles
   ```

2. **Use Global Assets Directory for Shared Resources**:

   ```
   images/            # Global images
     logo.png
   styles/           # Global styles
     main.css
   feature/
     index.md        # Can reference both local and global assets
     image.png
   ```

3. **Be Consistent with Paths**:

   ```ejs
   <!-- Local assets - relative paths -->
   <img src="<%%= asset('header.jpg') %>">

   <!-- Global assets - absolute paths -->
   <img src="<%%= asset('/images/logo.png') %>">
   ```
