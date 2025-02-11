import { boot } from './lib/boot'

const isBooting = typeof onBootstrap !== 'undefined'

if (isBooting) {
  boot()
}

export * from './lib/types'
export * from './main'
