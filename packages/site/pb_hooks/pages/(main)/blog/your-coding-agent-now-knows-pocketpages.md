---
title: Your coding agent now knows PocketPages
description: Every new project ships with the official PocketPages agent skill, so Claude Code, Cursor, Codex and friends stop writing Node code for a runtime that isn't Node.
date: 2026-11-08
author: Ben Allfree
tags: AI agents, tooling, create-pocketpages
---

Coding agents are great at frameworks they've seen thousands of times. PocketPages isn't one of those yet, and it runs somewhere unusual: inside PocketBase's JavaScript VM (Goja), not Node.

Left to their instincts, agents write code that looks right and doesn't run:

- `async`/`await` and `fetch()` in a runtime that's synchronous
- `record.title` instead of `record.get('title')`
- treating `formData` like a plain object
- inventing a build step

So we wrote down how PocketPages actually works, and now it ships with every project.

## What's new

**`npm create pocketpages` now sets up every project for agents.** Alongside your starter you get:

```
.claude/skills/pocketpages/   # the skill: SKILL.md + references/
AGENTS.md                     # short project rules most agents read automatically
CLAUDE.md                     # imports AGENTS.md for Claude Code
```

Claude Code loads the skill from `.claude/skills/` when a task needs it. Cursor, Codex and other agents that read `AGENTS.md` get pointed at the skill from there. Open the project and start asking for features.

## What the skill teaches

The skill is a set of Markdown files written against the PocketPages source and maintained alongside it:

- **The runtime:** what Goja supports and what it doesn't, the positional `$app` query API, records as Go objects, binding user input safely
- **Routing:** file conventions, route groups, params, and which files are never routable
- **The request lifecycle:** middleware and `next()`, loaders, how `data` merges, layouts and slots, redirects
- **Templates:** EJS, how `include()` and `resolve()` search `_private/`, `asset()` fingerprinting, `meta()`
- **The full context API** with exact signatures, every official plugin, and deploying to PocketHost

Where the docs and the skill disagree, trust the skill. It's checked against the code.

## Already have a project?

In Claude Code, install it as a plugin. It works across all your projects and updates with the plugin:

```
/plugin marketplace add benallfree/pocketpages
/plugin install pocketpages@pocketpages
```

Or copy the skill into any project, for any agent that supports skills:

```bash
npx tiged benallfree/pocketpages/packages/claude-plugin/skills/pocketpages .claude/skills/pocketpages
```

For chat assistants without skills, hand them [llms.txt](https://raw.githubusercontent.com/benallfree/pocketpages/main/llms.txt).

## Help us make it better

If your agent keeps getting something wrong, a one-line addition to the skill's gotchas usually fixes it for everyone. The skill lives in [`packages/claude-plugin`](https://github.com/benallfree/pocketpages/tree/main/packages/claude-plugin), and PRs are welcome. The full setup guide is on the [AI Coding Agents](/docs/ai-agents) page.
