/**
 * @fileinfo
 *
 * State store of the App.
 * Every reducer for a continer has a fragmented state store when it comes to declaration.
 * `rootReducer` collects all these reducer defination and then make a global state store for
 * the whole app which is then made available to the whole app.
 *
 * The purpose of fragmented state store declaration is to make the functional responsibilty
 * of the continer clear during dev.
 */

import { Action, IsQuestionLoading } from '../../types';
import { ActionTypes, StoreStateI } from './types';

export const INITIAL_STATE: StoreStateI = {
  questions: [],
  isLoading: IsQuestionLoading.NotLoading,
};

const appReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.ON_RECEIVE_QUESTIONS:
      return {
        ...state,
        questions: [...state.questions, ...action.payload?.questions],
        isLoading: IsQuestionLoading.NotLoading,
      };

    case ActionTypes.CLEAR_QUESTIONS:
      return {
        ...state,
        questions: [],
      };

    case ActionTypes.CHANGE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload?.isLoading,
      };

    default:
      return state;
  }
};

export default appReducer;
