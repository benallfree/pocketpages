---
title: Installation
description: Step-by-step guide for installing PocketPages.
---

# Installation

Installing PocketPages is easy.

<%- include(`../../_include/quickstart.ejs`) %>

_Note: `--dir=minimal/pb_data` is necessary to tell PocketBase to use the correct directory for data storage._

Browse to `http://localhost:8090` and with any luck at all, you'll see:

<%- include(`../../_include/browser.ejs`, { url: `http://localhost:8090`, content: `Hello, world!`}) %>

To start editing, find

```
./pb_hooks/pages/index.ejs
```

Changes appear immediately on the next refresh.

## How does it work?

PocketPages is a PocketBase JS Hooks library. It needs to live in the `pb_hooks` directory so PocketBase can see it and run it. From there, it parses the `pb_hooks/pages` directory.

`pages` doesn't strictly need to live in `pb_hooks`, but it's nice to put it there because PocketBase will pick up any changes during local development.
