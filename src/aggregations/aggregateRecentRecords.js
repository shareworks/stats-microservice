'use strict'

const matchDomains = require('../stages/matchDomains')

module.exports = (ids, properties, limit, or, opts = {}) => {

	const aggregation = [
		matchDomains(ids),
		{
			$sort: {
				created: -1,
			},
		},
		{
			$project: {
				_id: {},
				created: '$created',
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
		aggregation[2].$project._id[property] = `$${ property }`
	})

	return aggregation
}
