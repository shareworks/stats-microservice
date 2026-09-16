# Shareworks Stats Microservice

The Shareworks Stats Microservice is a self-hosted analytics service based on
[Ackee](https://github.com/electerious/Ackee). It provides the Ackee web UI,
tracker, and GraphQL API, with Shareworks extensions for organization-scoped
analytics.

## Shareworks extensions

- Analytics records may include an optional `organization` ID.
- Organization, date-range, and statistics filters are available through the
  GraphQL API.
- Browser clients should access the service through the Buddycheck Advantage
  proxy. The proxy keeps the Ackee credential and organization authorization
  on the server side.

See [CUSTOM_EXTENSIONS.md](CUSTOM_EXTENSIONS.md) for the complete extension
behavior and security notes.

## Run locally

Requirements: Node.js 24 or later and MongoDB.

1. Install dependencies with `npm ci`.
2. Create a `.env` file:

   ```dotenv
   ACKEE_MONGODB=mongodb://localhost:27017/ackee
   ACKEE_USERNAME=username
   ACKEE_PASSWORD=password
   ```

3. Start the service with `npm run dev`.

The web UI is available at `http://localhost:3000`, and the GraphQL endpoint
is `http://localhost:3000/api`.

For Docker Compose, set the same credentials in `.env` and run
`docker compose up`.

## GraphQL API

The service retains Ackee's GraphQL API. Authentication is required for
analytics queries. The full upstream API reference is available in
[docs/API.md](docs/API.md).

Shareworks applications can associate a visit with an organization through
`CreateRecordInput.organization` and apply these arguments to every
`DomainStatistics` field:

- `organization`: include only records for the supplied organization ID.
- `minDate`: inclusive lower bound for a record's creation time.
- `maxDate`: exclusive upper bound for a record's creation time.

`Facts` fields also accept `organization`; `averageViews` and
`averageDuration` additionally accept `minDate` and `maxDate`. Supplying a
date bound replaces Ackee's default rolling-window filter for the affected
aggregation.

These filters are not authorization controls. Callers must verify organization
membership before querying the service.

## Configuration and development

Configuration uses environment variables. The essential variables are
`ACKEE_MONGODB`, `ACKEE_USERNAME`, and `ACKEE_PASSWORD`; see
[docs/Options.md](docs/Options.md) for all options.

Useful commands:

```sh
npm run dev     # Run the development server
npm run build   # Build frontend assets
npm run lint    # Check linting and formatting
npm test        # Run linting and AVA tests
```

## Upstream

This repository contains Shareworks-specific changes on top of
[Ackee](https://github.com/electerious/Ackee). Refer to the upstream project
for general tracker usage, deployment guides, and the base product
documentation.
