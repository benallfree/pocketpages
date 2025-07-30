import { SerializeOptions } from 'cookie'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { default as parse } from 'url-parse'
import { Route } from '../handlers/AfterBootstrapHandler'

export type PageDataLoaderFunc<TData = any> = (
  api: Omit<PagesRequestContext<TData>, 'data'>
) => object

export type MiddlewareNextFunc = (data?: object) => void

export type MiddlewareLoaderFunc<TData = any> = (
  api: PagesRequestContext<TData>,
  next?: MiddlewareNextFunc
) => object

export type PagesParams = Record<string, string | string[] | undefined>

export type Url = ReturnType<typeof parse<PagesParams>>
export type PagesGlobalContext = {
  url: (url: string) => Url
  stringify: typeof stringify
  env: (key: string) => string
  store: {
    <T>(name: string, value: T): T
    (name: string): any
  }
} & typeof log

export type ResolveOptions = {
  mode: 'raw' | 'require' | 'script' | 'style'
}

export type RedirectOptions = {
  status: number
  message: string
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
  redirect: (path: string, options?: Partial<RedirectOptions>) => void
  request: PagesRequest
  resolve: (path: string, options?: Partial<ResolveOptions>) => any
  response: PagesResponse
  slot: string
  slots: Record<string, string>
} & PagesGlobalContext

export type PluginFactoryConfig = {
  pagesRoot: string
  config: PagesConfig
  globalApi: PagesGlobalContext & { [_: string]: any }
  routes: Route[]
  dbg: typeof log.dbg
}

export type PluginContextBase = {
  route: Route
}

export type HandlesContext = {
  route: Route
  filePath: string
}

export type RenderContext = PluginContextBase & {
  api: PagesRequestContext
  content: string
  filePath: string
  plugins: Plugin[]
}

export type ExtendContextApiContext = PluginContextBase & {
  api: PagesRequestContext & { [_: string]: any }
}

export type ResponseContext = PluginContextBase & {
  api: PagesRequestContext
  content: string
}

export type RequestContext = {
  request: PagesRequest
  response: PagesResponse
}

export type Plugin = {
  name: string
  onRequest?: (context: RequestContext) => void
  onRender?: (context: RenderContext) => string
  handles?: (context: HandlesContext) => boolean
  onExtendContextApi?: (context: ExtendContextApiContext) => void
  onResponse?: (context: ResponseContext) => boolean
}

export type PluginOptionsBase = {
  debug: boolean
}

export type PluginFactory<
  TExtra extends PluginOptionsBase = PluginOptionsBase,
> = (
  config: PluginFactoryConfig,
  extra: Partial<TExtra> & PluginOptionsBase
) => Plugin

export type PluginOptions = {
  [key: string]: any
} & PluginOptionsBase

export type PluginConfigItem = {
  fn: PluginFactory
} & PluginOptions

export type PluginConfigItemShortHand =
  | string
  | ({ name: string; [key: string]: any } & PluginOptionsBase)
  | PluginFactory
  | Partial<PluginConfigItem>

export type PagesConfig = {
  plugins: PluginConfigItemShortHand[]
  debug: boolean | 'verbose'
}

export type Cache = { routes: Route[]; config: PagesConfig }

export type PagesMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type PagesRequest = {
  event: core.RequestEvent
  auth?: core.Record
  authToken?: string
  method: PagesMethods
  url: Url
  formData: () => Record<string, any>
  body: () => Record<string, any> | string
  header: (name: string) => string
  cookies: {
    (): Record<string, string | undefined>
    <T>(name: string): T | undefined
  }
}

export type PagesResponse = {
  error: (err?: Error) => Error
  status: (status?: number) => number
  file: (path: string) => void
  write: (s: string) => void
  redirect: (path: string, status?: number) => void
  json: (status: number, data: any) => void
  html: (status: number, data: string) => void
  header: (name: string, value?: string) => string | undefined
  cookie: <T>(
    name: string,
    value: T,
    options?: Partial<SerializeOptions>
  ) => void
}
export type PagesInitializerFunc = (e: core.BootstrapEvent) => void
export type PagesNextFunc = () => void

export type PagesMiddlewareFunc = (e: core.RequestEvent) => void
