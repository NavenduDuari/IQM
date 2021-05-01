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

import axios, { AxiosResponse } from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { ActionTypes } from './types';
import { Action, IsQuestionLoading, PAGE_SIZE } from '../../types';
import { changeIsLoadingAction, onReceiveQuestionsAction } from './action';

function getQuestions() {
  return function* (action: Action<ActionTypes>) {
    try {
      yield put(changeIsLoadingAction(IsQuestionLoading.Loading));
      const page = action.payload?.page;
      const url = `https://api.stackexchange.com/2.2/questions?page=${page}&pagesize=${PAGE_SIZE}&site=stackoverflow&filter=withbody`;
      const response: AxiosResponse = yield call(axios.get, url);
      const questions = response.data.items;
      const hasMore = response.data.has_more;
      if (response.status !== 200 || !questions.length || !hasMore) {
        throw new Error('Service request failed');
      }
      yield put(onReceiveQuestionsAction(questions));
    } catch (err) {
      console.error(err);
      yield put(changeIsLoadingAction(IsQuestionLoading.End));
    }
  };
}

export default function* appSaga() {
  yield takeEvery(ActionTypes.GET_QUESTIONS, getQuestions());
}
