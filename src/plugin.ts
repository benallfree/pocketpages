import { PluginFactory } from 'pocodex'

const plugin: PluginFactory = (config) => {
  return {
    files() {
      return {
        'pb_hooks/pocketpages.pb.js': `require('pocketpages/dist/hooks.pb')`,
        'pages/index.md': `# Welcome to PocketPages!\nThe server time is \`<%= new Date() %>\`.`,
      }
    },
  }
}

export { plugin }
