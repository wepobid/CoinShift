import React, { useEffect, useState } from 'react'
import Card from '../common/card'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { transferActions } from '../../state/ducks/transfer'

const VolumeStats = ({ stats, fetchStatsWatcher }) => {
  useEffect(() => {
    fetchStatsWatcher()
  }, [])

  return (
    <div
      css={css`
        margin-top: 40px;
      `}
    >
      <div
        css={css`
          margin-bottom: 20px;
          margin-top: 20px;
          text-align: center;
        `}
      >
        <h2
          css={css`
            margin-bottom: 4px;
          `}
        >
          Volumes
        </h2>
      </div>
      <Card>
        <div
          css={css`
            display: flex;
            width: 100%;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 700;
            @media(max-width:425px){
              flex-direction: column;
            }
          `}
        >
          <div
            css={css`
              width: 50%;
              @media(max-width:425px){
                width: 100%;
                margin-bottom: 10px;
              }
            `}
          >
            <div css={css`font-size:1rem;color:#8F8F8F`}>24 Hours</div>
            <div>$ {stats?.shiftTotalUsd1D}</div>
          </div>
          <div
            css={css`
              width: 50%;
              @media(max-width:425px){
                width: 100%
              }
            `}
          >
            <div css={css`font-size:1rem;color:#8F8F8F`}>1 Week</div>
            <div>$ {stats?.shiftTotalUsd1W}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stats: state.transfer.stats,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStatsWatcher: () => dispatch(transferActions.fetchStatsWatcher()),
  }
}

VolumeStats.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeStats)
