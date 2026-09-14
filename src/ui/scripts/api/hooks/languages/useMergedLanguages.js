import { gql } from '@apollo/client'

import enhanceLanguages from '../../../enhancers/enhanceLanguages.js'
import languagesField from '../../fragments/languagesField.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchMergedLanguages($sorting: Sorting!, $range: Range) {
    statistics {
      id
      ...languagesField
    }
  }

  ${languagesField}
`

export default (filters) => {
  const selector = (data) => data?.statistics.languages
  const enhancer = enhanceLanguages

  return useQuery(QUERY, selector, enhancer, {
    variables: filters,
  })
}
