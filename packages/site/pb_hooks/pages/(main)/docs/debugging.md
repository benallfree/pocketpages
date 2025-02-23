---
title: Debugging in PocketPages
description: Learn how to enable and configure debugging output in PocketPages applications.
---

# Debugging in PocketPages

PocketPages provides several levels of debugging output to help you develop and troubleshoot your application.

## Development Mode

Running PocketBase with the `--dev` flag automatically enables debug output from the `dbg()` function (see [Logging Functions](/docs/global-api/log) for details):

```bash
pocketbase serve --dev
```

Without the `--dev` flag, all `dbg()` output is suppressed, making your production logs cleaner and more focused on important information.

## Plugin Debugging

Each plugin can have its own debug output enabled or disabled. By default, plugin debugging is disabled. You can enable it for specific plugins in your `+config.js` file:

```javascript
module.exports = {
  plugins: [
    // Enable debugging for just the EJS plugin
    {
      name: 'pocketpages-plugin-ejs',
      debug: true,
    },

    // Other plugins remain quiet
    'pocketpages-plugin-marked',
  ],
  debug: false,
}
```

See [Configuration](/docs/config) for more details about plugin configuration.

## Core Debugging

PocketPages core debugging is disabled by default. While rarely needed, you can enable it by setting the top-level `debug` option in your `+config.js`:

```javascript
module.exports = {
  plugins: ['pocketpages-plugin-ejs'],
  debug: true, // Enable core debugging
}
```

This will output detailed information about routes, parameters, and other internal details that can be helpful when troubleshooting core PocketPages behavior.

> **Note**: Enabling core debugging can produce a lot of output. It's recommended to only enable it when specifically debugging PocketPages core functionality.
