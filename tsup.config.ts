import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'pocketpages.pb': 'src/index.ts',
  },
  format: ['cjs'],
  dts: true,
  clean: false,
  outDir: 'dist',
  shims: true,
  skipNodeModulesBundle: false,
  target: 'node20',
  platform: 'node',
  minify: false,
  sourcemap: false,
  splitting: false,
  bundle: true,
  onSuccess: 'bun run build:copy',
  banner: {
    js: `if (typeof module === 'undefined') { module = { exports: {} } };`,
  },
})
