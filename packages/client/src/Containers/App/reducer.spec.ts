import { Action, IsQuestionLoading, QuestionI } from '../../types';
import { clearQuestionsAction, onReceiveQuestionsAction } from './action';
import appReducer, { INITIAL_STATE } from './reducer';
import { ActionTypes, StoreStateI } from './types';

let state: StoreStateI;
beforeEach(() => {
  state = INITIAL_STATE;
});

describe('AppReducer', () => {
  it('should return initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {} as Action<ActionTypes>)).toEqual(
      expectedResult
    );
  });

  it('should store the received posts', () => {
    const receivedQuestions: QuestionI[] = [
      {
        question_id: 1,
        title: 'title for Q1',
        body: 'body for Q1',
      } as QuestionI,
      {
        question_id: 2,
        title: 'title for Q2',
        body: 'body for Q2',
      } as QuestionI,
    ];
    const updatedState = appReducer(
      state,
      onReceiveQuestionsAction(receivedQuestions)
    );
    expect(updatedState.questions).toEqual(receivedQuestions);
    expect(updatedState.isLoading).toEqual(IsQuestionLoading.NotLoading);
  });

  it('should clear all posts', () => {
    const updatedState = appReducer(state, clearQuestionsAction());
    expect(updatedState.questions).toEqual([]);
  });
});
