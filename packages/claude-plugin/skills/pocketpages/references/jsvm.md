# The PocketBase JSVM (Goja)

PocketPages code runs in PocketBase's embedded JS engine, **Goja**. It's neither Node nor a browser. Most bugs an agent introduces come from forgetting this.

## What exists, and what doesn't

| You might reach for                             | Use instead                                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `async`/`await`, Promises, `fetch`              | Everything is synchronous. `$http.send({ url, method, headers, body, timeout })` returns `{ statusCode, headers, json, body }` |
| `fs`, `path`                                    | `$os.readFile`, `$os.writeFile`, `$os.readDir`, `$filepath.join`, `$filepath.base`, …                                          |
| `Buffer`, `crypto`                              | `$security.sha256`, `$security.hs256`, `$security.randomString(n)`, `$security.encrypt/decrypt`                                |
| `setTimeout`, `setInterval`                     | `cronAdd(name, '*/5 * * * *', fn)` in a `pb_hooks/*.pb.js` file. There are no timers in request code                           |
| `process.env.X`                                 | `env('X')` (works everywhere `process.env` does, returns `''` when unset)                                                      |
| `console.log`                                   | `dbg()`/`info()`/`warn()`/`error()`. Logs show in the PocketBase terminal and the admin Logs UI                                |
| `import x from 'y'`                             | `const x = require('y')`. CommonJS only                                                                                        |
| PocketBase JS SDK (`pb.collection().getList()`) | `$app.findRecordsByFilter(...)`. The SDK only works through `pocketpages-plugin-js-sdk` and makes HTTP calls to yourself       |

Modern syntax is mostly fine (arrow functions, `const`/`let`, destructuring, template literals, spread, optional chaining, classes). The real limits are the runtime APIs above, not syntax.

## npm packages

A package works if it is **CommonJS, pure JS, synchronous, and touches no Node/browser built-ins**. ESM-only packages fail at `require`. Packages using `fs`, `stream`, `http`, `crypto`, or timers fail at runtime. Put them in `dependencies` (PocketHost ships production `node_modules`; see deploy.md). When unsure, prefer a tiny local helper in `_private/`.

## Records: the #1 footgun

`$app` returns Go `core.Record` objects, not plain JS objects.

```js
const post = $app.findRecordById('posts', id)
post.get('title') // ✔
post.title // ✘ undefined
post.id // ✔ (id is special)
post.getString('status')
post.getInt('views')
post.getBool('draft')
post.getDateTime('created')
post.set('views', post.getInt('views') + 1)
$app.save(post)
post.publicExport() // plain object of visible fields (for JSON responses)
```

Returning records from a JSON endpoint: `return posts.map((p) => p.publicExport())`, or build objects explicitly. Don't return raw records.

## Querying

Finder functions take **positional** arguments:

```js
// (collection, filter, sort='', limit=0, offset=0, params?)
$app.findRecordsByFilter(
  'posts',
  'author = {:uid} && published = true',
  '-created',
  20,
  0,
  { uid: auth.id }
)

// (collection, filter, params?): throws if none
$app.findFirstRecordByFilter('users', 'email = {:email}', { email })

$app.findRecordById('posts', id) // throws if missing
$app.findAuthRecordByEmail('users', email) // throws if missing
$app.countRecords('posts', $dbx.hashExp({ published: true }))
$app.findRecordsByIds('posts', ids)
```

- **Not-found throws.** Wrap single-record lookups in `try/catch` and turn the error into a 404.
- **Always bind** user input with `{:name}` params (filters) or `$dbx` expressions. Never use string interpolation (`id = "${params.id}"`, which appears in older docs, is an injection risk).
- Filter syntax is PocketBase's filter syntax (`=`, `!=`, `~`, `&&`, `||`, relation dot-paths). `@request.*` macros don't apply. You're not inside an API request rule.
- `expand`: `$app.expandRecord(record, ['author'], null)`, then `record.expandedOne('author')`.

Raw SQL when you need it:

```js
const rows = arrayOf(new DynamicModel({ id: '', total: 0 }))
$app
  .db()
  .newQuery('SELECT author AS id, COUNT(*) AS total FROM posts GROUP BY author')
  .all(rows)
```

## Writing

```js
const col = $app.findCollectionByNameOrId('posts')
const rec = new Record(col)
rec.set('title', body.title)
rec.set('author', auth.id)
$app.save(rec) // validates; throws on failure
$app.delete(rec)

$app.runInTransaction((txApp) => {
  // use txApp inside, not $app
  txApp.save(a)
  txApp.save(b)
})
```

Validation errors throw. Catch them in `+post.js` and return `{ error, values: body }` to re-render the form.

**API rules don't apply.** `$app` calls run as superuser. Enforce authorization yourself in middleware and loaders (check `auth`, ownership, roles).

## Files

Uploading from a form: `$filesystem.fileFromMultipart(header)` or, simpler, `rec.set('avatar', e.findUploadedFiles('avatar'))` using `request.event`. Serving: link to PocketBase's `/api/files/<collection>/<id>/<filename>`.

## Email

```js
const msg = new MailerMessage({
  from: { address: $app.settings().meta.senderAddress },
  to: [{ address: to }],
  subject,
  html,
})
$app.newMailClient().send(msg)
```

## Where code may live

- Request-time code: `pages/**` (templates, `+*.js`, `_private/*.js`).
- Boot-time hooks, crons, custom PocketBase routes, and record hooks: `pb_hooks/*.pb.js` (standard PocketBase JSVM). Each handler runs in its own isolated VM, so `require()` what you need **inside** the handler.
- Schema: `pb_migrations/*.js` (generate in the admin UI with `--dev`, or write them by hand). Deploy migrations with the app.

Docs: https://pocketbase.io/docs/js-overview/ · DB: https://pocketbase.io/docs/js-database/ · Records: https://pocketbase.io/docs/js-records/ · Types: https://pocketbase.io/jsvm/ (also `pb_data/types.d.ts` locally).
