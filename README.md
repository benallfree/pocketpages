# PocketPages

> **_Really fast Server Side pages for PocketBase_**

PocketPages is a lightweight EJS and router engine that runs as a PocketBase JS hook. It's super fast and can render pages <40ms.

Write your web apps like old-school PHP:

```ejs
// pb_hooks/pages/index.ejs
<%= `Hello, world!` %>
```

### >>> [Official docs](https://pocketpages.dev/docs) <<<

## Why did I make this?

- Because when I have a new app idea, I want to make contact with the real world as soon as possible
- Because I want to start simply and grow as needed, in any direction I decide
- Because I want a unified SEO-friendly platform without needing to worry about SSR/SSG/SPA
- Because I miss the good parts of PHP
- Because I think pure client-side reactive frameworks like AlpineJS and HTMLx are a perfect compliment to Server Side pages.
- Send a PR to add your reasons here :)

## Setup

Before running the project, make sure you have the following tools installed:

### 1. Bun

Bun is a fast JavaScript runtime. To install it, run:

```bash
curl -fsSL https://bun.sh/install | bash
```

For more details, see the [official Bun documentation](https://bun.sh/docs/installation).

### 2. PocketBase

PocketBase is a backend server. Download the latest release for your OS from the [PocketBase releases page](https://github.com/pocketbase/pocketbase/releases) and place the binary somewhere in your PATH.

For more details, see the [PocketBase documentation](https://pocketbase.io/docs/).

## Getting Started

To run the project locally:

1. In the root folder, run:

   ```bash
   bun dev
   ```

2. In another terminal, start PocketBase in one of the packages, for example:

   ```bash
   # To run the main site
   cd packages/site
   pocketbase serve --dev
   ```

   or

   ```bash
   # To run a starter kit
   cd packages/starters/minimal
   pocketbase serve --dev
   ```

That's it! Now you can access the project locally.

## Contributing

PR's are welcome.

- Docs
- Core features
- Starter kits
- Showcases
