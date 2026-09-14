import createArray from '../../../utils/createArray.js'
import sortByProp from '../../../utils/sortByProp.js'

export default (domains = [], length) => {
  // Ensure that each day has at least an empty list
  const base = createArray(length).map(() => [])

  return domains.reduce((acc, domain) => {
    for (const [index, view] of domain.statistics.views.entries()) {
      const existingItems = acc[index]
      const newItem = { text: domain.title, count: view.count }

      // Set items, sort items and reverse them, because it should be a desc sorting
      acc[index] = [...existingItems, newItem].toSorted(sortByProp('count')).toReversed()
    }

    return acc
  }, base)
}
