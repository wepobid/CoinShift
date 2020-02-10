import { POPULATE_SESSION } from './types'

function authReducer(state = {}, action) {
  switch (action.type) {
    case POPULATE_SESSION:
      return {
        ...state,
        session: action.payload,
      }

    default:
      return state
  }
}

const reducer = authReducer

export default reducer
