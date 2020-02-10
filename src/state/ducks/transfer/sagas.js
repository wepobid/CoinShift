import axios from 'axios'
import {
  populateSettleMethods,
  populateDepositMethods,
  populateRecentDeposits,
  populateRate,
  populateStats
} from './actions'
import {
  FETCH_METHODS_WATCHER,
  FETCH_RATE_WATCHER,
  FETCH_RECENT_DEPOSITS_WATCHER,
  FETCH_STATS_WATCHER
} from './types'
import { updateIsLoading, updateFetchRateStatus } from '../common/actions'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import delay from '@redux-saga/delay-p'

function fetchMethods() {
  return axios.post('https://sideshift.ai/graphql', {
    operationName: 'facts',
    variables: {},
    query:
      'query facts {  settleMethods {    id    node    displayName    asset    method    enabled    categories {      id      name      priority      __typename    }    __typename  }  depositMethods {    id    displayName    asset    method    enabled    categories {      id      name      priority      __typename    }    invoice    invoiceRequiresAmount    __typename  }  permissions {    createQuote    __typename  }}',
  })
}

function fetchRate(rateRequest) {
  return axios.post('https://sideshift.ai/graphql', {
    operationName: 'rate',
    variables: { from: rateRequest.from, to: rateRequest.to },
    query:
      'query rate($from: String!, $to: String!) {  rate(from: $from, to: $to) {    rate    shapeshiftRate    __typename  }}',
  })
}

function fetchRecentDeposits(pageSize) {
  return axios.post('https://sideshift.ai/graphql', {
    operationName: 'recentDeposits',
    variables: { first: pageSize },
    query:
      'query recentDeposits {  recentDeposits {    createdAt    depositMethodId    depositAmount    settleMethodId    settleAmount    __typename  }}',
  })
}

function fetchStats() {
  return axios.post('https://sideshift.ai/graphql',  {
    operationName: 'stats',
    variables: {},
    query:
      'query stats {  stats {    shiftCount1H    shiftTotalUsd1H    shiftCount1D    shiftTotalUsd1D    shiftCount1W    shiftTotalUsd1W    __typename  }}',
  })
}

function* fetchMethodsEffectSaga() {
  try {
    let { data } = yield call(fetchMethods)
    yield put(
      populateSettleMethods(data.data.settleMethods.filter(e => e.enabled))
    )
    yield put(
      populateDepositMethods(
        data.data.depositMethods.filter(e => e.enabled)
      )
    )
   } catch (e) {
    console.log('Error :', e)
  }
}

function* fetchRateEffectSaga(action) {
  try {
    while (true) {
      if(action.payload===undefined){
        yield put(updateFetchRateStatus(false))
      }
      else{
        yield put(updateFetchRateStatus(true))
        let { data } = yield call(fetchRate, action.payload)
        yield put(populateRate(data.data.rate))
        yield delay(3000)
      }
      const state = yield select()
      if (!state.common.fetchRateStatus) {
        break
      }
    }
  } catch (e) {
    console.log('Error :', e)
  }
}

function* fetchRecentDepositsEffectSaga(action) {
  try {
    let { data } = yield call(fetchRecentDeposits, action.payload)
    yield put(populateRecentDeposits(data.data.recentDeposits))
  } catch (e) {
    console.log('Error :', e)
  }
}

function* fetchStatsEffectSaga() {
  try {
    let { data } = yield call(fetchStats)
    yield put(
      populateStats(data.data.stats)
    )
  } catch (e) {
    console.log('Error :', e)
  }
}

export function* fetchMethodsWatcherSaga() {
  yield takeLatest(FETCH_METHODS_WATCHER, fetchMethodsEffectSaga)
}

export function* fetchRateWatcherSaga() {
  yield takeLatest(FETCH_RATE_WATCHER, fetchRateEffectSaga)
}

export function* fetchRecentDepositsWatcherSaga() {
  yield takeLatest(FETCH_RECENT_DEPOSITS_WATCHER, fetchRecentDepositsEffectSaga)
}

export function* fetchStatsWatcherSaga() {
  yield takeLatest(FETCH_STATS_WATCHER, fetchStatsEffectSaga)
}