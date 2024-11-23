# VS Code / Cursor Enhancements for PocketPages

PocketPages includes some helpful VS Code configurations to improve your development experience. You can add these to your project by copying the `.vscode` directory from the PocketPages starter files:

```bash
cp .vscode .vscode-backup
cp -r ./node_modules/pocketpages/starters/vscode .
```

## Features

### EJS Formatting

The configuration includes [EJS Beautifier](https://marketplace.visualstudio.com/items?itemName=j69.ejs-beautify) as the default formatter for HTML files. This ensures your EJS templates stay properly formatted.

To use:

1. Install the EJS Beautifier extension
2. Format your EJS files using `Alt+Shift+F` (Windows/Linux) or `Cmd+Shift+F` (Mac)

### Code Snippets

Common PocketPages patterns are available as VS Code snippets:

#### `ppld`

Creates a new loader function with proper TypeScript types:

```javascript
/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = (api) => {
  const { dbg } = api

  dbg(new loader(), { api })

  return {}
}
```

#### `ppmd`

Creates a new middleware function with proper TypeScript types:

```javascript
/** @type {import('pocketpages').MiddlewareFunc} */
module.exports = (api) => {
  const { dbg } = api

  dbg(new loader(), { api })

  return {}
}
```

To use snippets:

1. Type the snippet prefix (e.g., `ppld`)
2. Press `Tab` to insert the snippet
3. Use `Tab` to move between the customizable fields
