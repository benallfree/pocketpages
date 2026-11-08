/**
 * Tracks a sign-in that's waiting for its second MFA step.
 *
 * PocketBase answers the first step with a 401 whose `response.mfaId` is set.
 * We keep { mfaId, otpId?, identity, next } in a short-lived httpOnly cookie
 * and finish on /auth/login/mfa with the other method.
 */
const COOKIE = 'pp_mfa'

module.exports = {
  /** The mfaId from a failed first-step SDK error, or null. */
  mfaIdFrom: (e) => (e && e.response && e.response.mfaId) || null,

  start: (response, state) =>
    response.cookie(COOKIE, state, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 10 * 60,
    }),

  read: (request) => {
    const state = request.cookies(COOKIE)
    return state && typeof state === 'object' && state.mfaId ? state : null
  },

  clear: (response) => response.cookie(COOKIE, '', { maxAge: 0 }),
}
