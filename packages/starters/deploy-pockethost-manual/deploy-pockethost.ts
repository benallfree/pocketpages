import { deploy, excludeDefaults } from '@samkirkland/ftp-deploy'
import 'dotenv/config'
import env from 'env-var'

async function deployMyCode() {
  console.log('🚚 Deploy started')
  await deploy({
    server: 'ftp.sfo-1.pockethost.io',
    username: env.get('PH_USERNAME').required().asString(),
    password: env.get('PH_PASSWORD').required().asString(),
    'local-dir': 'pb_hooks/',
    'server-dir': `${env.get('APP_NAME').required().asString()}/`,
    'state-name': 'pb_hooks/.ftp-deploy-sync-state.json',
    exclude: [...excludeDefaults],
    'log-level': 'verbose',
  })
  console.log('🚀 Deploy done!')
}

deployMyCode()
