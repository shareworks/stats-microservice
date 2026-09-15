import test from 'ava'

import * as sortings from '../../src/constants/sortings.js'

test('is an object', (t) => {
  t.is(typeof sortings, 'object')
})
