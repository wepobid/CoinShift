import {
  POPULATE_SETTLE_METHODS,
  POPULATE_DEPOSIT_METHODS,
  SELECT_SETTLE_METHOD,
  SELECT_DEPOSIT_METHOD,
  POPULATE_RATE,
  POPULATE_SETTLE_ADDRESS,
  POPULATE_RECENT_DEPOSITS,
  POPULATE_STATS
} from './types'

function transferReducer(state = {}, action) {
  switch (action.type) {
    case POPULATE_SETTLE_METHODS:
      return {
        ...state,
        settleMethods: action.payload,
      }

    case POPULATE_DEPOSIT_METHODS:
      return {
        ...state,
        depositMethods: action.payload,
      }

    case SELECT_SETTLE_METHOD:
      return {
        ...state,
        selectedSettleMethod: action.payload,
      }

    case SELECT_DEPOSIT_METHOD:
      return {
        ...state,
        selectedDepositMethod: action.payload,
      }

    case POPULATE_RATE:
      return {
        ...state,
        rate: action.payload,
      }

    case POPULATE_SETTLE_ADDRESS:
      return {
        ...state,
        settleAddress: action.payload,
      }

    case POPULATE_RECENT_DEPOSITS:
      return {
        ...state,
        recentDeposits: action.payload,
      }

    case POPULATE_STATS:
      return {
        ...state,
        stats: action.payload,
      }

    default:
      return state
  }
}

const reducer = transferReducer

export default reducer
