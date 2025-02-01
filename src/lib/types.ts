import { forEach, keys, merge, shuffle, values } from '@s-libs/micro-dash'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { Route } from './AfterBootstrapHandler'
import { findRecordByFilter, findRecordsByFilter } from './db'
import { PagesRequest, PagesResponse } from './pages'

export type PageDataLoaderFunc<TData = any> = (
  api: Omit<PagesRequestContext<TData>, 'data'>
) => object

export type MiddlewareLoaderFunc<TData = any> = (
  api: Omit<PagesRequestContext<TData>, 'data'>
) => object

export type PagesParams<T = string> = Record<string, T | null | Array<T | null>>

export type PagesGlobalContext = {
  stringify: typeof stringify
  forEach: typeof forEach
  keys: typeof keys
  values: typeof values
  merge: typeof merge
  shuffle: typeof shuffle
  env: (key: string) => string
  findRecordByFilter: typeof findRecordByFilter
  findRecordsByFilter: typeof findRecordsByFilter
} & typeof log

export type ResolveOptions = {
  mode: 'raw' | 'require' | 'script' | 'style'
}

export type PagesRequestContext<TData = any> = {
  asset: (path: string) => string
  auth?: core.Record
  data?: TData
  echo: (...args: any[]) => string
  formData: Record<string, any>
  body: () => Record<string, any> | string
  meta: (key: string, value?: string) => string | undefined
  params: PagesParams
  redirect: (path: string, status?: number) => void
  request: PagesRequest
  resolve: (path: string, options?: Partial<ResolveOptions>) => any
  response: PagesResponse
  slot: string
  slots: Record<string, string>
} & PagesGlobalContext

export type PagesConfig = {
  preprocessorExts: string[]
  debug: boolean
}

export type Cache = { routes: Route[]; config: PagesConfig }
