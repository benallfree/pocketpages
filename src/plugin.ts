import { PluginFactory } from 'pocodex'

export const files = () => {
  return {
    'pb_hooks/pocketpages.pb.js': `require('pocketpages/dist/hooks.pb')`,
    'pb_hooks/pages/index.md': `# Welcome to PocketPages!\nThe server time is \`<%= new Date() %>\`.`,
  }
}

const plugin: PluginFactory = (config) => {
  return {
    files,
  }
}

export { plugin }
