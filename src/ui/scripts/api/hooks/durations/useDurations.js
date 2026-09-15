import { gql } from '@apollo/client'

import enhanceDurations from '../../../enhancers/enhanceDurations.js'
import durationsField from '../../fragments/durationsField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchDurations($id: ID!, $interval: Interval!, $limit: Int) {
    domain(id: $id) {
      id
      statistics {
        id
        ...durationsField
      }
    }
  }

  ${durationsField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.durations
  const enhancer = (value) => enhanceDurations(value, filters.limit)

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
