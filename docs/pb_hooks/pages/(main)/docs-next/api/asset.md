---
title: asset - Asset URL Helper
description: Generate fingerprinted URLs for static assets in PocketPages templates, with automatic path resolution for local assets.
---

# `asset()` - Asset URL Helper

- **Type**: `Function(path: string) => string`
- **Description**: Generates URLs for static assets with automatic path resolution and fingerprinting for cache invalidation.
- **Global**: Yes (available directly as `asset()` in templates)
- **API Method**: `api.asset(path)`

## Basic Usage

```ejs
<!-- Using the global helper -->
<img src="<%%= asset('images/photo.jpg') %>">

<!-- Using the API method -->
<img src="<%%= api.asset('images/photo.jpg') %>">
```

## Path Resolution

PocketPages resolves asset paths relative to the current template:

```
pb_hooks/
  pages/
    feature/
      index.ejs        # asset('image.png') → /feature/image.[hash].png
      image.png
    products/
      details.ejs      # asset('style.css') → /products/style.[hash].css
      style.css
```

### Markdown Files

Images in Markdown automatically resolve relative paths:

```markdown
<!-- feature/index.md -->

![Local Image](image.png) <!-- → /feature/image.[hash].png -->
![Global Image](/logo.png) <!-- → /logo.[hash].png -->
```

### EJS Templates

Use `asset()` for path resolution:

```ejs
<!-- products/details.ejs -->
<img src="<%%= asset('product.jpg') %>">     <!-- → /products/product.[hash].jpg -->
<img src="<%%= asset('/logo.png') %>">       <!-- → /logo.[hash].png -->
```

## Fingerprinting

Assets are fingerprinted based on their content for cache invalidation:

```ejs
<!-- Template -->
<img src="<%%= asset('logo.png') %>">

<!-- Output (if file exists) -->
<img src="logo.abc123de.png">

<!-- Development fallback (file missing) -->
<img src="logo.png?_r=1234567890">

<!-- Production fallback (file missing) -->
<img src="logo.png">
```

## Best Practices

1. **Verify Assets Exist**

   - Keep assets in your pages directory
   - Missing assets won't get fingerprinted

2. **Organize Assets Logically**

   ```
   feature/
     index.ejs         # Feature page
     header.jpg        # Feature-specific image
     style.css         # Feature-specific styles
   ```

3. **Use Global Assets Directory**

   ```
   images/            # Global images
     logo.png
   styles/           # Global styles
     main.css
   ```

4. **Path Consistency**

   ```ejs
   <!-- Local assets: relative paths -->
   <img src="<%%= asset('header.jpg') %>">

   <!-- Global assets: absolute paths -->
   <img src="<%%= asset('/images/logo.png') %>">
   ```

## Complete Example

```ejs
<!DOCTYPE html>
<html>
<head>
    <!-- Local CSS -->
    <link rel="stylesheet" href="<%%= asset('styles/main.css') %>">

    <!-- Global assets -->
    <link rel="icon" href="<%%= asset('/favicon.png') %>">
</head>
<body>
    <!-- Local image -->
    <img src="<%%= asset('images/header.jpg') %>" alt="Header">

    <!-- Global image -->
    <img src="<%%= asset('/images/logo.png') %>" alt="Logo">
</body>
</html>
```

## Important Notes

- Fingerprinting only works for files in your pages directory
- Development mode adds cache busters for missing files
- Markdown image paths auto-resolve relative to the current file
- Use relative paths for local assets, absolute paths for global ones
