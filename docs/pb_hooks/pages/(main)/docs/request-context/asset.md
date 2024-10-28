---
title: asset - Asset URL Helper
description: Generate fingerprinted URLs for static assets in PocketPages templates, with automatic path resolution for local assets.
---

# `asset` - Asset URL Helper

- **Type**: `Function(path: string) => string`
- **Description**: The `asset` function generates URLs for static assets, automatically handling path resolution and fingerprinting. It helps with cache invalidation by incorporating content-based fingerprints into file names.

## Automatic Path Resolution

PocketPages automatically resolves relative asset paths based on the current file's location:

```
pb_hooks/
  pages/
    feature/
      index.md         # Can use ![](image.png) directly
      image.png        # Will resolve to /feature/image.[fingerprint].png
    products/
      details.ejs      # asset('style.css') resolves to /products/style.[fingerprint].css
      style.css
```

### In Markdown Files

Markdown image syntax automatically resolves relative to the current file:

```markdown
<!-- feature/index.md -->

![My Image](image.png) <!-- Resolves to /feature/image.[fingerprint].png -->
![Other Image](../logo.png) <!-- Resolves to /logo.[fingerprint].png -->
```

### In EJS Templates

Use the `asset()` helper for the same behavior:

```ejs
<!-- products/details.ejs -->
<img src="<%%= asset('product.jpg') %>">     <!-- Resolves to /products/product.[fingerprint].jpg -->
<img src="<%%= asset('/logo.png') %>">       <!-- Resolves to /logo.[fingerprint].png -->
```

## Asset Fingerprinting

PocketPages uses content-based fingerprinting for static assets to enable efficient cache invalidation:

1. During startup, PocketPages computes SHA-256 fingerprints for all static assets
2. The `asset()` helper generates URLs with these fingerprints embedded
3. The router dynamically matches fingerprinted URLs to their actual files

```ejs
<!-- Template -->
<img src="<%%= asset('logo.png') %>" alt="Logo">

<!-- Production and Development Output (if file exists) -->
<img src="logo.abc123de.png" alt="Logo">

<!-- Production Output (if file doesn't exist) -->
<img src="logo.png" alt="Logo">

<!-- Development Output (if file doesn't exist) -->
<img src="logo.png?_r=1234567890" alt="Logo">
```

## Important Notes

1. Fingerprinting only works for files that exist in your pages directory
2. If an asset doesn't exist:
   - In development: Falls back to un-fingerprinted path with a cache buster query parameter
   - In production: Falls back to un-fingerprinted path (may cause caching issues)
3. Markdown image paths are automatically resolved relative to the current file
4. Use relative paths for assets in the same directory as your template
5. Use absolute paths (starting with /) for global assets

## Best Practices

1. **Verify Assets Exist**:

   - Always ensure referenced assets are present in your pages directory
   - Missing assets won't get fingerprinted and may have caching issues

2. **Keep Assets Close to Their Usage**:

   ```
   feature/
     index.md          # Content using local assets
     header.jpg        # Used only in this feature
     style.css         # Feature-specific styles
   ```

3. **Use Global Assets Directory for Shared Resources**:

   ```
   images/            # Global images
     logo.png
   styles/           # Global styles
     main.css
   feature/
     index.md        # Can reference both local and global assets
     image.png
   ```

4. **Be Consistent with Paths**:

   ```ejs
   <!-- Local assets - relative paths -->
   <img src="<%%= asset('header.jpg') %>">

   <!-- Global assets - absolute paths -->
   <img src="<%%= asset('/images/logo.png') %>">
   ```

## Example Usage

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
