# Agent instructions

This is a **PocketPages** site: server-rendered EJS pages that run inside PocketBase's JS VM. There is no Node server and no build step.

**Before editing anything under `pb_hooks/`, read `.claude/skills/pocketpages/SKILL.md`** (and its `references/` as needed). It is the source of truth for how this framework behaves, and it corrects several outdated examples in the public docs.

## Essentials

- Pages live in `pb_hooks/pages/`, and the file path is the URL. `+load.js`, `+middleware.js`, `+layout.ejs`, and `+config.js` are special. `_private/` holds partials and modules.
- Server code runs in **Goja, not Node**: everything is synchronous, there is no `fetch` (use `$http.send`), no `fs`/`Buffer`, and only CommonJS packages work.
- Database access goes through `$app` with positional arguments: `$app.findRecordsByFilter('posts', 'slug = {:s}', '', 1, 0, { s })`. Always bind user input with `{:name}`.
- Records are Go objects: use `record.get('field')`, not `record.field`.
- `formData()` and `body()` are functions. `meta('title', 'x')` is a function. There is no `response.status()`.

## Commands

```bash
npm install                            # dependencies are shipped on deploy, so install first
pocketbase serve --dir=pb_data --dev   # local dev at http://localhost:8090; reloads on pb_hooks changes
pockethost deploy                      # deploy to PocketHost (after `pockethost login` + `pockethost link`)
```

Never deploy or commit `pb_data/`. Read secrets with `env('NAME')`, never hard-code them.
