module.exports = (api) => {
  const { request, redirect } = api
  const { email } = request.body()
  return { email }
}
