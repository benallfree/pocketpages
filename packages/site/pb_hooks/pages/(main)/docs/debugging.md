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

## Exception Details

The most common debugging need is to see detailed error information when something goes wrong. Enable exception details and stack traces by setting `debug: true` in your `+config.js`:

```javascript
module.exports = {
  plugins: ['pocketpages-plugin-ejs'],
  debug: true, // Show detailed error information and stack traces
}
```

This is helpful for troubleshooting errors in your application without overwhelming you with internal PocketPages details.

## Plugin Debugging

When developing or troubleshooting plugins, you can enable debug output for specific plugins. By default, plugin debugging is disabled. Enable it for specific plugins in your `+config.js` file:

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

## Verbose Core Debugging

For detailed information about PocketPages internal operations like routes, parameters, and other core behavior, you can enable verbose debugging in two ways:

### Configuration File

Set `debug: 'verbose'` in your `+config.js`:

```javascript
module.exports = {
  plugins: ['pocketpages-plugin-ejs'],
  debug: 'verbose', // Enable detailed core debugging output
}
```

### Environment Variable

Alternatively, set the `DEBUG` environment variable to `1` or `true`:

```bash
DEBUG=1 pocketbase serve
# or
DEBUG=true pocketbase serve
```

Both methods will output comprehensive information about PocketPages internal operations, which can be helpful when troubleshooting core functionality.

> **Note**: Enabling verbose debugging can produce a lot of output. It's recommended to only enable it when specifically debugging PocketPages core functionality.
