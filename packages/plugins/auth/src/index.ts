import PocketBase, {
  AuthModel,
  RecordAuthResponse,
} from 'pocketbase-js-sdk-jsvm'
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

const safeParseJson = (value: string | undefined) => {
  if (!value) return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

const toPlainObject = (value: any) => {
  if (typeof value === 'object' && value !== null) {
    return JSON.parse(JSON.stringify(value))
  }
  return value
}

const authPluginFactory: PluginFactory = (config) => {
  const { globalApi } = config
  const { dbg, info } = globalApi

  globalApi.createUser = (
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
    const pb = globalApi.pb() as PocketBase
    const user = pb.collection(options?.collection ?? 'users').create<User>({
      email,
      password,
      passwordConfirm: password,
    })
    dbg(`created user: ${user.id}`)
    if (
      options?.sendVerificationEmail === undefined ||
      options.sendVerificationEmail
    ) {
      globalApi.requestVerification(email, options)
    }
    return user
  }
  globalApi.createAnonymousUser = (options?: Partial<AuthOptions>) => {
    const email = `anonymous-${$security.randomStringWithAlphabet(
      10,
      '123456789'
    )}@example.com`
    return {
      email,
      ...globalApi.createPaswordlessUser(email, {
        ...options,
        sendVerificationEmail: false,
      }),
    }
  }
  globalApi.createPaswordlessUser = (
    email: string,
    options?: Partial<CreateUserOptions>
  ) => {
    const password = $security.randomStringWithAlphabet(40, '123456789')
    dbg(`created paswordless user: ${email}:${password}`)
    return {
      password,
      user: globalApi.createUser(email, password, options),
    }
  }
  globalApi.requestVerification = (
    email: string,
    options?: Partial<AuthOptions>
  ) => {
    const pb = globalApi.pb()
    pb.collection(options?.collection ?? 'users').requestVerification(email)
  }
  globalApi.confirmVerification = (
    token: string,
    options?: Partial<AuthOptions>
  ) => {
    const pb = globalApi.pb()
    pb.collection(options?.collection ?? 'users').confirmVerification(token)
  }
  globalApi.requestOTP = (email: string, options?: Partial<AuthOptions>) => {
    const pb = globalApi.pb()
    try {
      const { user, password } = globalApi.createPaswordlessUser(email, options)
    } catch (e) {
      // User likely already exists
    }
    const res = pb.collection(options?.collection ?? 'users').requestOTP(email)
    return res
  }

  return {
    onRequest: ({ request, response }) => {
      const { auth } = request
      if (auth) {
        dbg(`skipping cookie auth because auth record already set: ${auth.id}`)
        return
      }
      /**
       * If the route is protected, check the auth
       */
      // https://github.com/benallfree/pocketbase/blob/f38700982c1b46ac1a51ff59e985fae6fc332ccb/apis/middlewares.go#L181
      const cookieToken = safeParseJson(request.cookies<any>('pb_auth'))?.token
      dbg(`pb_auth cookie token: ${cookieToken || `<none>`}`)

      if (cookieToken) {
        try {
          const authRecord = $app.findAuthRecordByToken(cookieToken)
          dbg(`cookie token swapped for auth record: ${authRecord.id}`)
          request.event.auth = authRecord
          request.auth = authRecord
        } catch (e) {
          dbg(`error fetching auth record: ${e}`)
        }
      }
    },
    onExtendContextApi: ({ api }) => {
      const pb = () => api.pb() as PocketBase

      api.registerWithPassword = (
        email: string,
        password: string,
        options?: Partial<CreateUserOptions>
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
        const authData = pb()
          .collection(options?.collection ?? 'users')
          .authWithPassword(email, password) as AuthData

        api.signIn(authData)
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
        const authData = pb()
          .collection(options?.collection ?? 'users')
          .authWithOTP(otpId, password.toString())
        api.signIn(authData)
        // TODO set user to verfied
        return authData as AuthData
      }

      api.requestOAuth2Login = (
        providerName: string,
        options?: Partial<OAuth2RequestOptions>
      ) => {
        const methods = pb()
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

        const authData = pb()
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

        api.signIn(authData)
        return authData as AuthData
      }

      api.signOut = () => {
        api.response.cookie(`pb_auth`, '')
      }

      api.signIn = (authData: RecordAuthResponse<AuthModel>) => {
        dbg(
          `signing in with token and saving to pb_auth cookie: ${authData.record.id} ${authData.token}`
        )
        api.response.cookie(`pb_auth`, {
          token: authData.token,
          record: toPlainObject(authData.record),
        })
      }
    },
  }
}

export default authPluginFactory
