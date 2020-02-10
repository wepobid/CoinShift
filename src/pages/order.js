import React, { useEffect } from 'react'
import OrderCard from '../components/order/order-card'
import Layout from '../components/common/layout'
import { css } from '@emotion/core'
import SEO from '../components/common/seo'
import { transferActions } from '../state/ducks/transfer'
import { orderActions } from '../state/ducks/order'
import { authActions } from '../state/ducks/auth'

import { connect } from 'react-redux'

const Order = ({
  fetchMethodsWatcher,
  initializeSessionWatcher,
  location,
  fetchRateWatcher,
  fetchOrderWatcher
}) => {
  const orderId = location.search
    ? JSON.parse(
        '{"' +
          decodeURI(location.search.substring(1))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      ).id
    : null

  useEffect(() => {
    fetchMethodsWatcher()
    initializeSessionWatcher()
    return () => {
      fetchOrderWatcher()
      fetchRateWatcher()
    }
  }, [])

  return (
    <Layout>
      <SEO title="Order" />
      <div
        css={css`
          margin: 0 auto;
          max-width: 600px;
        `}
      >
        <OrderCard orderId={orderId} />
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    transfer: state.transfer,
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMethodsWatcher: () => dispatch(transferActions.fetchMethodsWatcher()),
    initializeSessionWatcher: () =>
      dispatch(authActions.initializeSessionWatcher()),
    fetchOrderWatcher: () => dispatch(orderActions.fetchOrderWatcher()),
    fetchRateWatcher: () => dispatch(transferActions.fetchRateWatcher()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
