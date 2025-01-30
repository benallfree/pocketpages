import { forEach, keys, merge, shuffle, values } from '@s-libs/micro-dash'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { PagesGlobalContext } from 'src/lib/types'

export const globalApi: PagesGlobalContext = {
  stringify,
  forEach,
  keys,
  values,
  merge,
  shuffle,
  env: (key: string) => process.env[key] ?? '',
  ...log,
}
