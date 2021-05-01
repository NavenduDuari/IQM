/**
 * @fileinfo
 *
 * Actions are dispatched from rendering component and consumed by either saga / reducer or both
 */

import { ActionTypes } from './types';
import { Action, IsQuestionLoading, QuestionI } from '../../types';

export const getQuestionsAction = (page: number): Action<ActionTypes> => ({
  type: ActionTypes.GET_QUESTIONS,
  payload: {
    page,
  },
});

export const onReceiveQuestionsAction = (
  questions: QuestionI[]
): Action<ActionTypes> => ({
  type: ActionTypes.ON_RECEIVE_QUESTIONS,
  payload: {
    questions,
  },
});

export const clearQuestionsAction = (): Action<ActionTypes> => ({
  type: ActionTypes.CLEAR_QUESTIONS,
  payload: {},
});

export const changeIsLoadingAction = (
  isLoading: IsQuestionLoading
): Action<ActionTypes> => ({
  type: ActionTypes.CHANGE_IS_LOADING,
  payload: {
    isLoading,
  },
});
