import { gql } from '@apollo/client'

import enhanceFacts from '../../../enhancers/enhanceFacts.js'
import useQuery from '../../utils/useQuery.js'

const QUERY = gql`
  query fetchMergedActiveVisitors {
    facts {
      id
      activeVisitors
    }
  }
`

export default () => {
  const selector = (data) => data?.facts
  const enhancer = enhanceFacts

  return useQuery(QUERY, selector, enhancer, {
    pollInterval: 5000,
  })
}
