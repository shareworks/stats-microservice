import formatError from './formatError.js'

export default (errors) => errors.map(formatError).join('\n\n')
