import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import Headline from '../Headline.js'
import Spacer from '../Spacer.js'

const CardSetting = (props) => {
  return h(
    'div',
    { className: 'card card--wide' },
    h(
      'div',
      { className: 'card__inner' },
      h(
        Headline,
        {
          type: 'h2',
          size: 'medium',
        },
        props.headline,
      ),
      h(Spacer, { size: 1.6 }),
      props.children,
    ),
  )
}

CardSetting.propTypes = {
  headline: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default CardSetting
