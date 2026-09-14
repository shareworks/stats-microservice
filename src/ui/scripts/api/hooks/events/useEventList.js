import { gql } from '@apollo/client'

import enhanceEventList from '../../../enhancers/enhanceEventList.js'
import listField from '../../fragments/listField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchEventListEntries($id: ID!, $sorting: Sorting!, $type: EventListType!, $range: Range) {
    event(id: $id) {
      id
      statistics {
        id
        ...listField
      }
    }
  }

  ${listField}
`

export default (id, filters) => {
  const selector = (data) => data?.event.statistics.list
  const enhancer = enhanceEventList

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
