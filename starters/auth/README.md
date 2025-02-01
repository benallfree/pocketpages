# MPA Auth Demo

This starter kit shows how to do Multi Page App (MPA) auth using PocketPages.

## Installation

```bash
npx tiged benallfree/pocketpages/starters/auth .
cd auth
npm i
pocketbase --dir=pb_data --dev serve
```

## Notes

### Using Password Reset

Password Reset requires PocketBase's mail to be configured. The simplest localhost test is as follows:

```
bunx maildev
```

#### Configure PocketBase Mail for Testing

**Step 1: Configure Mail Settings**

In the PocketBase admin panel, navitate to `Settings > Mail Settings` and set the mail provider info to:

Host: `localhost`
Port: `1025`
User: `(blank)`
Password: `(blank)`

**Step 2: Update Mail Template URLs**

In the PocketBase admin panel, navigate to `Collections > Users > Edit > Options > Mail Templates` and update the URLs as follows:

1. Verification template: `{APP_URL}/auth/confirm/{TOKEN}/verification`
2. Reset Password template: `{APP_URL}/auth/confirm/{TOKEN}/password-reset`
3. Confirm email reset template: `{APP_URL}/auth/confirm/{TOKEN}/email-change`

```
http://localhost:3000/reset-password
```
