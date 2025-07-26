import fs from 'fs'
import path from 'path'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs'],
  clean: true,
  outDir: 'dist',
  onSuccess: (context) => {
    // copy README.md to docs location, replacing <% with <%%
    const src = path.resolve(__dirname, './README.md')
    const dest = path.resolve(
      __dirname,
      '../../site/pb_hooks/pages/(main)/docs/plugins/ejs.md'
    )
    let content = fs.readFileSync(src, 'utf8')
    content = content.replace(/<%/g, '<%%')
    fs.writeFileSync(dest, content)
    console.log('README.md copied to docs location with EJS tags escaped')
  },
})
