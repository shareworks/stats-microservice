import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'
import listen from 'test-listen'

import server from '../../src/server.js'
import { api } from '../_utils.js'
import { cleanup, cleanupDatabase, connectToDatabase, fillDatabase, gql } from './_utils.js'

const base = listen(server)

let validDomain

const defaultTitle = uuid()
const updatedTitle = uuid()

test.before(connectToDatabase)
test.after.always(cleanup(server))
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

test.serial('create domain', async (t) => {
  const body = {
    query: gql`
      mutation createDomain($input: CreateDomainInput!) {
        createDomain(input: $input) {
          success
          payload {
            id
            title
          }
        }
      }
    `,
    variables: {
      input: {
        title: defaultTitle,
      },
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.createDomain.success)
  t.is(typeof json.data.createDomain.payload.id, 'string')
  t.is(json.data.createDomain.payload.title, defaultTitle)

  // Save domain for the next test
  validDomain = json.data.createDomain.payload
})

test.serial('update domain', async (t) => {
  const body = {
    query: gql`
      mutation updateDomain($id: ID!, $input: UpdateDomainInput!) {
        updateDomain(id: $id, input: $input) {
          success
          payload {
            id
            title
          }
        }
      }
    `,
    variables: {
      id: validDomain.id,
      input: {
        title: updatedTitle,
      },
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.updateDomain.success)
  t.is(json.data.updateDomain.payload.id, validDomain.id)
  t.is(json.data.updateDomain.payload.title, updatedTitle)

  // Save domain for the next test
  validDomain = json.data.updateDomain.payload
})

test.serial('fetch domains', async (t) => {
  const body = {
    query: gql`
      query fetchDomains {
        domains {
          id
          title
        }
      }
    `,
  }

  const { json } = await api(base, body, t.context.token.id)

  const domains = json.data.domains
  const domain = domains.find((domain) => domain.id === validDomain.id)

  t.is(domain.title, validDomain.title)
})

test.serial('fetch domain', async (t) => {
  const body = {
    query: gql`
      query fetchDomain($id: ID!) {
        domain(id: $id) {
          id
          title
        }
      }
    `,
    variables: {
      id: validDomain.id,
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.is(json.data.domain.id, validDomain.id)
  t.is(json.data.domain.title, validDomain.title)
})

test.serial('delete domain', async (t) => {
  const body = {
    query: gql`
      mutation deleteDomain($id: ID!) {
        deleteDomain(id: $id) {
          success
        }
      }
    `,
    variables: {
      id: validDomain.id,
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.deleteDomain.success)
})
