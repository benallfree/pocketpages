# pocketpages-fly

A Docker base image for running a PocketPages app on [Fly.io](https://fly.io), or anywhere else that runs Docker. It contains PocketBase and nothing else. Your app's own Dockerfile is one line:

```dockerfile
FROM ghcr.io/benallfree/pocketpages-fly:0.40
```

When your image builds, the base image copies your app into `/app`, runs `npm install --omit=dev`, and starts:

```
pocketbase serve --http=0.0.0.0:8090 --dir=/pb_data --hooksDir=/app/pb_hooks --migrationsDir=/app/pb_migrations --publicDir=/app/pb_public
```

Node and npm are installed only for the install step and removed afterwards, so a typical app image is about 45 MB.

## Tags

Tags follow the PocketBase version:

| Tag      | PocketBase                  |
| -------- | --------------------------- |
| `0.40`   | latest 0.40.x (recommended) |
| `0.40.6` | exactly 0.40.6              |
| `latest` | newest release              |

## Deploying a starter to Fly.io

Every PocketPages starter includes a `Dockerfile`, `.dockerignore` and `fly.toml`. Install the [Fly CLI](https://fly.io/docs/flyctl/install/), sign in, then from the project folder:

```bash
fly launch --copy-config --name my-app --no-deploy --ha=false
fly deploy
```

- `--copy-config` keeps the starter's `fly.toml`, `--name` replaces its app name with yours, and `--ha=false` creates a single machine.
- The first `fly deploy` creates a 1 GB volume for `/pb_data`. It grows automatically up to 10 GB when it is 80% full; change the `[mounts]` section to adjust.
- Run **one** machine. PocketBase uses SQLite, which allows a single writer, and a Fly volume attaches to one machine. Don't scale the app beyond one machine.

Create your first superuser (the dashboard is at `https://my-app.fly.dev/_/`):

```bash
fly ssh console -C "pocketbase superuser upsert you@example.com 'a-long-password' --dir=/pb_data"
```

Set secrets your app reads with `env()`:

```bash
fly secrets set SMTP_PASSWORD=...
```

To deploy on every push to `main`, add a [GitHub Actions workflow](https://fly.io/docs/app-guides/continuous-deployment-with-github-actions/) that runs `flyctl deploy --remote-only` with a `FLY_API_TOKEN` secret.

## Adding it to your own app

Copy `Dockerfile`, `.dockerignore` and `fly.toml` from any starter into your project. The project needs a `package.json` that lists `pocketpages` and any plugins in `dependencies`, and a `pb_hooks` folder. `pb_migrations` and `pb_public` are optional.

To run something different, override `CMD` in your Dockerfile. The entrypoint is `pocketbase`, so the base command line above is the default `CMD`.

## Running locally

```bash
docker build -t my-app .
docker run -p 8090:8090 -v my-app-data:/pb_data my-app
```

## Building the image

The image is built and pushed to GitHub Container Registry by `.github/workflows/pocketpages-fly.yml`, for `linux/amd64` and `linux/arm64`. Change `PB_VERSION` in the Dockerfile to move to a new PocketBase release, or run the workflow by hand with a version.
