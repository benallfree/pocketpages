# `meta` - Managing Page Metadata and Global Values

- **Type**: Function
- **Description**: The `meta` function provides a way to get and set metadata and other global values during request processing. While it can be used for any global values, it's most commonly used to manage page metadata like titles, descriptions, and OpenGraph tags.

## Function Signature:

```typescript
meta(key: string): string | undefined
meta(key: string, value: string): string
```

## Usage Patterns:

1. **Getting a value**:

```ejs
<%% const pageTitle = meta('title'); %>
```

2. **Setting a value**:

```ejs
<%% meta('title', 'Welcome to My Site'); %>
```

## Common Use Cases:

The most common use case for `meta` is setting page metadata in your `+load.js` files and then using those values in your layout templates. Here's a typical example from a layout file:

```ejs
<head>
    <title><%%= meta('title') || 'PocketPages' %></title>

    <meta
      name="description"
      content="<%%= meta('description') || 'Server-side pages for PocketBase' %>"
    />

    <!-- OpenGraph tags -->
    <meta property="og:title" content="<%%= meta('title') || 'PocketPages' %>" />
    <meta
      property="og:description"
      content="<%%= meta('description') || 'Server-side pages for PocketBase' %>"
    />
    <meta
      property="og:image"
      content="<%%= meta('image') || 'https://pocketpages.dev/android-chrome-512x512.png' %>"
    />
    <meta
      property="og:url"
      content="<%%= meta('path') ? `https://pocketpages.dev${meta('path')}` : meta('url') || `https://pocketpages.dev${ctx.request().url}` %>"
    />
</head>
```

## Setting Metadata in Load Files:

You can set metadata values in your `+load.js` files before the page renders:

```js
export default async ({ meta }) => {
  meta('title', 'About Us')
  meta('description', 'Learn more about our company and mission')
  meta('image', 'https://example.com/about-preview.jpg')

  return {
    // ... other loaded data
  }
}
```

## Additional Use Cases:

While metadata is the primary use case, `meta` can be used for any global values that need to be accessed across different parts of your application during a request:

```ejs
<%%
  // Set a global theme
  meta('theme', 'dark');

  // Set the current user's preferred language
  meta('language', 'en-US');

  // Later, access these values anywhere in your templates
  const theme = meta('theme');
  const language = meta('language');
%>
```

> **Note**: Values set using `meta` only persist for the duration of the current request. They do not persist across different requests or between different users.
