/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const settings = app.settings()
    const smtp = settings.smtp
    smtp.enabled = true
    smtp.host = 'localhost'
    smtp.port = 1025
    app.save(settings)
  },
  (app) => {
    // add down queries...
  }
)
