# create-pocketpages

A CLI tool to quickly scaffold new https://PocketPages.dev projects using various starter templates.

## Usage

```bash
# Using npm
npm create pocketpages

# Using bun
bun create pocketpages

# Using yarn
yarn create pocketpages

# Using pnpm
pnpm create pocketpages
```

## Available Starters

- **minimal** - A minimal PocketPages starter with just the basics
- **mvp** - MVP.css starter - A minimalist CSS framework
- **auth** - Complete authentication system with multiple login methods
- **daisyui** - Tailwind CSS with DaisyUI components
- **daisyui-docs** - Documentation site template with DaisyUI and navigation
- **htmx** - HTMX integration for dynamic interactions

## AI agent support

Every new project also gets:

- `.claude/skills/pocketpages/`: the PocketPages authoring skill (from `packages/claude-plugin`)
- `AGENTS.md`: short project rules read by most coding agents (an existing file is left alone)
- `CLAUDE.md`: imports `AGENTS.md` for Claude Code

If the skill can't be downloaded, project creation still succeeds and prints how to install it later.
