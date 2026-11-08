/**
 * Turns a PocketBase SDK error into a readable message, including
 * field-level validation errors (e.g. "password: Must be at least 8 characters").
 */
module.exports = function errorMessage(e) {
  const fields = (e && e.response && e.response.data) || {}
  const details = Object.keys(fields)
    .map((key) => `${key}: ${fields[key].message}`)
    .join('; ')
  return details || (e && e.message) || 'Something went wrong'
}
