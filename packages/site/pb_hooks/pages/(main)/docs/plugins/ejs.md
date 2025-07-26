# PocketPages EJS Plugin

The EJS plugin (`pocketpages-plugin-ejs`) is included with PocketPages by default and provides template processing using the EJS (Embedded JavaScript) templating engine. You only need to explicitly include it in your `+config.js` if you want to modify its configuration or if you're adding other plugins.

## Configuration

The plugin can be configured in your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    // String format (default configuration)
    'pocketpages-plugin-ejs',

    // Object format with configuration
    {
      name: 'pocketpages-plugin-ejs',
      extensions: ['.ejs', '.md'],
      debug: false,
    },
  ],
}
```

### Options

- **`extensions`**: Array of file extensions to process (default: `['.ejs']`)
- **`debug`**: Enable debug output for the plugin (default: `false`)

## Features

### Server Script Blocks

The plugin adds support for `<<%%=`script server`%>>` blocks as an alternative to `<%%%` `%>` delimiters:

```ejs
<!-- Both are equivalent -->
<%%% const message = 'Hello' %>
<<%%=`script server`%>>
  const message = 'Hello'
</script>

<%%%= message %>
```

### Smart Partial Resolution

Includes are resolved by searching up the directory tree for `_private` directories. When resolving includes, the plugin will:

1. Look for an exact match of the specified path
2. If not found, try appending each configured extension
3. Repeat this process up the directory tree in `_private` folders

```ejs
<!-- For example, include('header') with extensions: ['.ejs', '.md'] will search for: -->
<!-- 1. ./current/dir/_private/header -->
<!-- 2. ./current/dir/_private/header.ejs -->
<!-- 3. ./current/dir/_private/header.md -->
<!-- 4. ./parent/dir/_private/header -->
<!-- 5. ./parent/dir/_private/header.ejs -->
<!-- 6. ./parent/dir/_private/header.md -->
<!-- 7. ./root/_private/header -->
<!-- 8. ./root/_private/header.ejs -->
<!-- 9. ./root/_private/header.md -->
<%%%- include('header', { title: 'My Page' }) %>
```

You can still include files with explicit extensions:

```ejs
<%%%- include('header.ejs', { title: 'My Page' }) %>
```

### Echo Helper

A convenient `echo()` function is provided for outputting content:

```ejs
<%%%
  // Automatically stringifies objects
  echo({ hello: 'world' })

  // Joins multiple arguments with spaces
  echo('Hello', 'world', { count: 123 })
%>
```

## Usage with Markdown

When configured with the `.md` extension, the plugin will process EJS templates within Markdown files:

```javascript
module.exports = {
  plugins: [
    {
      name: 'pocketpages-plugin-ejs',
      extensions: ['.ejs', '.md'],
    },
    'pocketpages-plugin-marked',
  ],
}
```

This allows you to use EJS features in your Markdown content:

```ejs
# Welcome <%%%= user.name %>

<<%%=`script server`%>>
  const posts = pb.collection('posts').getFullList()
</script>

<%%% for (const post of posts) { %>
- [<%%%= post.title %>](<%%%= post.url %>)
<%%% } %>
```

## Default Configuration

Since this plugin is included with PocketPages by default, you don't need to specify it in your `+config.js` unless you want to:

1. Add additional file extensions (like `.md`)
2. Enable debug output
3. Include it alongside other plugins

The default configuration is equivalent to:

```javascript
module.exports = {
  plugins: [
    {
      name: 'pocketpages-plugin-ejs',
      extensions: ['.ejs'],
      debug: false,
    },
  ],
}
```
