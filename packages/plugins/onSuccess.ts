import fs from 'fs'
import path from 'path'

const __dirname = import.meta.dirname

export const onSuccess = (pluginName: string) => () => {
  // copy README.md to docs location, replacing <% with <%%
  const src = path.resolve(__dirname, pluginName, './README.md')
  const dest = path.resolve(
    __dirname,
    `../site/pb_hooks/pages/(main)/docs/plugins/${pluginName}.md`
  )
  let content = fs.readFileSync(src, 'utf8')
  content = content.replace(/<%/g, '<%%')
  content = content.replace(/<script server>/g, "<script <%='server'%>>")
  fs.writeFileSync(dest, content)
  console.log(`${src} -> ${dest}`)
}
