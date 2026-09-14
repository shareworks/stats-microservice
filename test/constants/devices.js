import test from 'ava'

import * as devices from '../../src/constants/devices.js'

test('is an object', (t) => {
  t.is(typeof devices, 'object')
})
