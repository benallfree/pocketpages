# DaisyUI + Docs Starter Kit

Demonstrates how to use Markdown pages by creating a docs site. Styling uses **Tailwind CSS** and **DaisyUI** loaded from a CDN, so there is no CSS build step.

## Installation

```bash
npm create pocketpages@latest daisyui-docs my-docs
cd my-docs
npm i
pocketbase serve --dir=pb_data --dev
```

Or copy the starter without the scaffolding tool: `npx tiged benallfree/pocketpages/packages/starters/daisyui-docs my-docs`.

## Styling

`pb_hooks/pages/+layout.ejs` loads daisyUI 5 (with the `cupcake` theme) and the Tailwind CSS v4 browser build from jsDelivr. Use Tailwind and daisyUI classes in your pages and they are generated in the browser.

Add your own CSS in the `<style type="text/tailwindcss">` block in the layout. It supports `@apply` and Tailwind's theme variables. The `prose` styles there stand in for Tailwind's typography plugin, which can't run in the browser build, and cover common Markdown: headings, lists, quotes, code and tables. Add rules there for anything else your docs need.

To switch themes, change the `cupcake.css` link and `data-theme` on `<html>`. See [daisyUI themes](https://daisyui.com/docs/themes/).
