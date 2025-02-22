# MPA Auth Demo

This starter kit shows how to do Multi Page App (MPA) auth using PocketPages.

## Installation

```bash
npx tiged benallfree/pocketpages/packages/starters/auth .
cd auth
npm i
pocketbase --dir=pb_data --dev serve
bunx maildev
```

## Notes

### Anonymous Login

Anonymous login only works if Password login is enabled.

### Password Login

Password login is enabled by default in PocketBase.

### OTP Login

OTP login requires a verified email address.

### Using Password Reset

Password Reset requires PocketBase's mail to be configured. The simplest localhost test is as follows:

```
http://localhost:3000/reset-password
```

## App Configuration

> This starter kit is already configured. In your own app, you'll need to update these settings

**Step 1: Configure Mail Settings**

In the PocketBase admin panel, navigate to `Settings > Mail Settings` and set the mail provider info to:

Host: `localhost`
Port: `1025`
User: `(blank)`
Password: `(blank)`

**Step 2: Update Mail Template URLs**

In the PocketBase admin panel, navigate to `Collections > Users > Edit > Options > Mail Templates` and update the URLs as follows:

1. Verification template: `{APP_URL}/auth/confirm/{TOKEN}/verification`
2. Reset Password template: `{APP_URL}/auth/confirm/{TOKEN}/password-reset`
3. Confirm email reset template: `{APP_URL}/auth/confirm/{TOKEN}/email-change`
