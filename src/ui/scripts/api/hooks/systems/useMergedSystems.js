import { gql } from '@apollo/client'

import enhanceSystems from '../../../enhancers/enhanceSystems.js'
import systemsField from '../../fragments/systemsField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchMergedSystems($sorting: Sorting!, $type: SystemType!, $range: Range) {
    statistics {
      id
      ...systemsField
    }
  }

  ${systemsField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.systems
  const enhancer = enhanceSystems

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
