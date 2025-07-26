# Markdown Plugin

The Markdown plugin (`pocketpages-plugin-marked`) processes `.md` files through the Marked parser, adding support for frontmatter, automatic asset fingerprinting, and heading IDs. It works in conjunction with the EJS plugin to enable dynamic content within Markdown files.

## Installation

```bash
npm install pocketpages-plugin-marked
```

## Configuration

Add the plugin to your `+config.js` file. The order of plugins matters - typically you'll want EJS processing to happen before Markdown:

```javascript
module.exports = {
  plugins: [
    // EJS first - processes templates and includes
    {
      name: 'pocketpages-plugin-ejs',
      extensions: ['.ejs', '.md'], // Important: include .md extension
    },
    // Markdown second - converts to HTML
    'pocketpages-plugin-marked',
  ],
}
```

### Plugin Order Considerations

The order of plugins in the `plugins` array determines their processing order:

1. If you want to use EJS features within Markdown files (like includes or dynamic content), place the EJS plugin first
2. If you want to process the HTML output of Markdown with EJS, place the Markdown plugin first
3. Make sure to include the `.md` extension in the EJS plugin config if you want to:
   - Use EJS features within Markdown files
   - Use `include()` with Markdown files
   - Process Markdown files through both plugins

### Options

- **`extensions`**: Array of file extensions to process (default: `['.md']`)
- **`debug`**: Enable debug output for the plugin (default: `false`)

## Features

### Frontmatter Support

Add YAML frontmatter to your Markdown files to define metadata:

```markdown
---
title: My Page
description: A detailed guide about something interesting
author: John Doe
---

# Content starts here
```

Access frontmatter in templates using the `meta()` function:

```ejs
<title><%%%= meta('title') %></title>
<meta name="description" content="<%%%= meta('description') %>">
```

### Automatic Asset Fingerprinting

Image paths in Markdown are automatically processed through the `asset()` helper for cache busting:

```markdown
![Local Image](./images/photo.jpg)
![Global Image](/shared/logo.png)
```

Renders as:

```html
<img src="/images/photo.abc123.jpg" alt="Local Image" />
<img src="/shared/logo.xyz789.png" alt="Global Image" />
```

### Heading IDs

All headings automatically get URL-friendly IDs for linking:

```markdown
# My Section Title
```

Renders as:

```html
<h1 id="my-section-title">My Section Title</h1>
```

### Dynamic Content

Since Markdown files are processed through EJS first, you can include dynamic content:

```markdown
# User Profile: <%%%= user.name %>

<<%%=`script server`%>>
const posts = pb.collection('posts').getFullList()
</script>

## Recent Posts

<%%% for (const post of posts) { %>

- [<%%%= post.title %>](<%%%= post.url %>)
  <%%% } %>
```

## Processing Order

1. EJS processes any dynamic content and template includes
2. Frontmatter is extracted and added to the page metadata
3. Markdown is converted to HTML with automatic asset fingerprinting
4. The final HTML is rendered within your layout

## Example Usage

```markdown
---
title: Getting Started
layout: docs
---

# <%%%= meta('title') %>

<<%%=`script server`%>>
const features = pb.collection('features').getFullList()
</script>

## Key Features

<%%% features.forEach(feature => { %>

### <%%%= feature.name %>

<%%%= feature.description %>

![<%%%= feature.name %>](<%%%= feature.image %>)
<%%% }) %>
```
