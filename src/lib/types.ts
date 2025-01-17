import { forEach, keys, merge, values } from '@s-libs/micro-dash'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import type URL from 'url-parse'
import { Route } from './AfterBootstrapHandler'
import { PagesRequest, PagesResponse } from './pages'

export type PageDataLoaderFunc<TData = any> = (
  api: Omit<PagesApi<TData>, 'data'>
) => object

export type MiddlewareLoaderFunc<TData = any> = (
  api: Omit<PagesApi<TData>, 'data'>
) => object

export type PagesParams<T = string> = Record<string, T | null | Array<T | null>>

export type PagesApi<TData = any> = {
  params: PagesParams
  auth?: core.Record
  request: PagesRequest
  response: PagesResponse
  formData: Record<string, any>
  asset: (path: string) => string
  echo: (...args: any[]) => string
  redirect: (path: string, status?: number) => void
  data?: TData
  slot: string
  slots: Record<string, string>
  meta: (key: string, value?: string) => string | undefined
  stringify: typeof stringify
  url: (path: string) => URL<Record<string, string | undefined>>
  resolve: (path: string) => any
  forEach: typeof forEach
  keys: typeof keys
  values: typeof values
  merge: typeof merge
} & typeof log

export type PagesConfig = {
  preprocessorExts: string[]
}

export type Cache = { routes: Route[]; config: PagesConfig }
