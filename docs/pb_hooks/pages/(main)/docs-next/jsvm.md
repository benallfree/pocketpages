---
title: JavaScript API
description: PocketBase's JavaScript runtime environment capabilities, limitations, and examples for database operations, with details on NPM package compatibility and available APIs.
---

# JavaScript API

PocketBase's JavaScript runtime environment is neither Browser nor NodeJS. As such, it lacks Web APIs and NodeJS APIs such as `Buffer` and `require('fs')`.

There is [extensive documentation](https://pocketbase.io/docs-next/js-overview/) covering many aspects of extending PocketBase with JS hooks. You'll probably be most concerned with [database operations](https://pocketbase.io/docs-next/js-database/) and higher-level [record operations](https://pocketbase.io/docs-next/js-records/), like this:

```js
const records = $app
  .dao()
  .findRecordsByExpr(
    'articles',
    $dbx.exp('LOWER(username) = {:username}', { username: 'John.Doe' }),
    $dbx.hashExp({ status: 'pending' })
  )
```

Going even deeper, look at the [PocketBase JSVM docs](https://pocketbase.io/jsvm/index.html) to see available APIs. It's a little hard to understand, so hopefully the examples we provide will help to fill in any unfamiliar concepts.

## But can I use my favorite NPM package?

Probably not, but maybe you're luckier than I am. Any NPM modules that work as pure EcmaScript will also work inside PocketBase, as long as they are CommonJS.
