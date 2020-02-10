import { POPULATE_ORDER, UPDATE_ORDER_ERROR } from './types'

function orderReducer(state = {}, action) {
  switch (action.type) {
    case POPULATE_ORDER:
      return {
        ...state,
        detail: action.payload,
      }

    case UPDATE_ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

const reducer = orderReducer

export default reducer
