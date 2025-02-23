---
title: Overview
description: PocketPages is a powerful Multi Page Application (MPA) preprocessor for PocketBase with a pluggable architecture.
---

# Overview

PocketPages is a pluggable Multi-Page Application (MPA) preprocessor for PocketBase. It ships with an EJS template engine and uses a flexible plugin system that lets you efficiently choose additional features (including other templating engines) for your application while maintaining maximum performance.

Use PocketPages to create slim and modern web apps:

- Start small and iterate
- SEO-first principals
- Zero dependencies
- No build step
- Fast server-side rendering

## Hello world in just one file

```ejs
// index.ejs
<%%= `Hello, world!` %>
```

<%- include(`browser.ejs`, { content: `Hello, world!`}) %>

With PocketPages, building apps is easy again. Inside `<%%` and `%>`, you can leverage the full power of JavaScript alongside PocketBase's [JSVM](https://pocketbase.io/jsvm/index.html), which exposes all of PocketBase's built-in functions.

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

<%- include(`browser.ejs`, { bodyTags: `style="background-color: #b5dcb5"`, content: `Hello, world!`}) %>
