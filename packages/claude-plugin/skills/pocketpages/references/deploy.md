# Deploying

PocketPages is just PocketBase hooks, so deploying means deploying a PocketBase instance's code folders.

## What to ship

| Ship                                                                      | Never ship                             |
| ------------------------------------------------------------------------- | -------------------------------------- |
| `pb_hooks/` (includes `pages/`), `pb_migrations/`, `pb_public/` (if used) | `pb_data/` (your local DB and uploads) |
| `package.json` + lockfile, `patches/`                                     | `.env` and other secrets               |
| production `node_modules` (the PocketHost CLI does this for you)          | `devDependencies`                      |

Pre-flight checklist:

1. `pocketpages` and every `pocketpages-plugin-*` used in `+config.js` are in `dependencies`.
2. Dependencies are installed locally (`npm install` / `bun install`).
3. `pb_hooks/pocketpages.pb.js` (or similar) contains `require('pocketpages')`.
4. Secrets are read via `env()` and are **not** in any file.
5. Schema changes exist as files in `pb_migrations/`. Collections created by hand in local admin won't exist in production otherwise.
6. `debug` in `+config.js` is off, or driven by `env()`.

## PocketHost (recommended)

### With the PocketHost MCP server

If PocketHost MCP tools are available in the session, prefer them: list or create the instance, deploy the project directory, set secrets, and read logs to confirm boot. Confirm the target instance with the user before the first deploy to it, because a deploy **replaces** the instance's code set (files under `pb_*` missing locally are deleted; `pb_data` is untouched).

### With the CLI

```bash
npm i -g pockethost             # Node 20+
pockethost login                # paste a personal access token (pockethost.io/account/tokens)
pockethost create my-app --link # or: pockethost link <existing-instance>   (writes .pockethostconfig, so commit it)
pockethost secrets set STRIPE_SECRET_KEY   # prompts for the value
pockethost deploy               # manifest diff, upload, atomic swap, restart
pockethost logs                 # look for "pocketpages startup" and any boot errors
```

- `pockethost dev` watches and deploys on change, which suits iterating against a real instance.
- `--no-node-modules` skips shipping `node_modules` (keeps what's on the instance).
- Changes confined to `pb_public/` don't restart the instance. Anything else does.
- Custom domain: `pockethost domain set www.example.com`, then point DNS (see https://pocketpages.dev/docs/speedruns/custom-domain-pockethost).

### From CI (GitHub Actions)

```yaml
- run: npm ci
- run: npx pockethost@latest deploy my-app
  env:
    POCKETHOST_TOKEN: ${{ secrets.POCKETHOST_TOKEN }}
```

## Fly.io (self-hosted)

Every starter includes a `Dockerfile` (`FROM ghcr.io/benallfree/pocketpages-fly:0.40`), `.dockerignore` and `fly.toml`; copy them from any starter into an existing app. The base image installs the app's npm `dependencies` and serves with `--dir=/pb_data`.

- First deploy: `fly launch --copy-config --name my-app --no-deploy --ha=false`, then `fly deploy`. The `fly.toml` mounts a volume at `/pb_data`.
- Run exactly one machine: SQLite allows one writer and a volume attaches to one machine.
- Superuser: `fly ssh console -C "pocketbase superuser upsert EMAIL PASS --dir=/pb_data"`.
- Secrets: `fly secrets set NAME=value`, read with `env('NAME')`.

Guide: https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly

## After deploying

- Open the site and one dynamic route. Check `pockethost logs` (or `fly logs`) for `Error loading config file`, `Invalid config key`, `Cannot find module`, or stack traces.
- `Cannot find module 'pocketpages-plugin-x'` means the package is missing from `dependencies` or wasn't installed before deploying.
- A blank page or generic 500 with `debug: false`: temporarily set `PP_DEBUG=1` (if config reads it), or check the logs, which always include the error.
