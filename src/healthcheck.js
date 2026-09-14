import config from './utils/config.js'
import connect from './utils/connect.js'
import signale from './utils/signale.js'

if (config.dbUrl == null) {
  signale.fatal('MongoDB connection URI missing in environment')
  process.exit(1)
}

const checkServer = async (url) => {
  const response = await fetch(url)

  if (response.ok === false) {
    throw new Error(`Server is unhealthy and returned with the status '${response.status}'`)
  }
}

const checkApi = async (url) => {
  // Send a minimal GraphQL introspection query to verify the API is responsive
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{__typename}' }),
  })

  if (response.ok === false) {
    throw new Error(`API is unhealthy and returned with the status '${response.status}'`)
  }
}

const exit = (healthy) => process.exit(healthy === true ? 0 : 1)

const check = () =>
  Promise.all([
    connect(config.dbUrl),
    checkServer(`http://localhost:${config.port}`),
    checkApi(`http://localhost:${config.port}/api`),
  ])

const handleSuccess = () => {
  signale.success('Ackee is up and running')
  exit(true)
}

const handleFailure = (error) => {
  signale.fatal(error)
  exit(false)
}

check().then(handleSuccess).catch(handleFailure)
