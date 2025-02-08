import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'pocketpages.pb': 'src/index.ts',
  },
  format: ['cjs'],
  dts: {
    resolve: true,
    compilerOptions: {
      module: 'ESNext',
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
  onSuccess: 'bun run build:copy',
  banner: {
    js: `if (typeof module === 'undefined') { module = { exports: {} } };`,
  },
  noExternal: [
    '@s-libs/micro-dash',
    'pocketbase-js-sdk-jsvm',
    'pocketbase-log',
    'pocketbase-stringify',
    'url-parse',
    'pocketbase-jsvm',
  ],
})
