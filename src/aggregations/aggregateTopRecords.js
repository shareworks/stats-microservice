'use strict'

const ranges = require('../constants/ranges')
const matchDomains = require('../stages/matchDomains')

module.exports = (ids, properties, range, limit, dateDetails, or, opts = {}) => {

	const aggregation = [
		matchDomains(ids),
		{
			$group: {
				_id: {},
				count: {
					$sum: 1,
				},
			},
		},
		{
			$sort: {
				count: -1,
			},
		},
		{
			$limit: limit,
		},
	]

	if (opts.organization) {
		aggregation[0].$match.organization = opts.organization
	}

	properties.forEach((property) => {
		if (or === true) {
			aggregation[0].$match['$or'] = [
				...(aggregation[0].$match['$or'] || []),
				{ [property]: { $ne: null } },
			]
		} else {
			aggregation[0].$match[property] = { $ne: null }
		}
		aggregation[1].$group._id[property] = `$${ property }`
	})

	if (range === ranges.RANGES_LAST_24_HOURS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastHours(24) }
	}

	if (range === ranges.RANGES_LAST_7_DAYS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastDays(7) }
	}

	if (range === ranges.RANGES_LAST_30_DAYS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastDays(30) }
	}

	if (range === ranges.RANGES_LAST_6_MONTHS) {
		aggregation[0].$match.created = { $gte: dateDetails.lastMonths(6) }
	}

	if (opts.minDate || opts.maxDate) {
		aggregation[0].$match.created = {
			...opts.minDate && { $gte: new Date(opts.minDate) },
			...opts.maxDate && { $lt: new Date(opts.maxDate) }
		}
	}

	return aggregation
}
