import { UPDATE_IS_LOADING, UPDATE_FETCH_RATE_STATUS, UPDATE_ORDER_STATUS } from './types'

function commonReducer(
  state = { isLoading: true, fetchRateStatus: false, orderStatus: false },
  action
) {
  switch (action.type) {
    case UPDATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case UPDATE_FETCH_RATE_STATUS:
      return {
        ...state,
        fetchRateStatus: action.payload,
      }

    case UPDATE_ORDER_STATUS:
    return {
      ...state,
      orderStatus: action.payload,
    }

    default:
      return state
  }
}

const reducer = commonReducer

export default reducer
