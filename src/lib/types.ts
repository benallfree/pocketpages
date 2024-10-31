import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import type URL from 'url-parse'
import { Route } from './AfterBootstrapHandler'

export type PageDataLoaderFunc = (api: Omit<PagesApi<any>, 'data'>) => object

export type MiddlewareLoaderFunc = (api: Omit<PagesApi<any>, 'data'>) => object

export type PagesApi<T> = {
  ctx: echo.Context
  params: Record<string, string>
  request: http.Request
  response: echo.Response
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
