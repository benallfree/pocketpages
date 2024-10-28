---
title: Asset Management
description: PocketPages handles static assets with automatic fingerprinting and cache invalidation.
---

# Asset Management

PocketPages provides built-in asset management with content-based fingerprinting for efficient cache invalidation.

## Directory Structure

Place your static assets (images, CSS, JS, etc.) alongside the pages that use them:

```
pb_hooks/
  pages/
    feature/
      index.md       # Your content
      styles.css     # Feature-specific styles
      header.jpg     # Feature-specific image
    shared/
      logo.png      # Shared across pages
```

## Using Assets

### In Markdown

Use standard markdown syntax for images - paths are automatically resolved relative to the current file:

```markdown
![Logo](logo.png) # Local image
![Header](/shared/logo.png) # Absolute path
```

### In EJS Templates

Use the `asset()` helper to generate fingerprinted URLs:

```ejs
<img src="<%%= asset('header.jpg') %>">
<link rel="stylesheet" href="<%%= asset('styles.css') %>">
```

## How It Works

1. During startup, PocketPages generates content-based fingerprints for all static files
2. The `asset()` helper and markdown images automatically generate fingerprinted URLs
3. URLs are served with long-term cache headers for optimal performance

## Best Practices

1. Keep assets close to the pages that use them
2. Use a shared directory (like `shared/` or `assets/`) for common resources
3. Always verify assets exist in your pages directory

For detailed information about the `asset()` helper and its features, see the [asset helper documentation](/docs/request-context/asset).
