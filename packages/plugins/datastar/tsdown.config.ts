import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs'],
  clean: true,
  outDir: 'dist',
})
