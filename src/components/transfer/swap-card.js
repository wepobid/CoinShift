import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Card from '../common/card'
import { css } from '@emotion/core'
import CryptoSelect from './crypto-select'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import { transferActions } from '../../state/ducks/transfer'
import { orderActions } from '../../state/ducks/order'
import Button from '../common/button'
import Rate from '../common/rate'
import { colors } from '../common/theme'


const SwapCard = ({exchangeData, settleMethods, depositMethods, selectedSettleMethod, selectedDepositMethod, selectSettleMethod, selectDepositMethod, rate, fetchRateWatcher, settleAddress, populateSettleAddress, createOrderWatcher, orderError}) => {
    const [error, setError] = useState();

    useEffect(() => {
        if(settleMethods && depositMethods){
          if(selectedSettleMethod && selectedDepositMethod){
              navigate(`/?from=${selectedDepositMethod.id}&to=${selectedSettleMethod.id}`)
              fetchRateWatcher({from: selectedDepositMethod.asset.toUpperCase(), to: selectedSettleMethod.asset.toUpperCase()})
          }
          else{
              if(exchangeData){
                selectSettleMethod(settleMethods.find(el => el.id === exchangeData.to))
                selectDepositMethod(depositMethods.find(el => el.id === exchangeData.from))
              }else{
                const randomSettleMethod = settleMethods[Math.floor(Math.random() * (settleMethods.length))]
                const randomDepositMethod = depositMethods[Math.floor(Math.random() * (depositMethods.length))]
                navigate(`/?from=${randomDepositMethod.id}&to=${randomSettleMethod.id}`)
                selectSettleMethod(randomSettleMethod)
                selectDepositMethod(randomDepositMethod)
              }
          }

        }
        setError(null)
    }, [settleMethods, depositMethods, selectedSettleMethod, selectedDepositMethod])


    useEffect(() => {
      setError(orderError?.message)
    }, [orderError])

    const createOrder = () => {
      createOrderWatcher({settleAddress:settleAddress,depositMethodId:selectedDepositMethod.id,settleMethodId:selectedSettleMethod.id})
    }

    const swapMethods = () => {
      selectSettleMethod(settleMethods.find(el => el.id === selectedDepositMethod.id))
      selectDepositMethod(depositMethods.find(el => el.id === selectedSettleMethod.id))
    }

  if(selectedSettleMethod && selectedDepositMethod){
  return (
    <div>
      <Card>
        <div
          css={css`
            width: 100%;
          `}
        >
          {depositMethods ? <CryptoSelect options={depositMethods} selectedOption={selectedDepositMethod} setSelectedOption={selectDepositMethod} label="From"/> : null}
        </div>

        <div
          css={css`
            text-align: center;
            margin: 10px 0px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
          `}
        >
          <Rate rate={rate} selectedDepositMethod={selectedDepositMethod.asset} selectedSettleMethod={selectedSettleMethod.asset}/>
          <div>
            <img css={css`cursor:pointer`} onClick={() => swapMethods()} src="/img/swap.svg" />
          </div>
        </div>
        <div
          css={css`
            width: 100%;
          `}
        >
          {settleMethods ? <CryptoSelect options={settleMethods} selectedOption={selectedSettleMethod} setSelectedOption={selectSettleMethod} label="To" /> : null}
        </div>
        {
          selectedSettleMethod ?
        <div css={css`width:100%; margin-top:20px`}>
          <label css={css`margin-bottom:5px;display:block;color:#898989`}>{`Your ${selectedSettleMethod?.displayName} address`}</label>
          <input css={css`
            display: block;
            width: 100%;
            height: 60px;
            padding: 10px;
            font-size: 1rem;
            font-weight: 400;
            color: #f6f6f6;
            background-color: black;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            width: 100%
            &:placeholder{
              color:red
            }
            &:disabled{
              background: #d6d6d6
            }
          `}
          placeholder={selectedDepositMethod.id === 'ln' || selectedDepositMethod.id ==='xlm' ? `This shift is not supported yet` :`Write your ${selectedSettleMethod?.displayName} address`}
          value={settleAddress}
          disabled={selectedDepositMethod.id === 'ln' || selectedDepositMethod.id ==='xlm'}
          onChange={e => populateSettleAddress(e.target.value)}
          />
        </div>
        : null
        }

        {
          selectedSettleMethod && selectedDepositMethod ?
          <div css={css`
            width: 100%;
          `}>
            {selectedDepositMethod.id === 'ln' || selectedDepositMethod.id ==='xlm' ? <Button disabled={true}>NOT SUPPORTED YET</Button>: <Button handleClick={createOrder} disabled={!(settleAddress && rate?.rate)}>{rate?.rate ? `SHIFT` : `UNAVAILABLE`}</Button>}
          </div>
          : null
        }
        {<div css={css`margin-top:10px;color:${colors.danger};text-align:center`}>{error}</div>}
      </Card>
    </div>
  )
  }
  else{
    return (
    <div css={css``}>

    </div>
    )
  }
}

const mapStateToProps = state => {
    return ({
        depositMethods: state.transfer.depositMethods,
        settleMethods: state.transfer.settleMethods,
        selectedSettleMethod:state.transfer.selectedSettleMethod,
        selectedDepositMethod:state.transfer.selectedDepositMethod,
        rate: state.transfer.rate,
        settleAddress: state.transfer.settleAddress,
        orderError: state.order.error
    })
  }

const mapDispatchToProps = dispatch => {
return {
    selectSettleMethod: settleMethod => dispatch(transferActions.selectSettleMethod(settleMethod)),
    selectDepositMethod: depositMethod => dispatch(transferActions.selectDepositMethod(depositMethod)),
    fetchRateWatcher: rateRequest => dispatch(transferActions.fetchRateWatcher(rateRequest)),
    stopRateWatcher: () => dispatch(transferActions.stopRateWatcher()),
    populateSettleAddress: settleAddress => dispatch(transferActions.populateSettleAddress(settleAddress)),
    createOrderWatcher: createOrderData => dispatch(orderActions.createOrderWatcher(createOrderData))
 }
}

SwapCard.propTypes = {
  exchangeData: PropTypes.object,
  settleMethods: PropTypes.array,
  depositMethods: PropTypes.array,
  selectedSettleMethod: PropTypes.object,
  selectedDepositMethod: PropTypes.object,
  selectSettleMethod: PropTypes.func,
  selectDepositMethod: PropTypes.func,
  rate: PropTypes.object,
  fetchRateWatcher: PropTypes.func,
  settleAddress: PropTypes.string,
  populateSettleAddress: PropTypes.func,
  createOrderWatcher: PropTypes.func,
  orderError: PropTypes.object
}


export default connect(mapStateToProps, mapDispatchToProps)(SwapCard)
