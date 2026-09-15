import test from 'ava'

import * as intervals from '../../src/constants/intervals.js'

test('is an object', (t) => {
  t.is(typeof intervals, 'object')
})
