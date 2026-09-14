import test from 'ava'

import timeZone from '../../src/utils/timeZone.js'

test('returns timeZone', (t) => {
  new Intl.DateTimeFormat(undefined, { timeZone })
  t.pass()
})
