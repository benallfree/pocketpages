import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { Route } from './AfterBootstrapHandler'
import { requirePrivate, url } from './helpers'

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
  url: typeof url
  requirePrivate: typeof requirePrivate
} & typeof log

export type PagesConfig = {
  preprocessorExts: string[]
}

export type Cache = { routes: Route[]; config: PagesConfig }
