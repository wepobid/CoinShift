import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Card from '../common/card'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import { transferActions } from '../../state/ducks/transfer'

const RecentDepositItem = ({ item, settleMethods, depositMethods }) => {
  const depositMethod = depositMethods.find(
    el => el.id === item.depositMethodId
  )
  const settleMethod = settleMethods.find(el => el.id === item.settleMethodId)
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 45%
        `}
      >
        <span>{`${
          parseFloat(item.depositAmount).toFixed(4)
        } ${depositMethod?.asset.toUpperCase()}`}</span>
        <div
          css={css`
            width: 30px;
            margin-left: 5px;
          `}
        >
          <img
            css={css`
              width: 100%;
            `}
            src={`/logos/color/${depositMethod?.asset}.svg`}
            alt="logo deposit method"
          />
        </div>
      </div>
      <div>
        <img src="/img/recent-deposit-to.svg" alt="recent deposit arrow" />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 45%;
          justify-content: flex-end
        `}
      >
        <span>{`${
          parseFloat(item.settleAmount).toFixed(4)
        } ${settleMethod?.asset.toUpperCase()}`}</span>
        <div
          css={css`
            width: 30px;
            margin-left: 5px;
          `}
        >
          <img
            css={css`
              width: 100%;
            `}
            src={`/logos/color/${settleMethod?.asset}.svg`}
            alt="logo deposit method"
          />
        </div>
      </div>
    </div>
  )
}

const RecentDeposits = ({
  recentDeposits,
  fetchRecentDepositsWatcher,
  depositMethods,
  settleMethods,
}) => {
  useEffect(() => {
    fetchRecentDepositsWatcher(10)
  }, [])

  const mostRecentDeposits = recentDeposits?.slice(0, 10)

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
          Recent Shifts
        </h2>
      </div>
      <Card>
        {mostRecentDeposits?.map((item, index) => {
          return (
            <RecentDepositItem
              key={index}
              item={item}
              settleMethods={settleMethods}
              depositMethods={depositMethods}
            ></RecentDepositItem>
          )
        })}
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    depositMethods: state.transfer.depositMethods,
    settleMethods: state.transfer.settleMethods,
    recentDeposits: state.transfer.recentDeposits,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecentDepositsWatcher: pageSize =>
      dispatch(transferActions.fetchRecentDepositsWatcher(pageSize)),
  }
}

RecentDeposits.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(RecentDeposits)
