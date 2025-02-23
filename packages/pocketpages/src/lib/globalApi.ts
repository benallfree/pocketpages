import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { default as parse } from 'url-parse'
import { PagesGlobalContext } from './types'

export const globalApi: PagesGlobalContext = {
  url: (path: string) => parse(path, true),
  stringify,
  env: (key: string) => process.env[key] ?? '',
  store: (name: string, value?: any) => {
    if (value === undefined) {
      return $app.store<any>().get(name)
    }
    $app.store<any>().set(name, value)
  },
  ...log,
}
