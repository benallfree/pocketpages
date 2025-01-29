import { forEach, keys, merge, shuffle, values } from '@s-libs/micro-dash'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { Route } from './AfterBootstrapHandler'
import { PagesRequest, PagesResponse } from './pages'

export type PageDataLoaderFunc<TData = any> = (
  api: Omit<PagesApi<TData>, 'data'>
) => object

export type MiddlewareLoaderFunc<TData = any> = (
  api: Omit<PagesApi<TData>, 'data'>
) => object

export type PagesParams<T = string> = Record<string, T | null | Array<T | null>>

export type PagesGlobalApi = {
  stringify: typeof stringify
  forEach: typeof forEach
  keys: typeof keys
  values: typeof values
  merge: typeof merge
  shuffle: typeof shuffle
  env: (key: string) => string
} & typeof log

export type ResolveOptions = {
  mode: 'raw' | 'require' | 'script' | 'style'
}

export type PagesApi<TData = any> = {
  asset: (path: string) => string
  auth?: core.Record
  data?: TData
  echo: (...args: any[]) => string
  formData: Record<string, any>
  meta: (key: string, value?: string) => string | undefined
  params: PagesParams
  redirect: (path: string, status?: number) => void
  request: PagesRequest
  resolve: (path: string, options?: Partial<ResolveOptions>) => any
  response: PagesResponse
  slot: string
  slots: Record<string, string>
} & PagesGlobalApi

export type PagesConfig = {
  preprocessorExts: string[]
  debug: boolean
}

export type Cache = { routes: Route[]; config: PagesConfig }
