import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { default as parse } from 'url-parse'
import { PagesGlobalContext } from './types'
import { PocketPagesError as PocketPagesErrorFn } from '../lib/errors'

export const globalApi: PagesGlobalContext = {
  url: (path: string) => {
    const url = parse(path, true)
    // Attempt JSON.parse for each query parameter
    const parsedQuery: Record<string, any> = {}
    for (const [key, value] of Object.entries(url.query)) {
      try {
        parsedQuery[key] = JSON.parse(value as string)
      } catch {
        // If JSON.parse fails, keep the original string value
        parsedQuery[key] = value
      }
    }
    url.set('query', parsedQuery)
    return url
  },
  stringify,
  env: (key: string) => process.env[key] ?? '',
  store: (name: string, value?: any) => {
    if (value === undefined) {
      return $app.store<any>().get(name)
    }
    globalApi.dbg(`store: ${name}`, value)
    $app.store<any>().set(name, value)
    return value
  },
  pocketPagesError: PocketPagesErrorFn,
  ...log,
}
