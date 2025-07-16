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

## Contributing

PR's are welcome.

- Docs
- Core features
- Starter kits
- Showcases

To develop against the starters, install [bun](https://bun.sh/).

- Clone the repo `git clone https://github.com/benallfree/pocketpages`
- Download pocketbase, if you use linux, execute `download-pocketbase.sh` (you may need to `chmod +x ./pocketbase` pocketbase)
- Optionally, place pocketbase into somewhere on your PATH.
- run `bun dev` in a new terminal at repo root, leave open. This leverages bun workspaces and tsup to continually build all packages.
- For developing inside the starters, pocketbase requires a parent node_modules folder. Symbolically link the pb_folders you need to the root of the repo. For example, to develop against the auth starter: at repo root, run `ln -s ./packages/starters/auth/pb_* ./`