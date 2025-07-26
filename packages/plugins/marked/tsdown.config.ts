import { defineConfig } from 'tsdown'
import { onSuccess } from '../onSuccess'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs'],
  clean: true,
  outDir: 'dist',
  onSuccess: onSuccess('marked'),
})
