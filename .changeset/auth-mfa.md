---
'pocketpages-plugin-auth': minor
---

Support PocketBase MFA: `signInWithPassword()` and `signInWithOTP()` accept `{ mfaId }` to complete the second step after a first sign-in fails with a 401 whose `response.mfaId` is set.
