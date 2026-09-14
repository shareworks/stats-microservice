# Shareworks analytics extensions

This service is based on Ackee and intentionally extends its GraphQL API for
Shareworks applications. These extensions are not part of upstream Ackee.

## Organization-aware records

`CreateRecordInput` accepts an optional `organization: ID`. The value is stored
on `Record.organization` as a MongoDB ObjectId and is returned on `Record`.
Existing records without an organization remain valid and are returned only
when no organization filter is supplied.

## Statistics filters

Every `DomainStatistics` field accepts the optional arguments `organization`,
`minDate`, and `maxDate`. `Facts` supports `organization`; its average fields
also support `minDate` and `maxDate`.

`organization` limits the aggregation to records for that organization.
`minDate` is inclusive and `maxDate` is exclusive. Date filters replace the
default rolling-window filter used by Ackee's list/chart aggregation.

These options are server-side data filters, not authorization. Callers must
enforce organization membership before sending the request. Production web
clients should use the Buddycheck Advantage proxy so the Ackee credential and
organization authorization remain server-side.
