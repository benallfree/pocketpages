---
title: Deploying to Production
description: Deploy PocketPages to pockethost.io with manual or GitHub Actions workflows, or self-host on Fly.io. Includes deployment scripts, environment setup, and configuration steps.
---

# Deploying to Production

PocketPages is easy to deploy. If you follow the [recommended project structure](/docs-next/structure), everything in `/pb_*` can be deployed.

The two most popular ways to go live with PocketBase are to use [pockethost.io](https://pockethost.io) or to self-host using [Fly.io](https://fly.io).

## Recommended: Deploy to pockethost.io

pockethost.io is the premiere PocketBase hosting service trusted by over 10,000 developers and millions of end users.

In under 30 seconds, you can provision a free instance with unlimited (Fair Use) resources.

### Manual Deployment

The easiest way to deploy is using the PocketHost.IO CLI utility (PHIO). Here's how:

1. Install the PHIO CLI globally:

```bash
npm i -g phio
```

2. Login to your PocketHost account:

```bash
phio login
```

3. Link your local project to your PocketHost instance:

```bash
phio link <instanceName>
```

4. Deploy your project:

```bash
phio deploy
```

### Github Actions Deployment

To set up automated deployments using Github Actions:

```bash
cp -r node_modules/pocketpages/starters/deploy-pockethost-ga .
```

You'll need to set a few Github secrets. Look in the YAML file for details.

## Deploy to Fly.io

_Warning: Self-hosting is an advanced setup. I know Fly pretty well and it still took me an hour._

To set up Fly.io deployment:

```bash
cp -r node_modules/pocketpages/starters/deploy-fly-ga .
```

After this, you should see a `Dockerfile` and `fly.toml`.

Use `fly launch` and `fly deploy` to create a Fly app and deploy it.

For more information, see [Host for Free on Fly.io](https://github.com/pocketbase/pocketbase/discussions/537)
