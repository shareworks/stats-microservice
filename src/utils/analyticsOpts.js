import mongoose from 'mongoose'

// Shareworks extension: GraphQL receives strings, while MongoDB aggregation
// filters require native ObjectIds and Dates. Keep this conversion in one
// place so every facts/statistics resolver applies identical semantics.
export const getAnalyticsOpts = ({ organization, minDate, maxDate } = {}) => {
  const opts = {}

  if (organization) opts.organization = new mongoose.Types.ObjectId(organization)
  if (minDate) opts.minDate = new Date(minDate)
  if (maxDate) opts.maxDate = new Date(maxDate)

  return opts
}

export const applyAnalyticsOpts = (match, { organization, minDate, maxDate } = {}) => {
  if (organization) match.organization = organization

  // An explicit date range intentionally replaces Ackee's rolling-window
  // lower bound. `maxDate` remains exclusive, matching MongoDB $lt semantics.
  if (minDate || maxDate) {
    match.created = {
      ...(minDate && { $gte: minDate }),
      ...(maxDate && { $lt: maxDate }),
    }
  }

  return match
}
