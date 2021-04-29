/**
 * @fileinfo
 *
 * Manges sideeffect for App Container. Since reducer / action is pure components, we need a way
 * to manage sideeffects for the container.
 *
 * A sideeffect could be an XMLHTTPRequest, LocalStorage mutation, WebSocket connection etc.
 *
 * TODO Request to the server is sent here from axios directly. In a more extensive setup
 * the mechanism of
 * - sending request
 * - parsing response
 * - refreshing auth token
 * - retrying in case of failure
 * - error handling
 * should be done from a central lib (namely RequestManager)
 */
import { takeEvery } from 'redux-saga/effects';

export default function* appSaga() {
  yield takeEvery('', function* () {
    console.log('test');
  });
}
