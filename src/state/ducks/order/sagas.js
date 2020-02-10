import axios from 'axios'
import { updateError, populateOrder } from './actions'
import { updateIsLoading, updateOrderStatus } from '../common/actions'
import { CREATE_ORDER_WATCHER, FETCH_ORDER_WATCHER } from './types'
import { takeLatest, call, select, put } from 'redux-saga/effects'
import delay from '@redux-saga/delay-p'
import { navigate } from 'gatsby'

function createOrder(createOrderData) {
  return axios.post('https://sideshift.ai/graphql', {
    operationName: 'RequestQuote',
    variables: {
      input: {
        settleAddress: createOrderData.settleAddress,
        depositMethodId: createOrderData.depositMethodId,
        settleMethodId: createOrderData.settleMethodId,
        type: 'variable',
      },
    },
    query:
      'mutation RequestQuote($input: RequestQuoteInput!) {  requestQuote(input: $input) {    quoteId    depositMethodId    depositAddress    settleMethodId    settleAddress    __typename  }}',
  })
}

function fetchOder(orderId) {
  return axios.post('https://sideshift.ai/graphql', {
    operationName: 'quote',
    variables: { quoteId: orderId },
    query:
      'query quote($quoteId: String!) {  quote(quoteId: $quoteId) {    createdAt    quoteId    depositMethodId    depositAddress    settleMethodId    settleAddress    depositMin    depositMax    partnerLabel    returnUrl    refundAddress    expiresAt    settleRate    invoiceAmount    type    settleAmount    deposits {      depositId      createdAt      depositAmount      settleAmount      status      settleRate      settleTx      reason      refundTx      refundAddress      __typename    }    __typename  }}',
  })
}

function* fetchOrderEffectSaga(action) {
  try {

    while (true) {
      if(action.payload===undefined){
        yield put(updateOrderStatus(false))
      }
      else{
        yield put(updateOrderStatus(true))
        let { data } = yield call(fetchOder, action.payload)
        yield put(populateOrder(data.data.quote))
        yield delay(3000)
      }
      console.log('state', state)
      const state = yield select()
      if (!state.common.orderStatus) {
        break
      }
    }

  } catch (e) {
    console.log('Error :', e)
  }
}

function* createOrderEffectSaga(action) {
  try {
    let { data } = yield call(createOrder, action.payload)
    if (data.errors) {
      yield put(updateError(data.errors[0]))
    } else {
      navigate(`/order?id=${data.data.requestQuote.quoteId}`)
    }
  } catch (e) {
    console.log('Error :', e)
  }
}

export function* createOrderWatcherSaga() {
  yield takeLatest(CREATE_ORDER_WATCHER, createOrderEffectSaga)
}

export function* fetchOrderWatcherSaga() {
  yield takeLatest(FETCH_ORDER_WATCHER, fetchOrderEffectSaga)
}
