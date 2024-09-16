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
./pb_hooks/pages/index.ejs
```

Changes appear immediately on the next refresh.

For more detail, see https://github.com/benallfree/pocketpages/blob/master/starters/minimal

## daisyui

The `daisyui` starter kit incorporates Daisy UI and Tailwind.

```bash
bunx pocketpages new myapp --template=daisyui
cd myapp
bun dev # or npm,yarn,pnpm...
```

For more detail, see https://github.com/benallfree/pocketpages/blob/master/starters/daisyui

## deploy-pockethost-manual

This kit helps you deploy manually to pockethost.io. See the [deployment guide](/docs/deploying) for more details.

## deploy-pockethost-ga

This kit helps you deploy as a Github Action to pockethost.io. See the [deployment guide](/docs/deploying) for more details.

## deploy-fly-manual

This kit helps you deploy manually to fly.io. See the [deployment guide](/docs/deploying) for more details.

## deploy-fly-ga

This kit helps you deploy via Github Action to fly.io. It requires `deploy-fly-manual` as well. See the [deployment guide](/docs/deploying) for more details.
