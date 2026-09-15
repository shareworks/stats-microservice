/**
 * Vercel Serverless Function entry point for the '/api' route.
 * Uses the fetch Web Standard supported by Vercel.
 *
 * See: https://vercel.com/docs/functions/functions-api-reference
 */
import { handler } from '../src/serverless.js'

export default { fetch: handler }
