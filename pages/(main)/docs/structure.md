# Recommended Project Structure

This recommended project structure makes it easy to upload everything in `/app` directly to your production PocketBase instance. It also mirrors the directory structure of [pockethost.io](https://pockethost.io) and PocketBase's sample directory names.

```
package.json
app/
  pb_hooks/
    +boot.pb.js
    index.ejs
  pb_migrations/
pb_data/
  storage/
  data.db
  logs.db
```
