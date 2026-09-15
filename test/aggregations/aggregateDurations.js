import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateDurations from '../../src/aggregations/aggregateDurations.js'
import { INTERVALS_DAILY } from '../../src/constants/intervals.js'
import createDate from '../../src/utils/createDate.js'

test('return aggregation', (t) => {
  const result = aggregateDurations(uuid(), INTERVALS_DAILY, 14, createDate())

  t.true(Array.isArray(result))
})
