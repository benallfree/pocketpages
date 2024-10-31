import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import type URL from 'url-parse'
import { Route } from './AfterBootstrapHandler'
import { PagesRequest, PagesResponse } from './pages'

export type PageDataLoaderFunc = (api: Omit<PagesApi<any>, 'data'>) => object

export type MiddlewareLoaderFunc = (api: Omit<PagesApi<any>, 'data'>) => object

export type PagesApi<T> = {
  params: Record<string, string>
  request: PagesRequest
  response: PagesResponse
  formData: Record<string, any>
  asset: (path: string) => string
  echo: (...args: any[]) => string
  redirect: (path: string, status?: number) => void
  data?: T
  slot: string
  slots: Record<string, string>
  meta: (key: string, value?: string) => string | undefined
  stringify: typeof stringify
  url: (path: string) => URL<Record<string, string | undefined>>
  require: (path: string) => any
} & typeof log

export type PagesConfig = {
  preprocessorExts: string[]
}

export type Cache = { routes: Route[]; config: PagesConfig }
