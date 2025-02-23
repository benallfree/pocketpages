---
title: Installation
description: Step-by-step guide for installing PocketPages.
---

# Installation

> **PocketPages requires PocketBase v0.25.5 or later.**

Installing PocketPages is easy.

<%- include(`quickstart.ejs`) %>

_Note: `--dir=pb_data` is necessary to tell PocketBase to use the current directory for data storage._

Browse to `http://localhost:8090` and with any luck at all, you'll see:

<%- include(`browser.ejs`, { url: `http://localhost:8090`, content: `Hello, world!`}) %>

To start editing, find

```
./pb_hooks/pages/index.ejs
```

Changes appear immediately on the next refresh.

## How does it work?

PocketPages is a Multi-Page Application (MPA) preprocessor for PocketBase. It listens for requests and renders pages using file-based routing rules like old school PHP.
