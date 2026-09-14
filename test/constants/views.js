import test from 'ava'

import * as views from '../../src/constants/views.js'

test('is an object', (t) => {
  t.is(typeof views, 'object')
})
