import React from 'react'
import PropTypes from 'prop-types'
import { css, keyframes } from '@emotion/core'
import { colors } from './theme'

const pulse = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 48, 48, 0.4);
    box-shadow: 0 0 0 0 rgba(255, 48, 48, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 8px rgba(204,169,44, 0);
      box-shadow: 0 0 0 8px rgba(204,169,44, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`

const Rate = ({ rate, selectedDepositMethod, selectedSettleMethod }) => {
  if (rate === undefined) {
    return (
      <div
        css={css`
          color: #898989;
          display: inline-flex;
          align-items: center;
          @media (max-width: 425px) {
            font-size: 14px;
          }
        `}
      >
        Loading rate..
      </div>
    )
  } else if (rate.rate) {
    return (
      <div
        css={css`
          color: #898989;
          display: inline-flex;
          align-items: center;
          @media (max-width: 425px) {
            font-size: 14px;
          }
        `}
      >
        <div
          css={css`
            margin-right: 5px;
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #ff3030;
            cursor: pointer;
            box-shadow: 0 0 0 rgba(255, 48, 48, 0.4);
            animation: ${pulse} 2s infinite;
          `}
        ></div>
        <span>{`1 ${selectedDepositMethod?.toUpperCase()} ~ ${
          rate.rate
        } ${selectedSettleMethod?.toUpperCase()} (live)`}</span>
      </div>
    )
  } else {
    return (
      <div
        css={css`
          color: ${colors.danger};
          display: inline-flex;
          align-items: center;
          @media (max-width: 425px) {
            font-size: 14px;
          }
        `}
      >
        UNAVAILABLE
      </div>
    )
  }
}

Rate.propTypes = {
  rate: PropTypes.object,
  selectedDepositMethod: PropTypes.string,
  selectedSettleMethod: PropTypes.string,
}

export default Rate
