import PocketBase from 'pocketbase-js-sdk-jsvm'
import { PluginFactory } from 'pocketpages'

export type OAuth2ProviderInfo = {
  name: string
  state: string
  codeChallenge: string
  codeVerifier: string
  redirectUrl: string
}

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

const authPluginFactory: PluginFactory = (config) => {
  const { global } = config

  global.createUser = (
    email: string,
    password: string,
    options?: Partial<CreateUserOptions>
  ) => {
    if (!email.trim()) {
      throw new Error('Email is required')
    }
    if (!password.trim()) {
      throw new Error('Password is required')
    }
    const pb = global.pb() as PocketBase
    const user = pb.collection(options?.collection ?? 'users').create<User>({
      email,
      password,
      passwordConfirm: password,
    })
    if (
      options?.sendVerificationEmail === undefined ||
      options.sendVerificationEmail
    ) {
      global.requestVerification(email, options)
    }
    return user
  }
  global.createAnonymousUser = (options?: Partial<AuthOptions>) => {
    const email = `anonymous-${$security.randomStringWithAlphabet(
      10,
      '123456789'
    )}@example.com`
    return {
      email,
      ...global.createPaswordlessUser(email, {
        ...options,
        sendVerificationEmail: false,
      }),
    }
  }
  global.createPaswordlessUser = (
    email: string,
    options?: Partial<CreateUserOptions>
  ) => {
    const password = $security.randomStringWithAlphabet(40, '123456789')
    return {
      password,
      user: global.createUser(email, password, options),
    }
  }
  global.requestVerification = (
    email: string,
    options?: Partial<AuthOptions>
  ) => {
    const pb = global.pb()
    pb.collection(options?.collection ?? 'users').requestVerification(email)
  }
  global.confirmVerification = (
    token: string,
    options?: Partial<AuthOptions>
  ) => {
    const pb = global.pb()
    pb.collection(options?.collection ?? 'users').confirmVerification(token)
  }
  global.requestOTP = (email: string, options?: Partial<AuthOptions>) => {
    const pb = global.pb()
    try {
      const { user, password } = global.createPaswordlessUser(email, options)
    } catch (e) {
      // User likely already exists
    }
    const res = pb.collection(options?.collection ?? 'users').requestOTP(email)
    return res
  }

  return {
    onRequest: ({ request, response }) => {
      /**
       * If the route is protected, check the auth
       */
      // https://github.com/pocketbase/pocketbase/blob/ad92992324c3fd0f09c36300890620a0224c6c06/apis/middlewares.go#L212-L254
      // https://github.com/pocketbase/pocketbase/blob/8271452430603cf3051a1cd89bcde01a0fa8fc89/apis/middlewares.go#L192-L220
      const token =
        request.header('Authorization') || request.cookies('pb_auth')
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

        const pb = global.pb()
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
    },
    onExtendContextApi: ({ api }) => {
      api.registerWithPassword = (
        email: string,
        password: string,
        options?: Partial<AuthOptions>
      ) => {
        api.createUser(email, password, options)
        const authData = api.signInWithPassword(email, password, options)
        return authData
      }
      api.signInWithPassword = (
        email: string,
        password: string,
        options?: Partial<AuthOptions>
      ) => {
        const authData = api
          .pb()
          .collection(options?.collection ?? 'users')
          .authWithPassword(email, password) as AuthData

        api.signInWithToken(authData.token)
        return authData
      }

      api.signInAnonymously = (options?: Partial<AuthOptions>) => {
        const { user, email, password } = api.createAnonymousUser()

        const authData = api.signInWithPassword(email, password, options)
        return authData
      }

      api.signInWithOTP = (
        otpId: string,
        password: string,
        options?: Partial<AuthOptions>
      ) => {
        const pb = api.pb()
        const authData = pb
          .collection(options?.collection ?? 'users')
          .authWithOTP(otpId, password.toString())
        api.signInWithToken(authData.token)
        // TODO set user to verfied
        return authData as AuthData
      }

      api.requestOAuth2Login = (
        providerName: string,
        options?: Partial<OAuth2RequestOptions>
      ) => {
        const pb = api.pb()
        const methods = pb
          .collection(options?.collection ?? 'users')
          .listAuthMethods()

        const { providers } = methods.oauth2

        const provider = providers.find((p) => p.name === providerName)

        if (!provider) {
          throw new Error(`Provider ${providerName} not found`)
        }

        const redirectUrl = `${$app.settings().meta.appURL}${options?.redirectPath ?? '/auth/oauth/confirm'}`

        const authUrl = provider.authURL + redirectUrl

        api.response.cookie(options?.cookieName ?? 'pp_oauth_state', {
          ...api.pick(
            provider,
            'name',
            'state',
            'codeChallenge',
            'codeVerifier'
          ),
          redirectUrl,
        })

        if (options?.autoRedirect ?? true) {
          api.response.redirect(authUrl)
        }
        return authUrl
      }

      api.signInWithOAuth2 = (
        state: string,
        code: string,
        options?: Partial<OAuth2SignInOptions>,
        _storedProviderInfo?: OAuth2ProviderInfo
      ) => {
        const storedProvider =
          _storedProviderInfo ??
          api.request.cookies<OAuth2ProviderInfo>(
            options?.cookieName ?? 'pp_oauth_state'
          )

        if (!storedProvider) {
          throw new Error('No stored provider info found')
        }

        if (storedProvider.state !== state) {
          throw new Error(`State parameters don't match.`)
        }

        const authData = api
          .pb()
          .collection(options?.collection ?? 'users')
          .authWithOAuth2Code(
            storedProvider.name,
            code,
            storedProvider.codeVerifier,
            storedProvider.redirectUrl,
            // pass any optional user create data
            {
              emailVisibility: false,
            }
          )

        api.signInWithToken(authData.token)
        return authData as AuthData
      }

      api.signOut = () => {
        api.response.cookie(`pb_auth`, '')
      }

      api.signInWithToken = (token: string) => {
        api.response.cookie(`pb_auth`, token)
      }
    },
  }
}

export default authPluginFactory
