---
title: MFA, sturdier OAuth2, and an auth starter that does it all
description: pocketpages-plugin-auth 0.3.0 adds PocketBase MFA, OAuth2 got a round of fixes, and the auth starter now covers every sign-in method, deployable as-is.
date: 2026-11-08
author: Ben Allfree
tags: auth, plugins, starters, release
---

Authentication got a lot of attention in this release. The auth plugin learned multi-factor sign-in, OAuth2 got a round of fixes, and the auth starter went from "mostly works" to a complete reference you can deploy.

## MFA in the auth plugin (0.3.0)

When MFA is on for a user, PocketBase answers the first sign-in step with a `401` whose `response.mfaId` is set. `signInWithPassword()` and `signInWithOTP()` now accept that id to finish the second step:

```ejs
<%%
  try {
    signInWithPassword(identity, password)
  } catch (e) {
    const mfaId = e?.response?.mfaId
    if (!mfaId) throw e
    // Second step: an emailed one-time code
    const { otpId } = requestOTP(identity)
    // ...later, when the user submits the code:
    signInWithOTP(otpId, code, { mfaId })
  }
%>
```

The two steps can come in either order: password then code, or code then password.

## OAuth2 fixes

- `redirect_uri` is now URL-encoded.
- The PKCE state cookie stays `httpOnly` and is cleared once sign-in completes.
- The plugin no longer quietly depends on micro-dash being loaded.

## Cookies and redirects in core (0.22.4)

Two small fixes in `pocketpages` itself make auth flows behave:

- **`response.cookie()` appends a `Set-Cookie` header instead of replacing it.** Setting several cookies in one request, like signing in while clearing a temporary MFA cookie, now keeps all of them.
- **`redirect()` only adds `?__flash=` when you pass a `message`.** Plain redirects keep clean URLs.

## The auth starter, finished

The [auth starter](https://pocketpages-auth.pockethost.io) now demonstrates every PocketBase sign-in method end to end:

- password, anonymous, OTP and OAuth2 (Google) sign-in
- opt-in MFA, with a per-user toggle on the account page
- email verification, password reset and email change
- OAuth2 pages that show real errors instead of blank pages

It's also safe to deploy now. Credentials no longer live in migrations: `APP_URL`, `SMTP_*`, `MAIL_SENDER_*` and `GOOGLE_CLIENT_*` come from environment variables, and `POCKETBASE_URL` sets where the plugin reaches PocketBase.

```bash
npm create pocketpages   # pick "auth"
```

Read the [auth plugin docs](/docs/plugins/auth), or try the [live demo](https://pocketpages-auth.pockethost.io). It's a public sandbox, so don't use a real password.
