# DaisyUI PocketPages Starter Kit

This setup provides a minimal **PocketPages** app styled with **Tailwind CSS** and **DaisyUI**, loaded from a CDN. There is no CSS build step.

## Installation

```bash
npm create pocketpages@latest daisyui my-app
cd my-app
npm i
pocketbase serve --dir=pb_data --dev
```

Or copy the starter without the scaffolding tool: `npx tiged benallfree/pocketpages/packages/starters/daisyui my-app`.

## Styling

`pb_hooks/pages/+layout.ejs` loads daisyUI 5 (with the `cupcake` theme) and the Tailwind CSS v4 browser build from jsDelivr. Use Tailwind and daisyUI classes in your pages and they are generated in the browser.

Add your own CSS in the `<style type="text/tailwindcss">` block in the layout. It supports `@apply` and Tailwind's theme variables. The `prose` styles there stand in for Tailwind's typography plugin, which can't run in the browser build.

To switch themes, change the `cupcake.css` link and `data-theme` on `<html>`. See [daisyUI themes](https://daisyui.com/docs/themes/).

## Deploy to Fly.io

This starter includes a `Dockerfile` and `fly.toml` built on the [pocketpages-fly](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) image:

```bash
fly launch --copy-config --name my-app --no-deploy --ha=false
fly deploy
```

See the [pocketpages-fly guide](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) for creating a superuser, secrets and volumes.
