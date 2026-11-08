#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import { dirname, join } from 'path'
import tiged from 'tiged'
import { fileURLToPath } from 'url'
import { installAgentSupport } from './agents.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load starters configuration with fallback
async function loadStartersConfig() {
  const localStartersConfigPath = join(__dirname, 'starters.json')

  try {
    // First attempt to fetch from GitHub
    const response = await fetch(
      'https://raw.githubusercontent.com/benallfree/pocketpages/main/packages/create-pocketpages/starters.json'
    )
    if (response.ok) {
      const startersConfig = await response.json()
      console.log('📥 Loaded starters configuration from GitHub')
      return startersConfig
    }
  } catch (error) {
    console.log('📥 Could not fetch from GitHub, using local configuration')
  }

  // Fallback to local file
  const startersConfig = JSON.parse(
    readFileSync(localStartersConfigPath, 'utf8')
  )
  console.log('📥 Loaded starters configuration from local file')
  return startersConfig
}

// Load starters configuration
const startersConfig = await loadStartersConfig()
const STARTERS = startersConfig.starters

function cleanupWorkspaceDependencies(targetDir) {
  const packageJsonPath = join(targetDir, 'package.json')

  if (!existsSync(packageJsonPath)) {
    return
  }

  try {
    const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(packageJsonContent)

    // Clean up dependencies
    if (packageJson.dependencies) {
      for (const [name, version] of Object.entries(packageJson.dependencies)) {
        if (typeof version === 'string' && version.startsWith('workspace:')) {
          packageJson.dependencies[name] = version.replace('workspace:', '')
        }
      }
    }

    // Clean up devDependencies
    if (packageJson.devDependencies) {
      for (const [name, version] of Object.entries(
        packageJson.devDependencies
      )) {
        if (typeof version === 'string' && version.startsWith('workspace:')) {
          packageJson.devDependencies[name] = version.replace('workspace:', '')
        }
      }
    }

    // Clean up peerDependencies
    if (packageJson.peerDependencies) {
      for (const [name, version] of Object.entries(
        packageJson.peerDependencies
      )) {
        if (typeof version === 'string' && version.startsWith('workspace:')) {
          packageJson.peerDependencies[name] = version.replace('workspace:', '')
        }
      }
    }

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
    console.log('📝 Cleaned up workspace dependencies')
  } catch (error) {
    console.warn('⚠️  Warning: Could not clean up package.json:', error.message)
  }
}

async function main() {
  console.log('🚀 Welcome to PocketPages!\n')

  // Check if starter is provided as command line argument
  const args = process.argv.slice(2)
  let starter = args[0]
  let projectName = args[1]

  // Validate starter if provided
  if (starter && !STARTERS.find((s) => s.value === starter)) {
    console.error(`❌ Invalid starter: "${starter}"`)
    console.log('\nAvailable starters:')
    STARTERS.forEach((s) => console.log(`  - ${s.value}: ${s.description}`))
    process.exit(1)
  }

  // Prompt for starter if not provided
  if (!starter) {
    const starterAnswer = await inquirer.prompt([
      {
        type: 'select',
        name: 'starter',
        message: 'Which starter would you like to use?',
        choices: STARTERS.map((starter) => ({
          name: `${starter.name} - ${starter.description}`,
          value: starter.value,
        })),
      },
    ])
    starter = starterAnswer.starter
  }

  // Prompt for project name if not provided
  if (!projectName) {
    const projectAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'my-pocketpages-app',
        validate: (input) => {
          if (!input.trim()) {
            return 'Project name is required'
          }
          if (existsSync(input.trim())) {
            return `Directory "${input.trim()}" already exists`
          }
          return true
        },
      },
    ])
    projectName = projectAnswer.projectName
  }
  const targetDir = projectName.trim()

  console.log(
    `\n📦 Creating project "${targetDir}" with starter "${starter}"...`
  )

  try {
    const emitter = tiged(
      `benallfree/pocketpages/packages/starters/${starter}`,
      {
        cache: false,
        force: true,
        verbose: true,
      }
    )

    await emitter.clone(targetDir)

    // Clean up workspace dependencies
    cleanupWorkspaceDependencies(targetDir)

    // Add the PocketPages agent skill + AGENTS.md
    await installAgentSupport(targetDir, {
      clone: (source, dest) =>
        tiged(source, { cache: false, force: true }).clone(dest),
    })

    console.log(`\n✅ Successfully created "${targetDir}"!`)
    console.log('\n📋 Next steps:')
    console.log(`   cd ${targetDir}`)

    if (existsSync(join(targetDir, 'package.json'))) {
      console.log('   npm install')
    }

    // Get starter-specific instructions from configuration
    const selectedStarter = STARTERS.find((s) => s.value === starter)
    if (selectedStarter && selectedStarter.instructions) {
      selectedStarter.instructions.forEach((instruction) => {
        console.log(`   ${instruction}`)
      })
    }

    console.log('\n🎉 Happy coding!')
  } catch (error) {
    console.error('❌ Error creating project:', error.message)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error)
  process.exit(1)
})
