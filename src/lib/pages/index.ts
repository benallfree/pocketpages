import URLParse from 'url-parse'
import { v23Provider } from './providers/v23Provider'

export type PagesMethods = 'get' | 'post' | 'put' | 'delete'

export type PagesRequest = {
  auth?: core.Record
  method: PagesMethods
  url: URLParse<string>
  formData: () => Record<string, any>
  header: (name: string) => string
  cookies: (name: string) => string | undefined
}

export type PagesResponse = {
  file: (path: string) => void
  write: (s: string) => void
  redirect: (path: string, status?: number) => void
  json: (status: number, data: any) => void
  html: (status: number, data: string) => void
  header: (name: string, value?: string) => void
  cookie: (name: string, value: string, options?: any) => void
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
