import { forEach, keys, merge, shuffle, values } from '@s-libs/micro-dash'
import PocketBase from 'pocketbase-js-sdk-jsvm'
import * as log from 'pocketbase-log'
import { stringify } from 'pocketbase-stringify'
import { findRecordByFilter, findRecordsByFilter } from 'src/lib/db'
import { AuthOptions, Cache, PagesGlobalContext, User } from 'src/lib/types'

export const globalApi: PagesGlobalContext = {
  stringify,
  forEach,
  keys,
  values,
  merge,
  shuffle,
  env: (key: string) => process.env[key] ?? '',
  findRecordByFilter,
  findRecordsByFilter,
  createUser: (email: string, password: string, options?: AuthOptions) => {
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
    return user
  },
  createAnonymousUser: (options?: AuthOptions) => {
    const pb = globalApi.pb()
    const email = `anonymous-${$security.randomStringWithAlphabet(
      10,
      '123456789'
    )}@example.com`
    const password = $security.randomStringWithAlphabet(40, '123456789')
    const user = pb.collection(options?.collection ?? 'users').create<User>({
      email,
      password,
      passwordConfirm: password,
    })
    return { user, email, password }
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

  ...log,
}
