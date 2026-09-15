import test from 'ava'
import listen from 'test-listen'

import server from '../../src/server.js'
import { api } from '../_utils.js'
import { cleanup, cleanupDatabase, connectToDatabase, fillDatabase, gql } from './_utils.js'

const base = listen(server)

let validRecord
let ignoredRecord

test.before(connectToDatabase)
test.after.always(cleanup(server))
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

test.serial('create record', async (t) => {
  const body = {
    query: gql`
      mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
        createRecord(domainId: $domainId, input: $input) {
          success
          payload {
            id
          }
        }
      }
    `,
    variables: {
      domainId: t.context.domain.id,
      input: {
        siteLocation: 'https://example.com/',
        siteReferrer: 'https://google.com/',
      },
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.createRecord.success)
  t.is(typeof json.data.createRecord.payload.id, 'string')

  // Save record for the next test
  validRecord = json.data.createRecord.payload
})

test.serial('update record', async (t) => {
  const body = {
    query: gql`
      mutation updateRecord($id: ID!) {
        updateRecord(id: $id) {
          success
        }
      }
    `,
    variables: {
      id: validRecord.id,
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.updateRecord.success)
})

test.serial('ignore record creation when logged in', async (t) => {
  const body = {
    query: gql`
      mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
        createRecord(domainId: $domainId, input: $input) {
          success
          payload {
            id
          }
        }
      }
    `,
    variables: {
      domainId: t.context.domain.id,
      input: { siteLocation: 'https://example.com/' },
    },
  }

  const { json } = await api(base, body, t.context.token.id, {
    Cookie: 'ackee_ignore=1',
  })

  t.true(json.data.createRecord.success)
  t.is(json.data.createRecord.payload.id, '88888888-8888-8888-8888-888888888888')

  // Save record for the next test
  ignoredRecord = json.data.createRecord.payload
})

test.serial('ignore record update when logged in', async (t) => {
  const body = {
    query: gql`
      mutation updateRecord($id: ID!) {
        updateRecord(id: $id) {
          success
        }
      }
    `,
    variables: {
      id: ignoredRecord.id,
    },
  }

  const { json } = await api(base, body, t.context.token.id, {
    Cookie: 'ackee_ignore=1',
  })

  t.true(json.data.updateRecord.success)
})

test.serial('reject record with invalid siteLocation', async (t) => {
  const body = {
    query: gql`
      mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
        createRecord(domainId: $domainId, input: $input) {
          success
          payload {
            id
          }
        }
      }
    `,
    variables: {
      domainId: t.context.domain.id,
      input: {
        siteLocation: 'test.com.1.2.3',
      },
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.is(json.data, undefined)
  t.truthy(json.errors)
  t.is(json.errors.length, 1)
  t.true(json.errors[0].message.includes('Invalid URL'))
})

test.serial('reject record with invalid siteReferrer', async (t) => {
  const body = {
    query: gql`
      mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
        createRecord(domainId: $domainId, input: $input) {
          success
          payload {
            id
          }
        }
      }
    `,
    variables: {
      domainId: t.context.domain.id,
      input: {
        siteLocation: 'https://example.com/',
        siteReferrer: 'not-a-valid-url',
      },
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.is(json.data, undefined)
  t.truthy(json.errors)
  t.is(json.errors.length, 1)
  t.true(json.errors[0].message.includes('Invalid URL'))
})
