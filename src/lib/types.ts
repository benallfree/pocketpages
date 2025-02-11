import { forEach, keys, merge, pick, shuffle, values } from '@s-libs/micro-dash'
import { SerializeOptions } from 'cookie'
import PocketBase, { OTPResponse } from 'pocketbase-js-sdk-jsvm'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { default as parse } from 'url-parse'
import { Route } from './AfterBootstrapHandler'
import { findRecordByFilter, findRecordsByFilter } from './db'

export type User = {
  avatar: string
  collectionId: string
  collectionName: string
  created: string
  emailVisibility: boolean
  email: string
  id: string
  name: string
  updated: string
  username: string
  verified: boolean
}

export type AuthData = {
  token: string
  record: User
}

export type PageDataLoaderFunc<TData = any> = (
  api: Omit<PagesRequestContext<TData>, 'data'>
) => object

export type MiddlewareLoaderFunc<TData = any> = (
  api: Omit<PagesRequestContext<TData>, 'data'>
) => object

export type PagesParams<T = string> = Record<string, T | null | Array<T | null>>

export type AuthOptions = {
  collection: string
}

export type OAuth2RequestOptions = {
  cookieName: string
  redirectPath: string
  autoRedirect: boolean
} & AuthOptions

export type OAuth2SignInOptions = {
  cookieName: string
} & AuthOptions

export type CreateUserOptions = {
  sendVerificationEmail: boolean
} & AuthOptions

export type PagesGlobalContext = {
  url: (
    path: string
  ) => ReturnType<typeof parse<Record<string, string | undefined>>>
  stringify: typeof stringify
  forEach: typeof forEach
  keys: typeof keys
  values: typeof values
  merge: typeof merge
  shuffle: typeof shuffle
  pick: typeof pick
  env: (key: string) => string
  findRecordByFilter: typeof findRecordByFilter
  findRecordsByFilter: typeof findRecordsByFilter
  createUser: (
    email: string,
    password: string,
    options?: Partial<CreateUserOptions>
  ) => User
  createAnonymousUser: (options?: Partial<AuthOptions>) => {
    user: User
    email: string
    password: string
  }
  createPaswordlessUser: (
    email: string,
    options?: Partial<CreateUserOptions>
  ) => {
    user: User
    password: string
  }
  requestVerification: (email: string, options?: Partial<AuthOptions>) => void
  confirmVerification: (token: string, options?: Partial<AuthOptions>) => void
  requestOTP: (email: string, options?: Partial<AuthOptions>) => OTPResponse
  pb: () => PocketBase
  store: {
    (name: string, value: any): void
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

export type OAuth2ProviderInfo = {
  name: string
  state: string
  codeChallenge: string
  codeVerifier: string
  redirectUrl: string
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
  signInWithPassword: (
    email: string,
    password: string,
    options?: Partial<AuthOptions>
  ) => AuthData
  registerWithPassword: (
    email: string,
    password: string,
    options?: Partial<CreateUserOptions>
  ) => AuthData
  signInAnonymously: (options?: Partial<AuthOptions>) => AuthData
  signInWithOTP: (
    otpId: string,
    password: string,
    options?: Partial<AuthOptions>
  ) => AuthData
  requestOAuth2Login: (
    providerName: string,
    options?: Partial<OAuth2RequestOptions>
  ) => string
  signInWithOAuth2: (
    state: string,
    code: string,
    options?: Partial<OAuth2SignInOptions>,
    storedProviderInfo?: OAuth2ProviderInfo
  ) => AuthData
  signOut: () => void
  signInWithToken: (token: string) => void
} & PagesGlobalContext

export type PagesConfig = {
  preprocessorExts: string[]
  debug: boolean
  host: string
  boot: (globalApi: PagesGlobalContext) => void
}

export type Cache = { routes: Route[]; config: PagesConfig }

export type PagesMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type PagesRequest = {
  auth?: core.Record
  method: PagesMethods
  url: parse<string>
  formData: () => Record<string, any>
  body: () => Record<string, any> | string
  header: (name: string) => string
  cookies: {
    (): Record<string, string | undefined>
    <T>(name: string): T | undefined
  }
}

export type PagesResponse = {
  file: (path: string) => void
  write: (s: string) => void
  redirect: (path: string, status?: number) => void
  json: (status: number, data: any) => void
  html: (status: number, data: string) => void
  header: (name: string, value?: string) => void
  cookie: <T>(
    name: string,
    value: T,
    options?: Partial<SerializeOptions>
  ) => void
}
export type PagesInitializerFunc = () => void
export type PagesNextFunc = () => void

export type PagesMiddlewareFunc = (
  request: PagesRequest,
  response: PagesResponse,
  next: PagesNextFunc
) => void
