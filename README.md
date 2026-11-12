# PocketPages 0.x (archived)

**PocketPages v1 is built into [PocketBase CE](https://github.com/pockethost/pocketbase).** This repository holds the
npm-based PocketPages 0.x. It's archived: no new releases, and the npm packages (`pocketpages`, `create-pocketpages`,
`pocketpages-plugin-*`) are deprecated.

```bash
brew install pockethost/tap/pocketbase
pocketbase pages create myapp
cd myapp
pocketbase serve --dir ./pb_data
```

- Docs: [pocketpages.dev](https://pocketpages.dev)
- Source: [`ext/pages`](https://github.com/pockethost/pocketbase/tree/main/ext/pages) in PocketBase CE
- Moving a 0.x app: [pocketpages.dev/docs/moving-from-0x](https://pocketpages.dev/docs/moving-from-0x)

Apps on 0.x keep running where they run today; the published packages stay installable.
