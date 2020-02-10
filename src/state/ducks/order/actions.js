import {
  CREATE_ORDER_WATCHER,
  FETCH_ORDER_WATCHER,
  POPULATE_ORDER,
  UPDATE_ORDER_ERROR,
} from './types'

export function createOrderWatcher(createOrderData) {
  return { type: CREATE_ORDER_WATCHER, payload: createOrderData }
}

export function fetchOrderWatcher(orderId) {
  return { type: FETCH_ORDER_WATCHER, payload: orderId }
}

export function populateOrder(order) {
  return { type: POPULATE_ORDER, payload: order }
}

export function updateError(error) {
  return { type: UPDATE_ORDER_ERROR, payload: error }
}
