import test from 'ava'

import * as systems from '../../src/constants/systems.js'

test('is an object', (t) => {
  t.is(typeof systems, 'object')
})
