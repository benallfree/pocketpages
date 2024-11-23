---
title: Markdown Support
description: PocketPages processes .md files through EJS templating and Markdown parsing, with built-in frontmatter support for metadata extraction via the meta() function in templates.
---

# Markdown Support in PocketPages

PocketPages supports rendering `.md` files, treating them similarly to `.ejs` files but with an additional step: Markdown parsing.

## How It Works:

1. **EJS Processing**: Any file with the `.md` extension is first processed through the EJS engine, just like a regular `.ejs` file. This means you can use all the dynamic templating features of EJS within your Markdown files.

2. **Markdown Parsing**: After EJS processing, the content is passed through a Markdown parser. This ensures that any Markdown syntax (such as headers, lists, and links) is properly rendered into HTML.

3. **Final Output**: The last step in the pipeline is Markdown parsing, so the final output is HTML content that reflects both your EJS logic and your Markdown formatting.

## Frontmatter Support

Any frontmatter properties defined at the top of your Markdown file will be automatically available through the request context's `meta` function. For example:

```markdown
---
title: My Blog Post
description: A detailed guide about something interesting
author: John Doe
---

# Content starts here...
```

You can then access these values in your layouts or other templates using the `meta` function:

```ejs
<title><%%= meta('title') %></title>
<meta name="description" content="<%%= meta('description') %>">
<meta name="author" content="<%%= meta('author') %>">
```

## Important Notes:

- **Layouts Cannot Be Markdown**: While `.md` files can include dynamic content through EJS and Markdown, they cannot be used as layouts. Layouts must be `.ejs` files.

By supporting Markdown in this way, PocketPages allows you to combine the power of dynamic EJS templates with the simplicity and readability of Markdown, making it easier to manage content-heavy projects.
