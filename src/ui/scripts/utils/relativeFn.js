import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../../../constants/intervals.js'

import relativeDays from './relativeDays.js'
import relativeMonths from './relativeMonths.js'
import relativeYears from './relativeYears.js'

export default (interval) => {
  switch (interval) {
    case INTERVALS_DAILY: {
      return relativeDays
    }
    case INTERVALS_MONTHLY: {
      return relativeMonths
    }
    case INTERVALS_YEARLY: {
      return relativeYears
    }
    default: {
      throw new Error(`Unknown interval '${interval}'`)
    }
  }
}
