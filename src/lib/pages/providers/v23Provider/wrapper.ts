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
    header: (name: string, value: string) => {
      e.response.header().set(name, value)
    },
    cookie: (name: string, value: string, options: any) => {
      response.header('Set-Cookie', `${name}=${value}; Path=/`)
    },
  }

  require(`${__hooks}/pocketpages.pb`).MiddlewareHandler(
    request,
    response,
    next
  )
}
