/// <reference path="../pb_data/types.d.ts" />

// Applies deployment settings from environment variables, so credentials never
// live in git. On PocketHost, set them as instance secrets BEFORE the first
// deploy (migrations run once):
//
//   APP_URL                 public URL, used in email links and OAuth2 redirects
//   APP_NAME                name shown in emails
//   SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_TLS ("true"/"false")
//   MAIL_SENDER_ADDRESS, MAIL_SENDER_NAME
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
//
// Anything unset is left alone, so local development keeps the maildev
// defaults from the init migration. Change settings later in the dashboard.
migrate(
  (app) => {
    const env = (key) => $os.getenv(key)

    const settings = app.settings()
    if (env('APP_URL')) settings.meta.appURL = env('APP_URL')
    if (env('APP_NAME')) settings.meta.appName = env('APP_NAME')
    if (env('MAIL_SENDER_ADDRESS'))
      settings.meta.senderAddress = env('MAIL_SENDER_ADDRESS')
    if (env('MAIL_SENDER_NAME')) settings.meta.senderName = env('MAIL_SENDER_NAME')
    if (env('SMTP_HOST')) {
      settings.smtp.enabled = true
      settings.smtp.host = env('SMTP_HOST')
      settings.smtp.port = parseInt(env('SMTP_PORT') || '587', 10)
      settings.smtp.username = env('SMTP_USERNAME')
      settings.smtp.password = env('SMTP_PASSWORD')
      settings.smtp.tls = env('SMTP_TLS') === 'true'
    }
    app.save(settings)

    if (env('GOOGLE_CLIENT_ID') && env('GOOGLE_CLIENT_SECRET')) {
      const users = app.findCollectionByNameOrId('users')
      users.oauth2.enabled = true
      users.oauth2.providers = [
        {
          name: 'google',
          clientId: env('GOOGLE_CLIENT_ID'),
          clientSecret: env('GOOGLE_CLIENT_SECRET'),
        },
      ]
      app.save(users)
    }
  },
  (app) => {
    // Settings changes are not reverted.
  }
)
