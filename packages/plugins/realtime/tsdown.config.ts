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
    // copy README.md to docs location
    fs.copyFileSync(
      path.resolve(__dirname, './README.md'),
      path.resolve(
        __dirname,
        '../../site/pb_hooks/pages/(main)/docs/plugins/sse.md'
      )
    )
    console.log('README.md copied to docs location')
  },
})
