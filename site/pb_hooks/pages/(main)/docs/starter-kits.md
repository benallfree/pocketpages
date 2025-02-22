---
title: Starter Kits
description: Pre-configured PocketPages templates including minimal setup, DaisyUI integration, and deployment configurations for PocketHost and Fly.io. Each template provides specific tooling and configurations for different use cases and deployment targets.
---

# Starter Kits

<!-- TOC depthfrom:2 -->

- [minimal](#minimal)
- [daisyui](#daisyui)
- [deploy-pockethost-manual](#deploy-pockethost-manual)
- [deploy-pockethost-ga](#deploy-pockethost-ga)
- [deploy-fly-manual](#deploy-fly-manual)
- [deploy-fly-ga](#deploy-fly-ga)
- [htmx](#htmx)
- [vscode/cursor](#vscodecursor)
- [mvp](#mvp)
- [auth](#auth)

<!-- /TOC -->

The easiest way to get started with PocketPages is to use one of the starter kits.

## minimal

The Minimal starter kit creates the absolute most minimal PocketPages app: a single `index.ejs` home page.

```bash
npx tiged benallfree/pocketpages/starters/minimal .
cd minimal
npm i
pocketbase --dir=pb_data --dev serve
```

Browse to `http://localhost:8090` and with any luck at all, you'll see:

<%- include(`browser.ejs`, { url: `http://localhost:8090`, content: `Hello, world!`}) %>

To start editing, find

```
./pb_hooks/pages/index.ejs
```

Changes appear immediately on the next refresh.

For more detail, see https://github.com/benallfree/pocketpages/blob/master/starters/minimal

## daisyui

The `daisyui` starter kit incorporates Daisy UI and Tailwind.

```bash
npx tiged benallfree/pocketpages/starters/daisyui .
cd daisyui
npm i
pocketbase --dir=pb_data --dev serve
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

## htmx

This kit helps you get started with the [htmx](https://htmx.org/) project. See the [starter kit README](https://github.com/benallfree/pocketpages/blob/master/starters/htmx/README.md) for more details.

```bash
npx tiged benallfree/pocketpages/starters/htmx .
cd htmx
npm i
pocketbase --dir=pb_data --dev serve
```

## vscode/cursor

This kit provides a VSCode/Cursor configuration for PocketPages. See the [starter kit README](https://github.com/benallfree/pocketpages/blob/master/starters/vscode/README.md) for more details.

## mvp

This kit provides a starter kit based on the [MVP.css](https://andybrewer.github.io/mvp/) project. MVP.css is a minimal styling solution for building fast, modern web apps. It takes all the guesswork out of styling your project, leaving you to focus on features and functionality.

```bash
npx tiged benallfree/pocketpages/starters/mvp .
cd mvp
npm i
pocketbase --dir=pb_data --dev serve
```

For more detail, see the [MVP starter kit README](https://github.com/benallfree/pocketpages/blob/master/starters/mvp/README.md).

## auth

This kit demonstrates Multi Page App (MPA) authentication using PocketPages. It includes:

- User registration and login flows
- Password reset functionality
- Email verification
- Email change confirmation
- Local mail testing setup with MailDev

```bash
npx tiged benallfree/pocketpages/starters/auth .
cd auth
npm i
pocketbase --dir=pb_data --dev serve
```

For more detail, see the [auth starter kit README](https://github.com/benallfree/pocketpages/blob/master/starters/auth/README.md).
