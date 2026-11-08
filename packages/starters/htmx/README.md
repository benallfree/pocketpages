# htmx Starter Kit

This starter kit is based on the [htmx](https://htmx.org/) project. It is designed to help you get started with a minimal, responsive, and mobile-friendly website using PocketPages.

## Installation

```bash
npm create pocketpages@latest htmx my-app
cd my-app
npm i
pocketbase serve --dir=pb_data --dev
```

Or copy the starter without the scaffolding tool: `npx tiged benallfree/pocketpages/packages/starters/htmx my-app`.

## Deploy to Fly.io

This starter includes a `Dockerfile` and `fly.toml` built on the [pocketpages-fly](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) image:

```bash
fly launch --copy-config --name my-app --no-deploy --ha=false
fly deploy
```

See the [pocketpages-fly guide](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) for creating a superuser, secrets and volumes.
