import isAuthenticationError from '../utils/isAuthenticationError.js'

export default (token, errors, reset) => {
  const hasToken = token != null
  if (hasToken === false) return false

  const hasAuthenticationError = errors.some(isAuthenticationError)
  if (hasAuthenticationError === true) {
    reset()
    return false
  }

  return true
}
