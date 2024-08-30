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

The Minimal starter kit creates the absolute most minimal PocketPages app: the PocketPages library and a single `index.ejs` home page.

```bash
bunx tiged benallfree/pocketpages/starters/minimal minimal
cd minimal
bun i
bun dev
```

_Note: I like bun but you can use npm, yarn, or pnpm as well._

Browse to `http://localhost:8090` and with any luck at all, you'll see:

<%- include(`../../_include/browser.ejs`, { url: `http://localhost:8090`, content: `Hello, world!`}) %>

To start editing, find

```
./app/pb_hooks/pages/index.ejs
```

Changes appear immediately on the next refresh.

## daisyui

The `daisyui` starter kit incorporates Daisy UI and Tailwind.

```bash
bunx tiged benallfree/pocketpages/starters/daisyui daisyui
cd daisyui
bun i
bun dev
```

## lib

If you're just looking for the PocketPages library itself, you can use this starter kit. This kit is useful if you just wish to update PocketPages itself without disturbing any other files.

```bash
# Update the PocketPages lib
cd pb_hooks
bunx tiged benallfree/pocketpages/starters/lib .
```

## deploy-pockethost

This kit helps you deploy to pockethost.io. See the [deployment guide](/docs/deploying) for more details.

## deploy-fly

This kit helps you deploy to fly.io. See the [deployment guide](/docs/deploying) for more details.
