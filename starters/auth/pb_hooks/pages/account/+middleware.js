module.exports = (api) => {
  const { auth, redirect } = api
  if (!auth) {
    redirect('/auth/login')
  }
}
