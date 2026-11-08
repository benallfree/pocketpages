import { existsSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const SKILL_SOURCE =
  'benallfree/pocketpages/packages/claude-plugin/skills/pocketpages'

const writeIfMissing = (path, content) => {
  if (existsSync(path)) return false
  writeFileSync(path, content)
  return true
}

/**
 * Adds AI agent support to a freshly created project:
 * - `.claude/skills/pocketpages/`: the PocketPages authoring skill
 * - `AGENTS.md`: short project rules read by most coding agents
 * - `CLAUDE.md`: imports AGENTS.md for Claude Code
 *
 * Never fails project creation. A failed skill download only prints a warning.
 *
 * @param {string} targetDir
 * @param {{ clone: (source: string, dest: string) => Promise<void> }} deps
 */
export async function installAgentSupport(targetDir, { clone }) {
  const skillDir = join(targetDir, '.claude', 'skills', 'pocketpages')
  try {
    await clone(SKILL_SOURCE, skillDir)
    console.log('🤖 Added PocketPages agent skill (.claude/skills/pocketpages)')
  } catch (error) {
    console.warn(
      `⚠️  Could not add the PocketPages agent skill: ${error.message}\n` +
        '   Install it later with: /plugin marketplace add benallfree/pocketpages'
    )
  }

  const agentsTemplate = readFileSync(
    join(__dirname, 'templates', 'AGENTS.md'),
    'utf8'
  )
  if (writeIfMissing(join(targetDir, 'AGENTS.md'), agentsTemplate)) {
    console.log('🤖 Added AGENTS.md')
  }
  writeIfMissing(join(targetDir, 'CLAUDE.md'), '@AGENTS.md\n')
}
