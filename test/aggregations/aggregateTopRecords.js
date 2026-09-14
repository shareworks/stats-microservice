import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateTopRecords from '../../src/aggregations/aggregateTopRecords.js'
import createDate from '../../src/utils/createDate.js'

test('return aggregation', (t) => {
  const result = aggregateTopRecords(uuid(), ['osName', 'osVersion'], createDate())

  t.true(Array.isArray(result))
})
