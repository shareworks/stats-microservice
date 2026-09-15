import test from 'ava'

import * as durations from '../../src/constants/durations.js'

test('is an object', (t) => {
  t.is(typeof durations, 'object')
})
