import { createElement as h } from 'react'

import formatNumber from '../../utils/formatNumber.js'

import RendererChart from './RendererChart.js'

export default (props) =>
  h(RendererChart, {
    ...props,
    formatter: formatNumber,
  })
