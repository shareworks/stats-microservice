import { createElement as h } from 'react'

import formatFloat from '../../utils/formatFloat.js'

import RendererChart from './RendererChart.js'

export default (props) =>
  h(RendererChart, {
    ...props,
    formatter: formatFloat,
  })
