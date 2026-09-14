import mongoose from 'mongoose'

export const getAnalyticsOpts = ({ organization, minDate, maxDate } = {}) => {
  const opts = {}

  if (organization) opts.organization = new mongoose.Types.ObjectId(organization)
  if (minDate) opts.minDate = new Date(minDate)
  if (maxDate) opts.maxDate = new Date(maxDate)

  return opts
}

export const applyAnalyticsOpts = (match, { organization, minDate, maxDate } = {}) => {
  if (organization) match.organization = organization

  if (minDate || maxDate) {
    match.created = {
      ...(minDate && { $gte: minDate }),
      ...(maxDate && { $lt: maxDate }),
    }
  }

  return match
}
