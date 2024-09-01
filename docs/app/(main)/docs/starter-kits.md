# Starter Kits

<!-- TOC depthfrom:2 -->

- [minimal](#minimal)
- [daisyui](#daisyui)
- [lib](#lib)
- [deploy-pockethost](#deploy-pockethost)
- [deploy-fly](#deploy-fly)

<!-- /TOC -->

The easiest way to get started with PocketPages is to use one of the starter kits.

## minimal

The Minimal starter kit creates the absolute most minimal PocketPages app: a single `index.ejs` home page.

```bash
bunx pocketpages new myapp --template=minimal
cd myapp
bun dev # or npm,yarn,pnpm...
```

Browse to `http://localhost:8090` and with any luck at all, you'll see:

<%- include(`../../_include/browser.ejs`, { url: `http://localhost:8090`, content: `Hello, world!`}) %>

To start editing, find

```
./app/index.ejs
```

Changes appear immediately on the next refresh.

## daisyui

The `daisyui` starter kit incorporates Daisy UI and Tailwind.

```bash
bunx pocketpages new myapp --template=daisyui
cd myapp
bun dev # or npm,yarn,pnpm...
```

## deploy-pockethost

This kit helps you deploy to pockethost.io. See the [deployment guide](/docs/deploying) for more details.

## deploy-fly

This kit helps you deploy to fly.io. See the [deployment guide](/docs/deploying) for more details.
