---
title: Understanding Caching in PocketPages
description: Learn how PocketPages handles caching through content-based fingerprinting and development mode cache busters.
---

# Understanding Caching in PocketPages

PocketPages uses content-based fingerprinting for static assets and development-mode cache busters to ensure efficient caching while maintaining quick updates during development.

## Asset Fingerprinting

### How It Works

1. During startup, PocketPages computes SHA-256 fingerprints for all static assets
2. The `asset()` helper embeds these fingerprints into filenames
3. The router dynamically matches fingerprinted URLs to their actual files

```ejs
<!-- Template -->
<img src="<%%= asset('logo.png') %>">

<!-- Output -->
<img src="logo.abc123de.png">
```

### File Resolution

PocketPages resolves asset paths relative to the current template:

```
pb_hooks/pages/
  feature/
    index.ejs        # asset('image.png') → /feature/image.[hash].png
    image.png
  products/
    details.ejs      # asset('style.css') → /products/style.[hash].css
    style.css
```

## Development vs Production

### Development Mode

When an asset doesn't exist in development:

```ejs
<!-- Template -->
<img src="<%%= asset('missing.png') %>">

<!-- Development Output -->
<img src="missing.png?_r=1234567890">
```

### Production Mode

When an asset doesn't exist in production:

```ejs
<!-- Template -->
<img src="<%%= asset('missing.png') %>">

<!-- Production Output -->
<img src="missing.png">
```

## Best Practices

1. **Keep Assets in Pages Directory**

   ```
   pb_hooks/pages/
     images/          # Global images get fingerprinted
       logo.png
     feature/
       header.jpg    # Local images get fingerprinted
       index.ejs
   ```

2. **Use Relative Paths for Local Assets**

   ```ejs
   <!-- Local assets use relative paths -->
   <img src="<%%= asset('header.jpg') %>">

   <!-- Global assets use absolute paths -->
   <img src="<%%= asset('/images/logo.png') %>">
   ```

3. **Verify Assets Exist**
   - Missing assets won't get fingerprinted
   - Development mode will show cache busters
   - Production mode will serve un-fingerprinted paths

## CDN Integration

### Cloudflare Example

Fingerprinted assets work well with CDNs:

1. First request: `/images/logo.abc123de.png`

   - CDN misses, fetches from origin
   - Origin matches `abc123de` to `logo.png`
   - CDN caches response indefinitely

2. Content update:
   - File changes, new hash `xyz789fg`
   - Template outputs `/images/logo.xyz789fg.png`
   - CDN misses, fetches new version
   - Old version naturally expires

### Cache Control Headers

```javascript
/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { response } = api

  // Set cache headers for static assets
  response.header('Cache-Control', 'public, max-age=31536000')

  return {}
}
```

## Complete Example

```ejs
<!DOCTYPE html>
<html>
<head>
  <!-- CSS with fingerprinting -->
  <link rel="stylesheet" href="<%%= asset('css/styles.css') %>">

  <!-- Favicon with fingerprinting -->
  <link rel="icon" href="<%%= asset('/favicon.png') %>">
</head>
<body>
  <!-- Local image -->
  <img src="<%%= asset('header.jpg') %>" alt="Header">

  <!-- Global image -->
  <img src="<%%= asset('/images/logo.png') %>" alt="Logo">

  <!-- JavaScript with fingerprinting -->
  <script src="<%%= asset('js/app.js') %>"></script>
</body>
</html>
```

## Important Notes

- Fingerprinting requires files to exist in pages directory
- Development mode helps identify missing assets
- CDNs can cache fingerprinted assets indefinitely
- Use middleware to set cache control headers
- Relative paths for local assets, absolute for global

## Reference

- [asset() Documentation](/docs-next/api/asset)
- [Middleware Guide](/docs-next/middleware)
- [Cloudflare Cache Documentation](https://developers.cloudflare.com/cache)
