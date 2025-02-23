# Plugin Authoring Guide

PocketPages plugins are powerful tools that can extend and modify the behavior of your application. This guide will help you understand how to create plugins and use the various hooks available.

## Plugin Structure

A plugin is a factory function that takes configuration options and returns an object with hook methods. Here's the basic structure:

```javascript
module.exports = (config, options) => {
  // Initialize plugin with config and options
  return {
    // Hook methods
    onRequest(context) {
      /* ... */
    },
    onRender(context) {
      /* ... */
    },
    handles(context) {
      /* ... */
    },
    onExtendContextApi(context) {
      /* ... */
    },
    onResponse(context) {
      /* ... */
    },
  }
}
```

### Configuration Parameters

The plugin factory receives two parameters:

1. `config: PluginFactoryConfig` - Core configuration object containing:

   - `pagesRoot` - Root directory of pages
   - `config` - Global PocketPages configuration
   - `global` - Global context API
   - `routes` - Array of route definitions
   - `dbg` - Debug logging function

2. `options: PluginOptionsBase` - Plugin-specific options including:
   - `debug` - Enable debug mode
   - Any custom options defined by your plugin

## Available Hooks

Plugins can implement any of these hooks to modify application behavior:

### `onRequest(context: RequestContext)`

Called at the start of each request, before any processing begins.

```javascript
onRequest({ request, response }) {
  // Modify request/response
  // Add headers, check auth, etc.
}
```

### `onRender(context: RenderContext): string`

Transform content during the rendering process.

```javascript
onRender({ api, content, filePath, plugins }) {
  // Transform content
  // Process templates
  // Add features
  return modifiedContent;
}
```

### `handles(context: HandlesContext): boolean`

Determine if this plugin should handle a specific file.

```javascript
handles({ route, filePath }) {
  return filePath.endsWith('.md'); // Handle markdown files
}
```

### `onExtendContextApi(context: ExtendContextApiContext)`

Add methods to the context API available to pages.

```javascript
onExtendContextApi({ api }) {
  api.myHelper = () => {
    // Add custom functionality
  };
}
```

### `onResponse(context: ResponseContext): boolean`

Final processing before sending the response.

```javascript
onResponse({ api, content }) {
  // Modify final output
  // Add headers
  // Handle caching
  return false; // Continue processing
}
```

## Best Practices

1. **Early Returns**: Use early returns for cleaner code flow

   ```javascript
   handles({ filePath }) {
     if (!filePath.endsWith('.md')) return false;
     return true;
   }
   ```

2. **Factory Pattern**: Return an API object instead of using classes

   ```javascript
   module.exports = (config, options) => {
     const api = {
       onRender: () => {
         /* ... */
       },
       // other methods
     }
     return api
   }
   ```

3. **Debug Logging**: Use the provided debug function
   ```javascript
   module.exports = ({ dbg }, options) => {
     dbg('Initializing plugin', { options })
     // ...
   }
   ```

## Example Plugins

### Content Transformer

```javascript
module.exports = (config, options) => {
  return {
    handles: ({ filePath }) => filePath.endsWith('.custom'),
    onRender: ({ content }) => {
      return content.toUpperCase() // Transform to uppercase
    },
  }
}
```

### API Extension

```javascript
module.exports = (config, options) => {
  return {
    onExtendContextApi: ({ api }) => {
      api.formatDate = (date) => {
        return new Date(date).toLocaleDateString()
      }
    },
  }
}
```

## Extending Global API

Plugins can extend the global API during initialization by modifying the `global` object in the factory config. This makes functionality available across all pages and other plugins.

The global API includes core utilities like:

- `url()` - URL parsing
- `stringify()` - JSON stringification
- `env()` - Environment variable access
- `store()` - Global state management
- Logging functions (`dbg`, `info`, `warn`, `error`)

### Example: Adding Global Functions

Here's how the JS SDK plugin extends the global API with a PocketBase client:

```javascript
const jsSdkPluginFactory = (config, extra) => {
  const { global } = config
  const host = extra?.host ?? `http://localhost:8090`

  // Store PocketBase instance
  let pb = null

  // Add pb() to global API
  global.pb = () => {
    if (pb) return pb
    pb = new PocketBase(host)
    return pb
  }

  return {}
}
```

This makes `pb()` available everywhere through the global API:

```javascript
// In any page or plugin
const pb = pb()
const records = pb.collection('posts').getList()
```

### Best Practices for Global API Extensions

1. **Lazy Initialization**: Initialize expensive resources only when first requested

   ```javascript
   let instance = null
   global.myApi = () => {
     if (instance) return instance
     instance = new ExpensiveResource()
     return instance
   }
   ```

2. **Namespacing**: Use clear naming to avoid conflicts

   ```javascript
   global.myPlugin = {
     helper1: () => {
       /* ... */
     },
     helper2: () => {
       /* ... */
     },
   }
   ```

3. **Type Safety**: Define types for your extensions

   ```typescript
   declare module 'pocketpages' {
     interface PagesGlobalContext {
       myApi: () => MyApiType
     }
   }
   ```

4. **Documentation**: Document the API you're exposing
   ```javascript
   /**
    * Returns configured API client
    * @param {object} options - Optional configuration
    * @returns {ApiClient} Configured client instance
    */
   global.myApi = (options) => {
     // Implementation
   }
   ```
