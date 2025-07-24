import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['pocketpages', /^[^tsdown]$/, /pocketbase-.*/],
})
