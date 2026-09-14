import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import Headline from '../Headline.js'
import Text from '../Text.js'

const PresentationValueUnit = (props) => {
  return h(
    'div',
    {
      className: 'valueUnit',
    },
    h(
      Headline,
      {
        type: 'div',
        spacing: false,
      },
      props.value,
    ),
    h(
      Text,
      {
        type: 'div',
        spacing: false,
      },
      props.unit,
    ),
  )
}

PresentationValueUnit.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string.isRequired,
}

export default PresentationValueUnit
