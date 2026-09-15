import { gql } from '@apollo/client'

import enhancePages from '../../../enhancers/enhancePages.js'
import pagesField from '../../fragments/pagesField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchPages($id: ID!, $sorting: Sorting!, $range: Range) {
    domain(id: $id) {
      id
      statistics {
        id
        ...pagesField
      }
    }
  }

  ${pagesField}
`

export default (id, filters) => {
  const selector = (data) => data?.domain.statistics.pages
  const enhancer = enhancePages

  return useQuery(QUERY, selector, enhancer, {
    variables: {
      ...filters,
      id,
    },
  })
}
