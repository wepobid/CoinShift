import { INITIALIZE_SESSION_WATCHER, POPULATE_SESSION } from './types'

export function initializeSessionWatcher() {
  return { type: INITIALIZE_SESSION_WATCHER, payload: null }
}

export function populateSession(session) {
  return { type: POPULATE_SESSION, payload: session }
}
