# Using Partials in PocketPages

Partials are reusable EJS templates that you can include within other EJS files to avoid repetition and maintain a clean, modular structure in your code. In PocketPages, partials are especially useful for common components like headers, footers, or any repeated content across multiple pages.

## Including Partials

To include a partial in an EJS file, use the following syntax:

```ejs
<%%- include(`./_foo.ejs`, { context }) %>
```

### Key Points:

- **Escaping**: The opening tag is escaped with `<%%-`, which ensures that the partial's content is rendered without escaping HTML.
- **Passing `context`**: It's important to pass the `context` object down to the partial to ensure that all necessary data, such as request context, parameters, and data loaded via `+load.js`, is available within the partial.
- **Additional Variables**: Besides `context`, you can pass any other variables that the partial might need. These are passed as part of the object after `context`.

### Example Usage

Let's say you have a `_header.ejs` partial for a page header:

```ejs
<!-- _header.ejs -->
<header>
  <h1><%%= data.pageTitle %></h1>
</header>
```

To include this partial in your main template, you would use:

```ejs
<%%- include(`./_header.ejs`, { context }) %>
```

If you need to pass additional data to the partial:

```ejs
<%%- include(`./_header.ejs`, { context, customTitle: "My Custom Title" }) %>
```

In `_header.ejs`, you can then access `customTitle`:

```ejs
<header>
  <h1><%%= customTitle || data.pageTitle %></h1>
</header>
```

## Private Partials

Any EJS file that begins with an underscore (`_`) is considered a private partial. These files are not directly routable, meaning they cannot be accessed via a URL. This convention helps keep your partials organized and ensures they are only used within other EJS files.

### Benefits of Private Partials:

- **Encapsulation**: By marking partials as private with an underscore, you ensure they are used only as intended and not exposed as standalone pages.
- **Organization**: Keeping partials separate from your main templates helps maintain a clean and organized file structure, making it easier to manage your codebase.

### Example Structure:

```
pb_hooks/
  pages/
    _header.ejs
    _footer.ejs
    index.ejs
    about/
      index.ejs
```

- `_header.ejs` and `_footer.ejs` are private partials that can be included in `index.ejs` and `about/index.ejs`.
- Neither `_header.ejs` nor `_footer.ejs` can be accessed directly via a route.
