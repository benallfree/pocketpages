# Overview

PocketPages is an EJS preprocessor for PocketBase. It's like being able to run old-school PHP files, but using JS and PocketBase instead.

Use PocketPages to create slim and modern web apps:

- Start small and iterate
- SEO-first principals
- Zero dependencies
- Fast server-side rendering

## Hello world in just one file

To get started, you need just one file:

```ejs
// index.ejs
<%%= `Hello, world!` %>
```

<%- include(`../../_include/browser.ejs`, { content: `Hello, world!`}) %>

With PocketPages, making apps is easy again. Inside `<%%` and `%>`, you have the full power of JavaScript plus PocketBase's [JSVM](https://pocketbase.io/jsvm/index.html) which defines all of PocketBase's built-in functions.

## Retro file-based routing

PocketPages borrows inspiration from SvelteKit's [file-based routing](https://kit.svelte.dev/docs/routing) architecture, so you can do this:

```ejs
// +layout.ejs
<html>
    <body style="background-color: #b5dcb5">
        <%%- slot>
    </body>
</html>
```

<%- include(`../../_include/browser.ejs`, { bodyTags: `style="background-color: #b5dcb5"`, content: `Hello, world!`}) %>
