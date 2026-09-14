import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import pipe from '../../src/utils/pipe.js'

test('return response of first function with a return value', async (t) => {
  const _b = uuid()
  const _c = uuid()

  const a = () => null
  const b = () => _b
  const c = () => _c

  const result = await pipe(a, b, c)()

  t.is(result, _b)
})

test('pass parameter to functions in pipe', async (t) => {
  const _a = uuid()

  const a = (parameter) => parameter

  const result = await pipe(a)(_a)

  t.is(result, _a)
})
