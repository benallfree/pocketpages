module.exports = (api, next) => {
  const { auth, redirect } = api
  if (!auth) {
    return redirect('/auth/login', {
      message: 'You must be logged in to access this page',
    })
  }
  next()
}
