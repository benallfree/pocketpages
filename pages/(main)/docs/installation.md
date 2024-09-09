# Installation

PocketPages provides many [Starter Kits](/docs/starter-kits) to help you get up and running quickly. The easiest one is called Minimal:

```bash
bunx pocketpages new myapp --template=minimal
cd myapp
bun dev
```

_Note: I like bun but you can use npm, yarn, or pnpm as well._

Browse to `http://localhost:8090` and with any luck at all, you'll see:

<%- include(`../../_include/browser.ejs`, { url: `http://localhost:8090`, content: `Hello, world!`}) %>

To start editing, find

```
./app/index.ejs
```

Changes appear immediately on the next refresh.

## How does it work?

PocketPages is a PocketBase JS Hooks library. It needs to live in the `pb_hooks` directory so PocketBase can see it and run it. From there, it parses the `pb_hooks/pages` directory.

`pages` doesn't strictly need to live in `pb_hooks`, but it's nice to put it there because PocketBase will pick up any changes during local development.
