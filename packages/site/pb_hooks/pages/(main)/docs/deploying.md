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

1. Install the PocketHost CLI globally (Node.js 20+). You need version 4.2 or later:

```bash
npm i -g pockethost
```

2. Log in with a personal access token from [Account → API Tokens](https://pockethost.io/account/tokens):

```bash
pockethost login
```

3. Link your local project to your PocketHost instance (this writes a `.pockethostconfig` file; commit it):

```bash
pockethost link <instanceName>
```

4. Install your dependencies, then deploy:

```bash
npm install
pockethost deploy
```

Use `pockethost dev` to watch for local changes and deploy them as you work.

> **Upgrading from `phio`?** `phio` is now `pockethost`. Run `npm rm -g phio && npm i -g pockethost`. Your `.phioconfig` (or `pockethost` key in `package.json`) is migrated to `.pockethostconfig` automatically.

> **Packages ship with your deploy.** PocketHost doesn't run `npm install`. Instead, `pockethost deploy` uploads your production `node_modules`: `pocketpages`, every `pocketpages-plugin-*`, and anything else in `dependencies`, plus what they need. `devDependencies` (Tailwind, TypeScript and so on) stay home. It works with npm, pnpm and Bun, and only changed files upload. Run `pockethost deploy --dry-run` to see exactly what will ship.
>
> So make sure every package your pages, loaders and `+config.js` use is in `dependencies`, and install before you deploy. A `Cannot find module` error in `pockethost logs` usually means one wasn't.

### Github Actions Deployment

Create a token with write access to your instance, save it as the `POCKETHOST_TOKEN` repository secret, and add a deploy step to your workflow:

```yaml
- run: npm ci
- run: npx pockethost@latest deploy <instanceName>
  env:
    POCKETHOST_TOKEN: ${{ secrets.POCKETHOST_TOKEN }}
```

Install first (`npm ci` here) so your production `node_modules` is there to ship.

See [Deploy from CI](https://pockethost.io/docs/deploy-from-ci) for more details.

#### Several Apps in One Repo

If one repository holds several apps, each with its own instance, one token with access to all of them is enough. When you add an app later, give the existing token access to its instance with **Edit** at [Account → API Tokens](https://pockethost.io/account/tokens). The token stays the same, so your repository secret doesn't change. Pass each instance's name to `pockethost deploy` from that app's folder:

```yaml
- run: npx pockethost@latest deploy my-site
  working-directory: apps/site
  env:
    POCKETHOST_TOKEN: ${{ secrets.POCKETHOST_TOKEN }}
```

To deploy only the apps that changed, compare the pushed commits (`git diff --name-only ${{ github.event.before }} ${{ github.sha }}`) against each app's folder, then deploy the matches in a matrix job. Redeploy every app when shared code or the lockfile changes.

The PocketPages repository does this for this site and every starter demo. Its [deploy workflow](https://github.com/benallfree/pocketpages/blob/main/.github/workflows/deploy.yml) is a working example you can copy.

## Deploy to Fly.io

Every starter kit includes a `Dockerfile`, `.dockerignore` and `fly.toml` built on the [pocketpages-fly](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) image. The image contains PocketBase, installs your app's npm `dependencies`, and keeps data on a volume at `/pb_data`. For an existing app, copy those three files from any starter.

Install the [Fly CLI](https://fly.io/docs/flyctl/install/), sign in, then from your project folder:

```bash
fly launch --copy-config --name my-app --no-deploy --ha=false
fly deploy
```

The first deploy creates a 1 GB volume that grows automatically. Run a single machine: PocketBase uses SQLite, which allows one writer, and a volume attaches to one machine.

Create your first superuser:

```bash
fly ssh console -C "pocketbase superuser upsert you@example.com 'a-long-password' --dir=/pb_data"
```

Set secrets with `fly secrets set NAME=value` and read them with `env('NAME')`. See the [pocketpages-fly guide](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) for more, and [Custom Domains on Fly + Cloudflare](/docs/speedruns/custom-domain-fly-cloudflare) to add your own domain.
