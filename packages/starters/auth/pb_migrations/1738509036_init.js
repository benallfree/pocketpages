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
    // OAuth2 providers come from env vars; see the *_env_config.js migration.
    app.save(users)
  },
  (app) => {
    // add down queries...
  }
)
