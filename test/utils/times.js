import test from 'ava'

import * as times from '../../src/utils/times.js'

test('return one second in milliseconds', (t) => {
  t.is(times.second, 1000)
})

test('return one minute in milliseconds', (t) => {
  t.is(times.minute, 60000)
})

test('return one hour in milliseconds', (t) => {
  t.is(times.hour, 3600000)
})

test('return one day in milliseconds', (t) => {
  t.is(times.day, 86400000)
})
