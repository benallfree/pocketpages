import URLParse from 'url-parse'
import { v22Provider } from './providers/v22Provider'
import { v23Provider } from './providers/v23Provider'

export type PagesMethods = 'get' | 'post' | 'put' | 'delete'

export type PagesRequest = {
  method: PagesMethods
  url: URLParse<string>
  formData: Record<string, any>
}

export type PagesResponse = {
  file: (path: string) => void
  write: (s: string) => void
  redirect: (path: string, status?: number) => void
  json: (status: number, data: any) => void
  html: (status: number, data: string) => void
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

export const is22 = `refreshSettings` in $app
export const is23 = !is22

export const getPagesProvider = (): IPagesProvider =>
  is22 ? v22Provider() : v23Provider()
