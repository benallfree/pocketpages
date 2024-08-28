import { deploy, excludeDefaults } from '@samkirkland/ftp-deploy'
import 'dotenv/config'

async function deployMyCode() {
  console.log('🚚 Deploy started')
  await deploy({
    server: 'ftp.sfo-1.pockethost.io',
    username: process.env.PH_USERNAME,
    password: process.env.PH_PASSWORD,
    'local-dir': 'app/',
    'server-dir': 'makerlist/',
    'state-name': 'pb_hooks/.ftp-deploy-sync-state.json',
    exclude: [...excludeDefaults, 'pb_data/**'],
    'log-level': 'verbose',
  })
  console.log('🚀 Deploy done!')
}

deployMyCode()
