import { getPagesProvider } from './lib/pages'

const isBooting = typeof onBootstrap !== 'undefined'

if (isBooting) {
  const pagesProvider = getPagesProvider()

  pagesProvider.boot()
}

export * from './lib/types'
export * from './main'
