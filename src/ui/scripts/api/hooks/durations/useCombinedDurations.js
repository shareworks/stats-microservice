import { gql } from '@apollo/client'

import enhanceCombinedDurations from '../../../enhancers/enhanceCombinedDurations.js'
import durationsField from '../../fragments/durationsField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchCombinedDurations($interval: Interval!, $limit: Int) {
    domains {
      id
      title
      statistics {
        id
        ...durationsField
      }
    }
  }

  ${durationsField}
`

export default (filters) => {
  const selector = (data) => data?.domains
  const enhancer = (value) => enhanceCombinedDurations(value, filters.limit)

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
