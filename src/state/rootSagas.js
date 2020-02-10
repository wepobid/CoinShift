import { all } from 'redux-saga/effects'
import { transferSagas } from './ducks/transfer'
import { authSagas } from './ducks/auth'
import { orderSagas } from './ducks/order'

export default function* rootSaga() {
  yield all([
    transferSagas.fetchMethodsWatcherSaga(),
    transferSagas.fetchRateWatcherSaga(),
    transferSagas.fetchRecentDepositsWatcherSaga(),
    transferSagas.fetchStatsWatcherSaga(),
    authSagas.initializeSessionWatcherSaga(),
    orderSagas.createOrderWatcherSaga(),
    orderSagas.fetchOrderWatcherSaga()
  ])
}
