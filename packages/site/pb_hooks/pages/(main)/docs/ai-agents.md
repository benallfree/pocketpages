---
title: AI Coding Agents
description: Give Claude Code, Cursor, Codex, and other coding agents accurate PocketPages knowledge with the official agent skill. New projects include it automatically. Existing projects can install it as a Claude Code plugin or by copying a folder.
---

# AI Coding Agents

Coding agents are good at web frameworks they've seen a lot of. PocketPages isn't one of them yet, and it runs somewhere unusual: inside PocketBase's JavaScript VM, not Node. Without help, agents tend to write `async`/`await`, call `fetch`, read `record.title` instead of `record.get('title')`, or treat `formData` as an object.

The **PocketPages agent skill** fixes that. It's a set of Markdown files that teach an agent how PocketPages actually behaves: routing, loaders, middleware, layouts, partials, the JSVM's limits, the official plugins, and deploying to PocketHost. It's written against the PocketPages source, and it's maintained alongside it.

## New projects: already included

`npm create pocketpages` sets up every new project with:

```
.claude/skills/pocketpages/   # the skill (SKILL.md + references/)
AGENTS.md                     # short project rules most agents read automatically
CLAUDE.md                     # imports AGENTS.md for Claude Code
```

Open the project in your agent and start asking for features. Claude Code loads the skill from `.claude/skills/` when the task needs it. Cursor, Codex, and other agents that read `AGENTS.md` are pointed at the skill from there.

## Existing projects

### Claude Code plugin

```
/plugin marketplace add benallfree/pocketpages
/plugin install pocketpages@pocketpages
```

This installs the skill for you across all your projects, and it updates when the plugin does.

### Copy it into the project

Works with any agent that supports skills, or that you can point at a file:

```bash
npx tiged benallfree/pocketpages/packages/claude-plugin/skills/pocketpages .claude/skills/pocketpages
```

Then add an `AGENTS.md` at the project root that tells the agent to read `.claude/skills/pocketpages/SKILL.md` before editing anything under `pb_hooks/`.

### Agents without skills

For a chat assistant or an agent that browses the web, give it the docs index at [llms.txt](https://raw.githubusercontent.com/benallfree/pocketpages/main/llms.txt), or paste in the skill's [SKILL.md](https://github.com/benallfree/pocketpages/blob/main/packages/claude-plugin/skills/pocketpages/SKILL.md).

## What the skill covers

- **The runtime:** what Goja supports and what it doesn't, the positional `$app` query API, records as Go objects, binding user input safely
- **Routing:** file conventions, route groups, params, and which files are never routable
- **The request lifecycle:** middleware and `next()`, loaders, how `data` merges, JSON detection, layouts and slots, status codes and redirects
- **Templates:** EJS, how `include()` and `resolve()` search `_private/`, `asset()` fingerprinting, `meta()`
- **The full context API,** with exact signatures
- **Plugins:** `+config.js` rules, and what each official plugin adds
- **Deploying:** what ships to PocketHost, secrets, and checking a deploy

Where these docs and the skill disagree, trust the skill. It's checked against the code.

## Deploying from an agent

The skill tells agents how to deploy with the [PocketHost CLI](https://pockethost.io/docs/cli) (`pockethost deploy`). If your agent also has a PocketHost MCP server connected, the skill has it use those tools instead, so it can create instances, set secrets, deploy, and read logs without leaving the conversation.

## Contributing

The skill lives in [`packages/claude-plugin`](https://github.com/benallfree/pocketpages/tree/main/packages/claude-plugin) in the PocketPages repo. If your agent keeps getting something wrong, a short addition to the skill's gotchas usually fixes it for everyone. PRs are welcome.
