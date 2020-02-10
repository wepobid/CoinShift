import axios from 'axios'
import { populateSession } from './actions'
import { updateIsLoading } from '../common/actions'
import { INITIALIZE_SESSION_WATCHER } from './types'
import { takeLatest, call, put } from 'redux-saga/effects'
import Cookies from 'js-cookie'

function createSession() {
  return axios.post('https://sideshift.ai/graphql', {
    operationName: 'CreateSession',
    variables: {},
    query:
      'mutation CreateSession {  createSession {    sessionId    secret    __typename  }}',
  })
}

function getSession(secret) {
  return axios.post('https://sideshift.ai/graphql', {
    operationName: 'session',
    variables: { secret: secret },
    query:
      'query session($secret: String!) {  session(secret: $secret) {    sessionId    secret    credited    balance    transfers {      createdAt      kind      amount      __typename    }    telegramPairingPayload    __typename  }}',
  })
}

function* initializeSessionEffectSaga() {
  try {
    yield put(updateIsLoading(true))
    let affiliateSecret = Cookies.get('affiliateSecret')
    if (affiliateSecret === undefined) {
      let { data: createdSession } = yield call(createSession)
      affiliateSecret = createdSession.data.createSession.secret
      Cookies.set('affiliateSecret', affiliateSecret)
    }
    let { data } = yield call(getSession, affiliateSecret)
    yield put(populateSession(data.data.session))
    yield put(updateIsLoading(false))
  } catch (e) {
    yield put(updateIsLoading(false))
    console.log('Error :', e)
  }
}

export function* initializeSessionWatcherSaga() {
  yield takeLatest(INITIALIZE_SESSION_WATCHER, initializeSessionEffectSaga)
}
