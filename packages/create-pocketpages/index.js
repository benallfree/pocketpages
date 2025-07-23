#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import { join } from 'path'
import tiged from 'tiged'

const STARTERS = [
  {
    name: 'minimal',
    description: 'A minimal PocketPages starter with just the basics',
    value: 'minimal',
  },
  {
    name: 'mvp',
    description: 'MVP.css starter - A minimalist CSS framework',
    value: 'mvp',
  },
  {
    name: 'auth',
    description: 'Complete authentication system with multiple login methods',
    value: 'auth',
  },
  {
    name: 'daisyui',
    description: 'Tailwind CSS with DaisyUI components',
    value: 'daisyui',
  },
  {
    name: 'daisyui-docs',
    description: 'Documentation site template with DaisyUI and navigation',
    value: 'daisyui-docs',
  },
  {
    name: 'htmx',
    description: 'HTMX integration for dynamic interactions',
    value: 'htmx',
  },
]

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

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'starter',
      message: 'Which starter would you like to use?',
      choices: STARTERS.map((starter) => ({
        name: `${starter.name} - ${starter.description}`,
        value: starter.value,
      })),
    },
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

  const { starter, projectName } = answers
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

    console.log(`\n✅ Successfully created "${targetDir}"!`)
    console.log('\n📋 Next steps:')
    console.log(`   cd ${targetDir}`)

    if (existsSync(join(targetDir, 'package.json'))) {
      console.log('   npm install')
    }

    // Starter-specific instructions
    if (starter === 'auth') {
      console.log('   pocketbase serve --dir=pb_data --dev')
      console.log('   bunx maildev  # For testing email functionality')
    } else if (starter === 'daisyui' || starter === 'daisyui-docs') {
      console.log('   npm run dev:css  # Start Tailwind CSS watcher')
      console.log('   pocketbase serve --dir=pb_data --dev')
    } else {
      console.log('   pocketbase serve --dir=pb_data --dev')
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
