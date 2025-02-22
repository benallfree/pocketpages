import { forEach, keys, merge, pick, shuffle, values } from '@s-libs/micro-dash'
import PocketBase from 'pocketbase-js-sdk-jsvm'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { default as parse } from 'url-parse'
import { findRecordByFilter, findRecordsByFilter } from './db'
import {
  AuthOptions,
  Cache,
  CreateUserOptions,
  PagesGlobalContext,
  User,
} from './types'

export const globalApi: PagesGlobalContext = {
  url: (path: string) => parse(path, true),
  stringify,
  forEach,
  keys,
  values,
  merge,
  shuffle,
  pick,
  env: (key: string) => process.env[key] ?? '',
  findRecordByFilter,
  findRecordsByFilter,
  createUser: (
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
    const pb = globalApi.pb()
    const user = pb.collection(options?.collection ?? 'users').create<User>({
      email,
      password,
      passwordConfirm: password,
    })
    if (
      options?.sendVerificationEmail === undefined ||
      options.sendVerificationEmail
    ) {
      globalApi.requestVerification(email, options)
    }
    return user
  },
  createAnonymousUser: (options?: Partial<AuthOptions>) => {
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
  },
  createPaswordlessUser: (
    email: string,
    options?: Partial<CreateUserOptions>
  ) => {
    const password = $security.randomStringWithAlphabet(40, '123456789')
    return { password, user: globalApi.createUser(email, password, options) }
  },
  requestVerification: (email: string, options?: Partial<AuthOptions>) => {
    const pb = globalApi.pb()
    pb.collection(options?.collection ?? 'users').requestVerification(email)
  },
  pb: (() => {
    // rebuild
    let pb: PocketBase | null = null
    return () => {
      if (pb) return pb
      const { config } = $app.store<Cache>().get(`pocketpages`)
      const { host } = config
      pb = new PocketBase(host)
      return pb
    }
  })(),
  confirmVerification: (token: string, options?: Partial<AuthOptions>) => {
    const pb = globalApi.pb()
    pb.collection(options?.collection ?? 'users').confirmVerification(token)
  },
  requestOTP: (email: string, options?: Partial<AuthOptions>) => {
    const pb = globalApi.pb()
    try {
      const { user, password } = globalApi.createPaswordlessUser(email, options)
    } catch (e) {
      // User likely already exists
    }
    const res = pb.collection(options?.collection ?? 'users').requestOTP(email)
    return res
  },
  store: (name: string, value?: any) => {
    if (value === undefined) {
      return $app.store<any>().get(name)
    }
    $app.store<any>().set(name, value)
  },
  ...log,
}
