# MPA Auth Demo

This starter kit shows how to do Multi Page App (MPA) auth with PocketPages and PocketBase's built-in auth: password, anonymous, one-time codes (OTP), OAuth2, and opt-in two-step verification (MFA). It also covers email verification, password reset, and email change.

## Installation

```bash
npm create pocketpages@latest auth my-auth-app
cd my-auth-app
npm i
pocketbase serve --dir=pb_data --dev    # run from the project folder
```

In a second terminal, start maildev to catch outgoing mail at http://localhost:1080:

```bash
bunx maildev
```

Or copy the starter without the scaffolding tool: `npx tiged benallfree/pocketpages/packages/starters/auth my-auth-app`.

Mail goes to maildev (`localhost:1025`) by default, so every email flow works locally without a real mail provider.

## Sign-in methods

| Method    | Notes                                                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Password  | `/auth/register`, then `/auth/login`                                                                                                                                                 |
| Anonymous | Creates a throwaway passwordless account. Needs password auth enabled                                                                                                                |
| OTP       | Emails a one-time code. Works for unverified users too, and a successful OTP sign-in marks the email verified. Requesting a code for an unknown email creates a passwordless account |
| OAuth2    | Shows a button per configured provider. Google is configured from env vars (below)                                                                                                   |
| MFA       | Opt-in per user from `/account`. When it's on, signing in takes a password **and** an emailed code, in either order (`/auth/login/mfa`)                                              |

Email flows: `/auth/verify` (resend verification), `/auth/forgot` → `/auth/confirm/{token}/password-reset`, and `/account/change-email` → `/auth/confirm/{token}/email-change`.

## Configuration

Migrations set everything up. Settings that need credentials or a public URL come from environment variables, read once when the migrations run (`pb_migrations/*_env_config.js`):

| Variable                                                               | Purpose                                                                                                    |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `APP_URL`                                                              | Public URL, used in email links and the OAuth2 redirect                                                    |
| `APP_NAME`                                                             | App name shown in emails                                                                                   |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_TLS` | Outgoing mail. Unset means local maildev                                                                   |
| `MAIL_SENDER_ADDRESS`, `MAIL_SENDER_NAME`                              | The "From" address                                                                                         |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`                             | Google OAuth2. Unset means no OAuth2 providers                                                             |
| `POCKETBASE_URL`                                                       | Where the auth plugin reaches PocketBase's API (read by `+config.js`). Defaults to `http://localhost:8090` |

For Google, add `<APP_URL>/auth/oauth/confirm` as an authorized redirect URI in the Google Cloud console.

## Deploying to PocketHost

Set the variables as instance secrets **before the first deploy**, because the migrations only run once:

```bash
pockethost create my-auth-app --link
pockethost secrets set APP_URL=https://my-auth-app.pockethost.io POCKETBASE_URL=https://my-auth-app.pockethost.io
pockethost secrets set SMTP_HOST=... SMTP_PORT=587 SMTP_USERNAME=... MAIL_SENDER_ADDRESS=...
pockethost secrets set SMTP_PASSWORD GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET   # prompts for each value
pockethost deploy
```

After the first deploy, change these settings in the PocketBase dashboard instead.

## Email templates

The migrations point PocketBase's email templates at this app's pages:

1. Verification: `{APP_URL}/auth/confirm/{TOKEN}/verification`
2. Password reset: `{APP_URL}/auth/confirm/{TOKEN}/password-reset`
3. Email change: `{APP_URL}/auth/confirm/{TOKEN}/email-change`

If you build your own app, set the same URLs under `Collections > users > Options > Mail templates`.

## Deploy to Fly.io

This starter includes a `Dockerfile` and `fly.toml` built on the [pocketpages-fly](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) image:

```bash
fly launch --copy-config --name my-app --no-deploy --ha=false
fly deploy
```

See the [pocketpages-fly guide](https://github.com/benallfree/pocketpages/tree/main/docker/pocketpages-fly) for creating a superuser, secrets and volumes.
