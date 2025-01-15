---
title: 'Upgrading PocketPages'
description: 'Step-by-step commands for upgrading PocketPages using Bun, npm, Yarn, or pnpm package managers. Includes specific update commands for each package manager to ensure installation of the latest version.'
---

# Upgrading PocketPages

Keeping PocketPages up to date ensures you have access to the latest features, improvements, and security patches. The upgrade process is simple and varies slightly depending on your package manager.

<%- include(`/_include/npm.ejs`, { commands: {
bun: 'bun update pocketpages@next',
pnpm: 'pnpm update pocketpages@next',
yarn: 'yarn upgrade pocketpages@next',
npm: 'npm update pocketpages@next'
}}) %>

## v0.10 migration notes
