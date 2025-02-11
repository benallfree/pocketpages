import { globalApi } from 'src/globalApi'
import { PagesRequest } from './types'

export const setAuthFromHeaderOrCookie = (request: PagesRequest) => {
  /**
   * If the route is protected, check the auth
   */
  // https://github.com/pocketbase/pocketbase/blob/ad92992324c3fd0f09c36300890620a0224c6c06/apis/middlewares.go#L212-L254
  // https://github.com/pocketbase/pocketbase/blob/8271452430603cf3051a1cd89bcde01a0fa8fc89/apis/middlewares.go#L192-L220
  const token = request.header('Authorization') || request.cookies('pb_auth')
  // dbg(`incoming auth token`, { token })
  if (token) {
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace(/^Bearer\s+/i, '')

    let data: { [key: string]: any } = {}
    try {
      data = JSON.parse(cleanToken)
      // normalize
      if (
        typeof data === null ||
        typeof data !== 'object' ||
        Array.isArray(data)
      ) {
        data = {}
      }
    } catch (_) {}

    const pb = globalApi.pb()
    pb.authStore.save(data.token || '', data.record || data.model || null)
    try {
      // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
      pb.authStore.isValid && pb.collection('users').authRefresh()
    } catch (_) {
      // clear the auth store on failed refresh
      pb.authStore.clear()
    }

    try {
      request.auth = $app.findAuthRecordByToken(cleanToken, 'auth')
    } catch (e) {
      // Token is invalid or expired
    }
  }
}
