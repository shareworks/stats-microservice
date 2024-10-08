'use strict'

const { utcToZonedTime } = require('date-fns-tz')

const Record = require('../models/Record')
const aggregateViews = require('../aggregations/aggregateViews')
const aggregateAllViews = require('../aggregations/aggregateAllViews')
const constants = require('../constants/views')
const intervals = require('../constants/intervals')
const createArray = require('../utils/createArray')
const matchesDate = require('../utils/matchesDate')
const recursiveId = require('../utils/recursiveId')

const get = async (ids, type, interval, limit, dateDetails, opts = {}) => {
	const aggregation = (() => {
		if (type === constants.VIEWS_TYPE_UNIQUE) return aggregateViews(ids, true, interval, limit, dateDetails, opts)
		if (type === constants.VIEWS_TYPE_TOTAL) return aggregateViews(ids, false, interval, limit, dateDetails, opts)
	})()

	const enhance = (entries) => {
		const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
		const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
		const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

		return createArray(limit).map((_, index) => {
			const date = dateDetails.lastFnByInterval(interval)(index, opts.maxDate)

			// Database entries include the day, month and year in the
			// timezone of the user. We therefore need to match it against a
			// date in the timezone of the user.
			const userZonedDate = utcToZonedTime(date, dateDetails.userTimeZone)

			// Find a entry that matches the date
			const entry = entries.find((entry) => {
				return matchesDate(
					matchDay === true ? entry._id.day : undefined,
					matchMonth === true ? entry._id.month : undefined,
					matchYear === true ? entry._id.year : undefined,
					userZonedDate,
				)
			})

			const value = (() => {
				if (matchDay === true) return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`
				if (matchMonth === true) return `${ date.getFullYear() }-${ date.getMonth() + 1 }`
				if (matchYear === true) return `${ date.getFullYear() }`
			})()

			return {
				id: recursiveId([ value, ...ids ]),
				value,
				count: entry == null ? 0 : entry.count,
			}
		})
	}

	return enhance(
		await Record.aggregate(aggregation),
	)
}

const all = async (ids, type, interval, limit, dateDetails, opts = {}) => {

	const enhance = (entries) => {
		const entry = entries[0]
		return entry == null ? 0 : entry.count
	}

	const aggregation = (() => {

		if (type === constants.VIEWS_TYPE_UNIQUE) return aggregateAllViews(ids, true, interval, limit, dateDetails, opts)
		if (type === constants.VIEWS_TYPE_TOTAL) return aggregateAllViews(ids, false, interval, limit, dateDetails, opts)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)
}

module.exports = {
	get,
	all
}
