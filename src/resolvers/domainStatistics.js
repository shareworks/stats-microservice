'use strict'

const views = require('../database/views')
const pages = require('../database/pages')
const referrers = require('../database/referrers')
const durations = require('../database/durations')
const systems = require('../database/systems')
const devices = require('../database/devices')
const browsers = require('../database/browsers')
const sizes = require('../database/sizes')
const languages = require('../database/languages')
const pipe = require('../utils/pipe')
const domainIds = require('../utils/domainIds')
const recursiveId = require('../utils/recursiveId')
const requireAuth = require('../middlewares/requireAuth')
const getOpts = require('../utils/getOpts')

module.exports = {
	DomainStatistics: {
		id: pipe(requireAuth, async (domain) => {
			const ids = await domainIds(domain)

			// Provide a static fallback id when there're no domains to create a recursive id from
			if (ids.length === 0) return 'eaf55ae8-29b8-448f-b45c-85e17fbfc8ba'

			return recursiveId(ids)
		}),
		views: pipe(requireAuth, async (domain, _, { dateDetails }) => {
      const { type, interval, limit } = _
      const opts = getOpts(_)
      const ids = await domainIds(domain)
      return views.get(ids, type, interval, (opts.dayDifference || limit), dateDetails, opts)
    }),
		pages: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { sorting, range, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return pages.get(ids, sorting, range, limit, dateDetails, opts)

		}),
		referrers: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { sorting, type, range, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return referrers.get(ids, sorting, type, range, limit, dateDetails, opts)

		}),
		durations: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { interval, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return durations.get(ids, interval, (opts.dayDifference || limit), dateDetails, opts)

		}),
		systems: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { sorting, type, range, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return systems.get(ids, sorting, type, range, limit, dateDetails, opts)

		}),
		devices: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { sorting, type, range, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return devices.get(ids, sorting, type, range, limit, dateDetails, opts)

		}),
		browsers: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { sorting, type, range, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return browsers.get(ids, sorting, type, range, limit, dateDetails, opts)

		}),
		sizes: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { sorting, type, range, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return sizes.get(ids, sorting, type, range, limit, dateDetails, opts)

		}),
		languages: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const { sorting, range, limit } = _
			const opts = getOpts(_)
			const ids = await domainIds(domain)
			return languages.get(ids, sorting, range, limit, dateDetails, opts)

		})
	},
	Query: {
		statistics: () => ({})
	}
}
