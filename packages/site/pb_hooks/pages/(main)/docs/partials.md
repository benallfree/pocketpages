---
title: Using Partials in PocketPages
description: Learn how PocketPages handles template partials through a convenient _private directory system that enables smart partial resolution and code reuse.
---

# Using Partials in PocketPages

Partials are reusable EJS templates that you can include within other EJS files. PocketPages implements an innovative partial resolution system that makes organizing and using partials both secure and convenient.

## The \_private Directory System

PocketPages looks for included files in `_private` directories, starting from the including template's directory and working up through parent directories. This system has several benefits:

- Directories starting with underscore (like `_private`) are never routed, ensuring included files can't be accessed directly
- Partials can be "hoisted" to common ancestor directories to be shared by multiple components
- Each directory can have its own private components that are only relevant to that section
- Child directories can override parent partials by having their own `_private` file with the same name
- Path management is greatly simplified since you rarely need to specify relative paths - just the partial name is usually enough

### Example Directory Structure

```
pb_hooks/
  pages/
    _private/
      global-header.ejs
      global-footer.ejs
    blog/
      _private/
        blog-sidebar.ejs
      posts/
        _private/
          post-card.ejs
        index.ejs
      index.ejs
    index.ejs
```

## Including Partials

To include a partial, use the standard EJS include syntax:

```ejs
<%%- include('header.ejs', { ...data }) %>
```

### Partial Resolution

When resolving the path to a partial, PocketPages will:

1. Start in the current template's directory, looking for `_private/header.ejs`
2. If not found, check the parent directory for `_private/header.ejs`
3. Continue up the directory tree until the file is found or the root is reached

You have several options for controlling this resolution:

- **Simple name**: Just specify the file name (e.g., `header.ejs`) to use the automatic resolution system
- **Absolute paths**: Start with `/` to specify an explicit path from the root (e.g., `/docs/_private/header.ejs`)
- **Level jumping**: Use `../` prefix to skip the local `_private` directory and force resolution from a parent level (useful when you want to access an ancestor's partial that has the same name as a local one)

### Examples

Given the directory structure above:

```ejs
// In /blog/posts/index.ejs:
<%%- include('post-card.ejs', { api }) %>  // Uses /blog/posts/_private/post-card.ejs
<%%- include('blog-sidebar.ejs', { api }) %>  // Uses /blog/_private/blog-sidebar.ejs
<%%- include('global-header.ejs', { api }) %>  // Uses /_private/global-header.ejs

// Using absolute path
<%%- include('/blog/_private/blog-sidebar.ejs', { api }) %>  // Explicitly uses /blog/_private/blog-sidebar.ejs

// Level jumping
<%%- include('../layout.ejs', { api }) %>  // Skips local _private/layout.ejs and uses parent's version
```

### Passing Data to Partials

When including partials, it's recommended to pass only the specific data they need to render:

```ejs
<%%- include('header.ejs', { title: 'My Page', user: currentUser }) %>
```

Inside the partial, access the passed data directly:

```ejs
<!-- _private/header.ejs -->
<header>
  <h1><%%= title %></h1>
  <%% if (user) { %>
    <nav>Welcome, <%%= user.name %></nav>
  <%% } %>
</header>
```

#### Avoiding Side Effects

While it's possible to pass the PocketPages `api` object to partials, this is considered an antipattern because:

- It makes partials less predictable by allowing them to perform side effects
- It creates hidden dependencies between partials and the PocketPages system
- It makes testing and maintaining partials more difficult
- It breaks the principle of separation of concerns

Instead, compute any necessary data in your main template or `+load.js` file, and pass only the required values to your partials. This keeps partials pure and deterministic:

```ejs
<!-- Good: Passing specific data -->
<%%- include('user-card.ejs', {
  username: user.name,
  avatar: user.avatarUrl,
  joinDate: formatDate(user.joinedAt)
}) %>

<!-- Avoid: Passing entire api object -->
<%%- include('user-card.ejs', { api }) %>  // Don't do this
```

## Best Practices

1. **Hoist Common Partials**: If multiple sections need the same partial, move it up to a common ancestor's `_private` directory.

2. **Local Partials**: Keep section-specific partials in that section's `_private` directory.

3. **Avoid Deep Nesting**: While technically possible to reference sibling directories' `_private` folders (e.g., `../sibling/_private/file.ejs`), it's generally cleaner to hoist shared components up instead.

4. **Consistent Naming**: Use clear, descriptive names for your partials to make their purpose obvious.

## Example: Organizing Shared Components

```
pb_hooks/
  pages/
    _private/           // Global components used everywhere
      header.ejs
      footer.ejs
    docs/
      _private/         // Documentation-specific components
        sidebar.ejs
        code-block.ejs
      getting-started/
        _private/       // Components specific to getting started
          tutorial-nav.ejs
        index.ejs
      index.ejs
    index.ejs
```

This structure makes it easy to:

- Share global components across all pages
- Keep documentation-specific components together
- Isolate section-specific components
- Maintain clear boundaries between different parts of your site
