/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = (api) => {
  const { body, redirect, response, signInUserWithPassword } = api

  const { identity, password } = body()

  let error = null
  try {
    signInUserWithPassword(identity, password)
    redirect(`/`)
  } catch (e) {
    error = e.message
  }

  return { error }
}
