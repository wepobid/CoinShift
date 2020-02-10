import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

const Card = ({ children }) => {
  return (
    <div
      css={css`
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        background: white;
        border: 1px #cbd5e0;
        border-radius: 0.25rem;
        padding: 2rem;
        @media (max-width: 425px) {
          padding: 1rem;
        }
      `}
    >
      {children}
    </div>
  )
}

PropTypes.Card = {
  children: PropTypes.node.isRequired,
}

export default Card
