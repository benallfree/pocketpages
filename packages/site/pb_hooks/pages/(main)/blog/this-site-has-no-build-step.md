---
title: This site has no build step anymore
description: pocketpages.dev dropped Tailwind and daisyUI for one hand-written stylesheet. Modern CSS covers what we needed, and edit-reload is back.
date: 2026-11-08
author: Ben Allfree
tags: no-build, CSS, site
---

PocketPages is all about no-build: write a file, reload, see it. Until this week, our own website didn't follow that rule. Every style change went through the Tailwind CLI and a daisyUI plugin, producing a 136 KB stylesheet we had to remember to rebuild.

Now it's one hand-written file. At the switch it was **22 KB, about 5 KB gzipped, with no build.**

## Modern CSS covers it

A few years ago, Tailwind was filling real gaps. Today the browser handles most of what we used it for:

- **Custom properties** hold the theme. The whole palette is a dozen `--color-*` variables. When we moved this site from a dark theme to the light one you're reading now, we changed those values and nothing else.
- **Native nesting** keeps component styles together without a preprocessor.
- **`@layer`** orders reset, tokens, layout, components and utilities, so specificity fights go away.
- **`color-mix()`** replaces opacity utilities like `text-base-content/70`.
- **`popover`** gives us the mobile menu, with light-dismiss and Esc to close, with no JavaScript.

Here's what a card looks like now. One variable picks its color, and the tint, border and icon follow:

```css
.card {
  --tone: var(--color-base-content);
  border: 1px solid color-mix(in oklab, var(--tone) 20%, transparent);
  background: linear-gradient(
    to bottom right,
    color-mix(in oklab, var(--tone) 10%, transparent),
    color-mix(in oklab, var(--tone) 5%, transparent)
  );
  &.accent {
    --tone: var(--color-accent);
  }
}
```

## The markup got shorter too

Utility classes put the styling in the HTML. The landing page had list items like this one, repeated a dozen times:

```html
<li class="flex items-start space-x-3">
  <div class="size-5 bg-success/20 rounded-full flex items-center justify-center mt-0.5">
    <div class="size-2 bg-success rounded-full"></div>
  </div>
  ...
</li>
```

Now it's a plain `<li>` inside a `.checklist`, and the dot is a `::before` with a radial gradient.

## What we gave up

Being honest about the trade-offs:

- **No design system for free.** daisyUI's components were handy. We rebuilt the handful we used (cards, buttons, alerts, a fake browser window) ourselves. The whole stylesheet came to about 900 lines.
- **No typography plugin.** We wrote our own `.prose` styles for the docs. It took about 120 lines, and they're tuned for what we actually render.

That's a fair price for a site you can edit with nothing but a text editor and a browser.

## Should you do this?

If your project already uses Tailwind and you're happy, keep it. The `daisyui` starter isn't going anywhere. But if you picked PocketPages to avoid build steps, the CSS doesn't need one either. View source on this page: it's all in `site.css`.
