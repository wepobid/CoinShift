import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { colors } from './theme'

const Button = ({ children, disabled, handleClick, bgColor, color }) => {
  return (
    <div
      css={css`
        display: block;
        margin-top: 20px;
        height: 60px;
        line-height: 60px;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
        background: ${disabled
          ? colors.disabled
          : bgColor
          ? bgColor
          : colors.primary};
        color: ${color ? color : 'white'};
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.025em;
        transition: all 0.15s ease;
        cursor: ${disabled ? 'auto' : 'pointer'};
        text-decoration: none;
        text-align: center;
        &:hover {
          opacity: 0.95;
          transform: translateY(-1px);
          box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
            0 3px 6px rgba(0, 0, 0, 0.08);
        }
      `}
      onClick={() => (disabled ? null : handleClick())}
    >
      {children}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  bgColor: PropTypes.string,
  color: PropTypes.string,
}

export default Button
