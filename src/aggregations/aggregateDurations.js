'use strict'

const intervals = require('../constants/intervals')
const matchDomains = require('../stages/matchDomains')
const projectDuration = require('../stages/projectDuration')
const projectMinInterval = require('../stages/projectMinInterval')
const matchLimit = require('../stages/matchLimit')

module.exports = (ids, interval, limit, dateDetails, opts) => {

	const aggregation = [
		matchDomains(ids),
		projectDuration(),
		projectMinInterval(),
		matchLimit(),
		{
			$group: {
				_id: {},
				count: {
					$avg: '$duration',
				},
			},
		},
	]

	if (opts.organization) {
		aggregation[0].$match.organization = opts.organization
	}

	if (opts.minDate || opts.maxDate) {
		aggregation[0].$match.created = {
			...opts.minDate && { $gte: new Date(opts.minDate) },
			...opts.maxDate && { $lt: new Date(opts.maxDate) }
		}
	} else {
		aggregation[0].$match.created = { $gte: dateDetails.includeFnByInterval(interval)(limit) }
	}

	const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }
	const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
	const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
	const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

	if (matchDay === true) aggregation[4].$group._id.day = { $dayOfMonth: dateExpression }
	if (matchMonth === true) aggregation[4].$group._id.month = { $month: dateExpression }
	if (matchYear === true) aggregation[4].$group._id.year = { $year: dateExpression }

	return aggregation
}
