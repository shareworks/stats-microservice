import test from 'ava'
import signaleModule from 'signale'

import signale from '../../src/utils/signale.js'

const { Signale } = signaleModule

test('is a Signale instance', (t) => {
  t.true(signale instanceof Signale)
})
