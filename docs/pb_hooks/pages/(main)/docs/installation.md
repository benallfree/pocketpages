# Installation

Installing PocketPages is easy.

## Choose your package manager

```bash
bun add pocketpages
```

```bash
yarn add pocketpages
```

```bash
npm install pocketpages
```

```bash
pnpm add pocketpages
```

## Run PocketBase

```bash
pocketbase serve --dir=pb_data --dev
```

_Note: `--dir=pb_data` is necessary to tell PocketBase to use the current directory for data storage._

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
