---
title: Deploying to PocketHost just got simpler
description: phio is now the pockethost CLI, version 4.2 ships your node_modules for you, and every starter kit runs live on PocketHost.
date: 2026-11-08
author: Ben Allfree
tags: deploying, PocketHost, starters
---

Going live with PocketPages is now four commands, and the tricky part about npm packages is handled for you.

## phio is now `pockethost`

The deploy CLI has a new name. If you used `phio`, swap it out:

```bash
npm rm -g phio && npm i -g pockethost
```

Your `.phioconfig` (or the `pockethost` key in `package.json`) migrates to `.pockethostconfig` automatically.

## Four commands to production

```bash
pockethost login                 # paste a token from pockethost.io/account/tokens
pockethost link <instanceName>   # writes .pockethostconfig; commit it
npm install
pockethost deploy
```

While you work, `pockethost dev` watches for changes and deploys them.

## Your packages ship with the deploy (4.2+)

PocketHost doesn't run `npm install`. Until now that made npm packages awkward, and the old advice to bundle them into `pb_hooks` never worked for PocketPages, since plugins load by name.

Starting with CLI 4.2, `pockethost deploy` uploads your **production** `node_modules`: `pocketpages`, every `pocketpages-plugin-*`, and anything else in `dependencies`, plus what they need. `devDependencies` stay home. It works with npm, pnpm and Bun, and only changed files upload.

Two habits make it smooth:

1. Put everything your pages, loaders and `+config.js` use in `dependencies`.
2. Install before you deploy. A `Cannot find module` error in `pockethost logs` usually means you skipped one of these.

Not sure what will ship? Run `pockethost deploy --dry-run`.

## Deploying from GitHub Actions

Save a token as the `POCKETHOST_TOKEN` secret and add two steps:

```yaml
- run: npm ci
- run: npx pockethost@latest deploy <instanceName>
  env:
    POCKETHOST_TOKEN: ${{ secrets.POCKETHOST_TOKEN }}
```

The old FTP-based deploy starters are gone. The CLI replaces both of them.

## See every starter running

Each starter kit now runs live on PocketHost, deployed straight from the repo, so you can click around before you pick one:

| Starter  | Live demo                                                                        |
| -------- | -------------------------------------------------------------------------------- |
| minimal  | [pocketpages-minimal.pockethost.io](https://pocketpages-minimal.pockethost.io)   |
| mvp      | [pocketpages-mvp.pockethost.io](https://pocketpages-mvp.pockethost.io)           |
| auth     | [pocketpages-auth.pockethost.io](https://pocketpages-auth.pockethost.io)         |
| htmx     | [pocketpages-htmx.pockethost.io](https://pocketpages-htmx.pockethost.io)         |
| datastar | [pocketpages-datastar.pockethost.io](https://pocketpages-datastar.pockethost.io) |

The full list is on [Starter Kits](/docs/starter-kits), and the complete guide is in [Deploying to Production](/docs/deploying).
