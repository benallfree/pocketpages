import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'index.cjs': 'src/index.ts',
  },
  format: ['cjs'],
  dts: {
    resolve: true,
    compilerOptions: {
      module: 'ES6',
      moduleResolution: 'bundler',
      skipLibCheck: false,
      types: ['pocketbase-jsvm'],
    },
    banner: '/// <reference types="pocketbase-jsvm" />',
  },
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
  banner: {
    js: `if (typeof module === 'undefined') { module = { exports: {} } };`,
  },
  external: ['pocketpages', 'marked'],
  noExternal: ['@s-libs/micro-dash'],
})
