import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateActiveVisitors from '../../src/aggregations/aggregateActiveVisitors.js'
import createDate from '../../src/utils/createDate.js'

test('return aggregation', (t) => {
  const result = aggregateActiveVisitors(uuid(), createDate())

  t.true(Array.isArray(result))
})
