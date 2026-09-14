import { gql } from '@apollo/client'

import enhanceSizes from '../../../enhancers/enhanceSizes.js'
import sizesField from '../../fragments/sizesField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchMergedSizes($sorting: Sorting!, $type: SizeType!, $range: Range) {
    statistics {
      id
      ...sizesField
    }
  }

  ${sizesField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.sizes
  const enhancer = enhanceSizes

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
