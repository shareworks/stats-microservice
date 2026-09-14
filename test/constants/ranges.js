import test from 'ava'

import * as ranges from '../../src/constants/ranges.js'

test('is an object', (t) => {
  t.true(typeof ranges === 'object')
})
