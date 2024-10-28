import { Route } from './AfterBootstrapHandler'

export type PageDataLoaderFunc = (
  context: Omit<PagesContext<any>, 'data'>
) => object

export type MiddlewareLoaderFunc = (
  context: Omit<PagesContext<any>, 'data'>
) => object

export type PagesContext<T> = {
  ctx: echo.Context
  params: Record<string, string>
  request: http.Request
  response: echo.Response
  formData: Record<string, any>
  asset: (path: string) => string
  print: (...args: any[]) => void
  redirect: (path: string, status?: number) => void
  data?: T
  slot: string
  slots: Record<string, string>
  meta: (key: string, value?: string) => string | undefined
}

export type PagesConfig = {
  preprocessorExts: string[]
}

export type Cache = { routes: Route[]; config: PagesConfig }
