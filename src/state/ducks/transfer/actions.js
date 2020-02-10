import {
  POPULATE_SETTLE_METHODS,
  POPULATE_DEPOSIT_METHODS,
  FETCH_METHODS_WATCHER,
  SELECT_SETTLE_METHOD,
  SELECT_DEPOSIT_METHOD,
  POPULATE_RATE,
  FETCH_RATE_WATCHER,
  POPULATE_SETTLE_ADDRESS,
  FETCH_RECENT_DEPOSITS_WATCHER,
  POPULATE_RECENT_DEPOSITS,
  FETCH_STATS_WATCHER,
  POPULATE_STATS
} from './types'

export function fetchMethodsWatcher() {
  return { type: FETCH_METHODS_WATCHER, payload: null }
}

export function fetchStatsWatcher() {
  return { type: FETCH_STATS_WATCHER, payload: null }
}

export function fetchRateWatcher(rateRequest) {
  return { type: FETCH_RATE_WATCHER, payload: rateRequest }
}

export function fetchRecentDepositsWatcher(pageSize) {
  return { type: FETCH_RECENT_DEPOSITS_WATCHER, payload: pageSize }
}

export function populateSettleMethods(settleMethods) {
  return { type: POPULATE_SETTLE_METHODS, payload: settleMethods }
}

export function populateDepositMethods(depositMethods) {
  return { type: POPULATE_DEPOSIT_METHODS, payload: depositMethods }
}

export function selectSettleMethod(settleMethod) {
  return { type: SELECT_SETTLE_METHOD, payload: settleMethod }
}

export function selectDepositMethod(depositMethod) {
  return { type: SELECT_DEPOSIT_METHOD, payload: depositMethod }
}

export function populateRate(rate) {
  return { type: POPULATE_RATE, payload: rate }
}

export function populateSettleAddress(address) {
  return { type: POPULATE_SETTLE_ADDRESS, payload: address }
}

export function populateRecentDeposits(deposits) {
  return { type: POPULATE_RECENT_DEPOSITS, payload: deposits }
}

export function populateStats(stats) {
  return { type: POPULATE_STATS, payload: stats }
}

