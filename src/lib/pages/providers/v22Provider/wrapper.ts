import { dbg } from 'pocketbase-log'
import { default as parse } from 'url-parse'
import type {
  PagesMethods,
  PagesNextFunc,
  PagesRequest,
  PagesResponse,
} from '../..'

export const v22MiddlewareWrapper: echo.MiddlewareFunc = (
  _next: echo.HandlerFunc
) => {
  return (c: echo.Context) => {
    const next: PagesNextFunc = () => {
      _next(c)
    }
    const { method, url } = c.request()
    dbg({ method, url })
    if (!url) {
      if (!url) {
        dbg(`No URL, passing on to PocketBase`)
        return next()
      }
    }
    const request: PagesRequest = {
      method: method.toLowerCase() as PagesMethods,
      url: parse(url.string()),
      formData: $apis.requestInfo(c).data,
    }
    const response: PagesResponse = {
      file: (path: string) => {
        c.file(path)
      },
      write: (s: string) => {
        c.response().write(s)
      },
      redirect: (path: string, status = 302) => {
        c.redirect(status, path)
      },
      json: (status: number, data: any) => {
        c.json(status, data)
      },
      html: (status: number, data: string) => {
        c.html(status, data)
      },
    }

    require(`pocketpages/dist/main`).MiddlewareHandler(request, response, next)
  }
}
