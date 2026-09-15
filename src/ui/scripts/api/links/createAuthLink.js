import { SetContextLink } from '@apollo/client/link/context'

import { get as getToken } from '../../hooks/useToken.js'

export default () => {
  return new SetContextLink((prevContext) => {
    const token = getToken()

    return {
      headers: {
        ...prevContext.headers,
        Authorization: `Bearer ${token}`,
      },
    }
  })
}
