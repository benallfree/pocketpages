import { SerializeOptions } from 'cookie'
import URLParse from 'url-parse'
import { v23Provider } from './providers/v23Provider'

export type PagesMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type PagesRequest = {
  auth?: core.Record
  method: PagesMethods
  url: URLParse<string>
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

export type IPagesProvider = {
  boot(): void
}

export const getPagesProvider = (): IPagesProvider => v23Provider()
