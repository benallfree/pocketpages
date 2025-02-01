import * as cookie from 'cookie'
import { setAuthFromHeaderOrCookie } from 'src/lib/auth'
import { default as parse } from 'url-parse'
import type {
  PagesMethods,
  PagesNextFunc,
  PagesRequest,
  PagesResponse,
} from '../..'
import { dbg } from '../../../debug'

export const v23MiddlewareWrapper = (e: core.RequestEvent) => {
  const next: PagesNextFunc = () => {
    e.next()
  }
  if (!e.request) {
    dbg(`No request, passing on to PocketBase`)
    return next()
  }

  const { method, url } = e.request
  dbg({ method, url })
  if (!url) {
    if (!url) {
      dbg(`No URL, passing on to PocketBase`)
      return next()
    }
  }

  const request: PagesRequest = {
    auth: e.auth,
    method: method.toLowerCase() as PagesMethods,
    url: parse(url.string()),
    formData: () => e.requestInfo().body,
    body: () => e.requestInfo().body,
    header: (name: string) => {
      return e.request?.header.get(name) || ''
    },
    cookies: (() => {
      let parsed: Record<string, string | undefined>
      return (name: string) => {
        if (!parsed) {
          parsed = cookie.parse(request.header(`Cookie`))
        }
        return parsed[name]
      }
    })(),
  }

  const response: PagesResponse = {
    file: (path: string) => {
      return e.fileFS($os.dirFS($filepath.dir(path)), $filepath.base(path))
    },
    write: (s: string) => {
      e.response.write(s)
    },
    redirect: (path: string, status = 302) => {
      e.redirect(status, path)
    },
    json: (status: number, data: any) => {
      e.json(status, data)
    },
    html: (status: number, data: string) => {
      e.html(status, data)
    },
    header: (name: string, value?: string) => {
      if (value === undefined) {
        return e.response.header().get(name) || ''
      }
      e.response.header().set(name, value)
      return value
    },
    cookie: (name: string, value: string, options?: any) => {
      const serialized = cookie.serialize(name, value, options)
      response.header(`Set-Cookie`, serialized)
      return serialized
    },
  }

  setAuthFromHeaderOrCookie(request)

  require(`${__hooks}/pocketpages.pb`).MiddlewareHandler(
    request,
    response,
    next
  )
}
