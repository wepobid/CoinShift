import React from 'react'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/state/rootSagas'
import rootReducer from './src/state/rootReducers'

const sagaMiddleware = createSagaMiddleware()

let middlewares = applyMiddleware(sagaMiddleware)

const store = createStore(rootReducer, compose(middlewares))

sagaMiddleware.run(rootSaga)

export default ({ element }) => <Provider store={store}>{element}</Provider>
