import React, { useEffect, useState } from 'react'
import Card from '../common/card'
import { css } from '@emotion/core'
import { orderActions } from '../../state/ducks/order'
import { transferActions } from '../../state/ducks/transfer'
import { connect } from 'react-redux'
import moment from 'moment'
import { colors } from '../common/theme'
import { QRCode } from 'react-qrcode-logo'
import * as copy from 'copy-to-clipboard'
import Button from '../common/button'
import { navigate } from 'gatsby'
import Rate from '../common/rate'

const MethodItem = ({ method }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 10px;
        justify-content: center;
      `}
    >
      <div>
        <img
          css={css`
            height: 60px;
            width: 60px;
          `}
          src={`/logos/color/${method?.asset}.svg`}
        />
      </div>
      <div
        css={css`
          margin-left: 0.5rem;
        `}
      >
        <div
          css={css`
            font-size: 1.8rem;
            font-weight: 700;
          `}
        >
          {method?.asset}
        </div>
        <div>{method?.displayName}</div>
      </div>
    </div>
  )
}

const OrderCard = ({
  fetchOrderWatcher,
  fetchRateWatcher,
  orderDetail,
  orderId,
  settleMethods,
  depositMethods,
  rate,
  location,
  session,
}) => {

  const [depositMethod, setDepositMethod] = useState()
  const [settleMethod, setSettleMethod] = useState()
  const [isDepositAddressCopied, setIsDepositAddressCopied] = useState(false)


  useEffect(() => {
    fetchOrderWatcher(orderId)
  }, [])

  useEffect(() => {
    if(depositMethods && settleMethods && orderDetail){
      const selectedDepositMethod = depositMethods?.find(el => el.id === orderDetail.depositMethodId)
      const selectedSettleMethod = settleMethods?.find(el => el.id === orderDetail.settleMethodId)

      setDepositMethod(selectedDepositMethod)
      setSettleMethod(selectedSettleMethod)

      fetchRateWatcher({from: selectedDepositMethod.asset.toUpperCase(), to: selectedSettleMethod.asset.toUpperCase()})
    }
  }, [depositMethods, settleMethods, orderDetail])


  const {
    quoteId,
    depositMethodId,
    settleMethodId,
    depositAddress,
    depositMin,
    depositMax,
    settleAddress,
  } = { ...orderDetail }

  const copyDepositAddress = () => {
    copy(depositAddress.address)
    setIsDepositAddressCopied(true)
    setTimeout(function() {
      setIsDepositAddressCopied(false)
    }, 500)
  }

  return (
    <>
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
          Order {quoteId}
        </h2>
        {moment().isAfter() ? (
          <div
            css={css`
              background: ${colors.danger};
              padding: 4px 10px;
              display: inline-block;
              border-radius: 4px;
              color: white;
            `}
          >
            Expired
          </div>
        ) : (
          <div
            css={css`
              background: ${colors.success};
              padding: 4px 10px;
              display: inline-block;
              border-radius: 4px;
              color: white;
            `}
          >
            active
          </div>
        )}
      </div>
      <Card>
      {depositMethod && settleMethod ?
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            @media (max-width: 425px) {
              flex-direction: column;
            }
          `}
        >
          <MethodItem method={depositMethod} />
          <div
            css={css`
              padding: 0px 5px;
              @media (max-width: 425px) {
                text-align: center;
              }
            `}
          >
            <img
              css={css`
                @media (max-width: 425px) {
                  transform: rotate(90deg);
                }
              `}
              src={`/img/to-arrow.svg`}
            />
          </div>
          <MethodItem method={settleMethod} />
        </div>
        : null}
        <div
          css={css`
            text-align: center;
            margin: 20px auto;
          `}
        >
          <div
            css={css`
              margin-bottom: 5px;
            `}
          >
            Transfer to this {depositMethodId?.toUpperCase()} address:
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <QRCode
              value={depositAddress?.address}
              logoImage={'/img/qr-logo.svg'}
              fgColor={'#000000'}
            />
          </div>
          <div
            css={css`
              font-weight: 700;
              word-wrap: break-word;
            `}
          >
            {depositAddress?.address}
          </div>
          <div
            css={css`
              margin: 5px auto;
            `}
          >
            <div
              onClick={() => copyDepositAddress()}
              css={css`
                color: ${colors.primary};
                border: 1px solid ${colors.primary};
                padding: 2px 8px;
                display: inline-block;
                border-radius: 4px;
                cursor: pointer;
              `}
            >
              Copy Address
            </div>
            {isDepositAddressCopied ? (
              <div
                css={css`
                  display: inline-block;
                  position: absolute;
                  font-size: 12px;
                  margin-left: 5px;
                  background: black;
                  padding: 2px 5px;
                  border-radius: 3px;
                  color: #f6f6f6;
                `}
              >
                Copied
              </div>
            ) : null}
          </div>
          <div css={css`margin: 10px auto; text-align: center`}>
             <Rate rate={rate} selectedDepositMethod={depositMethod?.asset} selectedSettleMethod={settleMethod?.asset}/>
          </div>
          <div
            css={css`
              margin: 10px auto;
            `}
          >
            <div>
              Minimum:{' '}
              <strong>
                {depositMin} {depositMethodId?.toUpperCase()}
              </strong>
            </div>
            <div>
              Maximum:{' '}
              <strong>
                {depositMax} {depositMethodId?.toUpperCase()}
              </strong>
            </div>
          </div>

          <div
            css={css`
              margin: 20px auto;
              background: #f6f6f6;
              padding: 10px;
              border-radius: 6px;
            `}
          >
            <div>Transferred XMR will settle to BTC address:</div>
            <div
              css={css`
                font-weight: 700;
                word-wrap: break-word;
              `}
            >
              {settleAddress?.address}
            </div>
          </div>
          <Button bgColor="#27A5E7" handleClick={() => navigate('/telegram')}>
            <div
              css={css`
                background: url('/img/telegram-logo.svg') left center no-repeat;
                display: inline-block;
                padding-left: 30px;
              `}
            >
              GET TELEGRAM NOTIFICATION
            </div>
          </Button>
        </div>
      </Card>
    </>
  )
}

const mapStateToProps = state => {
  return {
    depositMethods: state.transfer.depositMethods,
    settleMethods: state.transfer.settleMethods,
    orderDetail: state.order.detail,
    session: state.auth.session,
    rate: state.transfer.rate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderWatcher: orderId =>
      dispatch(orderActions.fetchOrderWatcher(orderId)),
    fetchRateWatcher: rateRequest => dispatch(transferActions.fetchRateWatcher(rateRequest)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard)
