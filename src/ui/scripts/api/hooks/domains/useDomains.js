import { gql } from '@apollo/client'

import domainFields from '../../fragments/domainFields.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchDomains {
    domains {
      ...domainFields
    }
  }

  ${domainFields}
`

export default () => {
  const selector = (data) => data?.domains
  const enhancer = (domains = []) => domains

  return useQuery(QUERY, selector, enhancer, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  })
}
