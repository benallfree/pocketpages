/// <reference path="../pb_data/types.d.ts" />

// Opt-in MFA: users who turn on "Require a one-time code" on /account must
// finish every sign-in with a second method (password + emailed code).
migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    users.fields.add(new BoolField({ name: 'mfaEnabled' }))
    users.mfa.enabled = true
    users.mfa.rule = 'mfaEnabled = true'
    app.save(users)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    users.mfa.enabled = false
    users.mfa.rule = ''
    users.fields.removeByName('mfaEnabled')
    app.save(users)
  }
)
