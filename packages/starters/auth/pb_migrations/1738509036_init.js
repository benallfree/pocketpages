/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const settings = app.settings()
    const smtp = settings.smtp
    smtp.enabled = true
    smtp.host = 'localhost'
    smtp.port = 1025

    app.save(settings)

    const users = app.findCollectionByNameOrId('users')
    users.oauth2.enabled = true
    users.oauth2.providers = [
      {
        provider: 'google',
        clientId:
          '901325610877-vbketlq7gapo2d2m1b8dq21033mm6b5e.apps.googleusercontent.com',
        clientSecret: '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',
        name: 'google',
      },
    ]
    app.save(users)
  },
  (app) => {
    // add down queries...
  }
)
