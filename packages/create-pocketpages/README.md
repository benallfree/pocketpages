# create-pocketpages

> **PocketPages 0.x is retiring.** PocketPages v1 is built into [PocketBase CE](https://github.com/pockethost/pocketbase):
> `brew install pockethost/tap/pocketbase`, then `pocketbase pages create myapp`. This npm package gets no new
> releases. Apps on 0.x keep running where they run today. Moving an app:
> [pocketpages.dev/docs/moving-from-0x](https://pocketpages.dev/docs/moving-from-0x).

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

| Starter          | Description                                                                         | Live demo                                      |
| ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| **minimal**      | A minimal PocketPages starter with just the basics                                  | https://pocketpages-minimal.pockethost.io      |
| **mvp**          | MVP.css starter, a minimalist CSS framework                                         | https://pocketpages-mvp.pockethost.io          |
| **auth**         | Every PocketBase sign-in method, plus verification, password reset and email change | https://pocketpages-auth.pockethost.io         |
| **daisyui**      | Tailwind CSS with DaisyUI components                                                | https://pocketpages-daisyui.pockethost.io      |
| **daisyui-docs** | Documentation site template with DaisyUI and navigation                             | https://pocketpages-daisyui-docs.pockethost.io |
| **htmx**         | HTMX integration for dynamic interactions                                           | https://pocketpages-htmx.pockethost.io         |
| **datastar**     | Realtime chat and counter using Datastar                                            | https://pocketpages-datastar.pockethost.io     |

## AI agent support

Every new project also gets:

- `.claude/skills/pocketpages/`: the PocketPages authoring skill (from `packages/claude-plugin`)
- `AGENTS.md`: short project rules read by most coding agents (an existing file is left alone)
- `CLAUDE.md`: imports `AGENTS.md` for Claude Code

If the skill can't be downloaded, project creation still succeeds and prints how to install it later.
