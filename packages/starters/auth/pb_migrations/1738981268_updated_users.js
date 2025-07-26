/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_')

    // update collection data
    unmarshal(
      {
        oauth2: {
          enabled: true,
        },
      },
      collection
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('_pb_users_auth_')

    // update collection data
    unmarshal(
      {
        oauth2: {
          enabled: false,
        },
      },
      collection
    )

    return app.save(collection)
  }
)
