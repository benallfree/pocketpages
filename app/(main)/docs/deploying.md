# Deploying to Production

PocketPages is easy to deploy. If you follow the [recommended project structure](/docs/structure), everything in `/app` can be deployed.

The two most popular ways to go live with PocketBase are to use [pockethost.io](https://pockethost.io) or to self-host using [Fly.io](https://fly.io).

## Recommended: Deploy to pockethost.io

pockethost.io is the premiere PocketBase hosting service trusted by over 10,000 developers and millions of end users.

In under 30 seconds, you can provision a free instance with unlimited (Fair Use) resources.

Once you have your instance URL (`something.pockethost.io`), you can choose either manual or Github Actions deployment (or both).

### Manual Deployment

Start by copying the PocketHost deployment utility script:

```bash
bunx pocketpages degit . --template=deploy-pockethost-manual
bun add -D @samkirkland/ftp-deploy dotenv env-vars
```

Once you have `deploy.ts` and its dependencies installed, create an `.env` file and edit to suit:

```bash
cp .env-deploy-pockethost .env
```

Finally, try a deployment:

```bash
bun ./deploy-pockethost.ts
```

Optional add support in `package.json`:

```json
"scripts": {
    "deploy": "bun ./deploy.ts"
  },
```

```bash
bun run deploy
```

### Github Actions Deployment

You can also use a Github Actions configuration to deploy on every push.

```bash
bunx pocketpages degit . --template=deploy-pockethost-ga
```

You'll need to set a few Github secrets. Look in the YAML file for details.

## Deploy to Fly.io

_Warning: Self-hosting is an advanced setup. I know Fly pretty well and it still took me an hour._

```bash
bunx pocketpages degit . --template=deploy-fly-ga .
```

After this, you should see a `Dockerfile` and `fly.toml`.

Use `fly launch` and `fly deploy` to create a Fly app and deploy it.

For more information, see [Host for Free on Fly.io](https://github.com/pocketbase/pocketbase/discussions/537)
