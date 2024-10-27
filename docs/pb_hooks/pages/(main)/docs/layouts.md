# Working with PocketPages Layouts

PocketPages provides a powerful layout system that allows you to create consistent page structures by defining layouts that can wrap your content. Layouts are defined using `+layout.ejs` files and are applied in a bottom-up order, meaning that each higher-level layout wraps the content of the child layout. This guide will explain how layouts work in PocketPages and how to use them effectively.

## What is a Layout?

A layout in PocketPages is an EJS template file named `+layout.ejs`. Layouts are used to define the overall structure of your pages, such as headers, footers, and common navigation elements, which can be shared across multiple pages. Layouts are traversed in a bottom-up order, meaning that the layout closest to the content is applied first, and each parent layout wraps the child layout.

### Example Directory Structure

```plaintext
pb_hooks/pages/
  +layout.ejs
  products/
  +layout.ejs
  [productId]/
    index.ejs
    details.ejs
```

### How Layouts are Applied

1. **Leaf Page**: The `index.ejs` or `details.ejs` file is the leaf page, where the final content is rendered.
2. **Child Layout**: The `+layout.ejs` in the `[productId]/` directory is applied first, wrapping the content of `index.ejs` or `details.ejs`.
3. **Parent Layout**: The `+layout.ejs` in the `products/` directory is then applied, wrapping the content from the child layout.
4. **Root Layout**: Finally, the `+layout.ejs` at the root level (`pages/+layout.ejs`) wraps the entire content, providing the final structure of the page.

### Using the `slot` Variable

In `+layout.ejs` files, a special `slot` variable is provided in the context. This variable represents the content that will be placed inside the layout. The `slot` variable is available only in `+layout.ejs` files.

#### Example Usage of `slot`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Application</title>
</head>
<body>
    <header>
        <h1>Welcome to My Application</h1>
    </header>
    <main>
        <%%- slot %>
    </main>
    <footer>
        <p>&copy; <%%= new Date().getFullYear() %%> My Application</p>
    </footer>
</body>
</html>
```

In this example, the `slot` variable is used to place the interior content (from the child layout or the leaf page) within the `<main>` tag of the layout.

### Multiple Slots

PocketPages provides two ways to work with content in layouts: the `slot` string which always contains the full content, and a `slots` object for accessing named sections of that content.

#### Basic Slot Usage

For simple layouts with a single content area, you can use the `slot` variable which contains all the content:

```ejs
<!DOCTYPE html>
<html>
<body>
    <%%- slot %>
</body>
</html>
```

#### Working with Multiple Slots

For more complex layouts, you can divide your content into named sections using HTML comments and access them through the `slots` object, while `slot` continues to contain the complete content:

```ejs
<!-- In your content file (e.g., index.ejs) -->
<!-- slot:header -->
<h2>Product Details</h2>

<!-- slot:sidebar -->
<nav>Navigation items...</nav>

<!-- slot:body -->
<p>This is the main content of the product page.</p>
```

Then in your layout, access these named slots using the `slots` object:

```ejs
<!DOCTYPE html>
<html>
<head>
    <title>Product Page</title>
</head>
<body>
    <header>
        <%%- slots.header || 'Default Header' %>
    </header>

    <div class="sidebar">
        <%%- slots.sidebar %>
    </div>

    <main>
        <!-- slots.body falls back to showing the full content if body slot isn't defined -->
        <%%- slots.body || slot %>
    </main>

    <!-- slot always contains the complete content, regardless of slot definitions -->
    <div class="debug">
        <%%- slot %>
    </div>
</body>
</html>
```

Note the following patterns:

- The `slot` variable always contains the complete content, whether or not slots are defined
- Use `slots.name` to access a specific named section
- Provide defaults with `slots.name || 'Default Content'`
- Use `slots.body || slot` to create a main content area that shows either the body slot or all content

### Leaf `+load.js` Data Availability

In layouts, the `data` object from the `+load.js` file at the leaf level (e.g., `index.ejs`) is available. However, it is important to note that the `data` object from the `+load.js` file at the layout level is not available in the layout itself. This means that the layout can access only the data passed from the leaf page.

### When Layouts are Not Applied

Layouts are only applied to leaf EJS files that return HTML content. If an EJS file returns a JSON response, the layouts will not be executed. This ensures that layouts are used only for rendering HTML pages, keeping API responses clean and efficient.
