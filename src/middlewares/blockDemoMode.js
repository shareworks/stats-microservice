import KnownError from '../utils/KnownError.js'

export default (parent, args, { isDemoMode }) => {
  if (isDemoMode === true) {
    throw new KnownError('Forbidden in demo mode')
  }
}
