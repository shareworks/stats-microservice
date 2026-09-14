import { createElement as h } from 'react'

import formatDuration from '../../utils/formatDuration.js'

import RendererChart from './RendererChart.js'

const formatter = (ms) => formatDuration(ms).toString()

export default (props) =>
  h(RendererChart, {
    ...props,
    formatter,
  })
