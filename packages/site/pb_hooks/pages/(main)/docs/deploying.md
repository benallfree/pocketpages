---
title: Deploying to Production
description: Deploy PocketPages to pockethost.io with manual or GitHub Actions workflows, or self-host on Fly.io. Includes deployment scripts, environment setup, and configuration steps.
---

# Deploying to Production

PocketPages is easy to deploy. If you follow the [recommended project structure](/docs/structure), everything in `/pb_*` can be deployed.

The two most popular ways to go live with PocketBase are to use [pockethost.io](https://pockethost.io) or to self-host using [Fly.io](https://fly.io).

## Recommended: Deploy to pockethost.io

pockethost.io is the premiere PocketBase hosting service trusted by over 10,000 developers and millions of end users.

In under 30 seconds, you can provision a free instance with unlimited (Fair Use) resources.

### Manual Deployment

The easiest way to deploy is using the [PocketHost CLI](https://pockethost.io/docs/cli). Here's how:

1. Install the PocketHost CLI globally (Node.js 20+):

```bash
npm i -g pockethost
```

2. Log in with a personal access token from [Account → API Tokens](https://app.pockethost.io/account/tokens):

```bash
pockethost login
```

3. Link your local project to your PocketHost instance (this writes a `.pockethostconfig` file; commit it):

```bash
pockethost link <instanceName>
```

4. Deploy your project:

```bash
pockethost deploy
```

Use `pockethost dev` to watch for local changes and deploy them as you work.

> **Upgrading from `phio`?** `phio` is now `pockethost`. Run `npm rm -g phio && npm i -g pockethost`. Your `.phioconfig` (or `pockethost` key in `package.json`) is migrated to `.pockethostconfig` automatically.

> **Note:** PocketHost does not install npm packages. Only `pb_*` folders (never `pb_data`), `package.json`, `bun.lock(b)` and `patches/` are uploaded, so any npm code your hooks need must be bundled into `pb_hooks`.

### Github Actions Deployment

Create a token with write access to your instance, save it as the `POCKETHOST_TOKEN` repository secret, and add a deploy step to your workflow:

```yaml
- run: npx pockethost@latest deploy <instanceName>
  env:
    POCKETHOST_TOKEN: ${{ secrets.POCKETHOST_TOKEN }}
```

See [Deploy from CI](https://pockethost.io/docs/deploy-from-ci) for more details.

## Deploy to Fly.io

_Warning: Self-hosting is an advanced setup. I know Fly pretty well and it still took me an hour._

To set up Fly.io deployment:

```bash
cp -r node_modules/pocketpages/starters/deploy-fly-ga .
```

After this, you should see a `Dockerfile` and `fly.toml`.

Use `fly launch` and `fly deploy` to create a Fly app and deploy it.

For more information, see [Host for Free on Fly.io](https://github.com/pocketbase/pocketbase/discussions/537)
