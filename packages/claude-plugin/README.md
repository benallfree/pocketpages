# PocketPages agent plugin

Agent skill for **building sites with PocketPages**. It covers routing, loaders, middleware, layouts, partials, the PocketBase JSVM, plugins, and deploying to PocketHost. It's for app authors, not for working on the PocketPages framework itself.

## Install

**New projects** get it automatically. `npm create pocketpages` copies the skill into `.claude/skills/pocketpages/` and adds an `AGENTS.md`.

**Existing projects, Claude Code:**

```
/plugin marketplace add benallfree/pocketpages
/plugin install pocketpages@pocketpages
```

**Existing projects, any agent:** copy `skills/pocketpages/` into the project's `.claude/skills/` (or wherever your agent reads skills), or use a skills installer that reads GitHub repos.

## Layout

```
.claude-plugin/plugin.json   # Claude Code plugin manifest
skills/pocketpages/          # the skill (SKILL.md + references/)
```

The marketplace entry lives at the repo root in `.claude-plugin/marketplace.json`.

## Keeping it accurate

The skill describes framework behavior, so update it in the same PR as any behavior change in `packages/pocketpages` or the official plugins. Where the upstream docs and the source disagree, the skill follows the source.
