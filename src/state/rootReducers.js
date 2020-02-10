import transferReducer from './ducks/transfer'
import authReducer from './ducks/auth'
import orderReducer from './ducks/order'
import commonReducer from './ducks/common'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  transfer: transferReducer,
  auth: authReducer,
  order: orderReducer,
  common: commonReducer,
})

export default rootReducer
