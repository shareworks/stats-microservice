/**
 * Netlify Serverless Function entry point.
 * Uses the Web API (Request/Response) supported by Netlify Functions.
 *
 * See: https://docs.netlify.com/functions/get-started/
 */
export { handler as default } from '../../src/serverless.js'

export const config = {
  path: '/api',
}
