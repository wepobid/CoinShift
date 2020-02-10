import { UPDATE_IS_LOADING, UPDATE_FETCH_RATE_STATUS, UPDATE_ORDER_STATUS } from './types'

export function updateIsLoading(isLoading) {
  return { type: UPDATE_IS_LOADING, payload: isLoading }
}

export function updateFetchRateStatus(fetchRateStatus) {
  return { type: UPDATE_FETCH_RATE_STATUS, payload: fetchRateStatus }
}

export function updateOrderStatus(updateOrderStatus) {
  return { type: UPDATE_ORDER_STATUS, payload: updateOrderStatus }
}
