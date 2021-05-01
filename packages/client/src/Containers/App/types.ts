/**
 * @fileinfo
 *
 * Local types required from App container. All the objects types needs to be mentioned here.
 * We try not to use any as much as possible.
 */

import { QuestionI, IsQuestionLoading } from '../../types';

/*
 * Actions which is dispatched by the rendering component and captured by saga / reducer
 */
export enum ActionTypes {
  GET_QUESTIONS = 'get-questions',
  ON_RECEIVE_QUESTIONS = 'on-receive-questions',
  CLEAR_QUESTIONS = 'clear-questions',
  CHANGE_IS_LOADING = 'change-is-loading',
}

/*
 * Types of the part of the redux state which would be available as a prop to the rendering
 * component
 */
export interface MapStateToPropsI {
  questions: QuestionI[];
  isLoading: IsQuestionLoading;
}

export interface MapDispatchToPropsI {
  getQuestions: (page: number) => void;
  clearQuestions: () => void;
}

/*
 * Type of the own props of the component which is passed by the parent component which is
 * mounting this component
 */
export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

/*
 * Local state of the container. Any state which is required inside the rendering component
 * needs to have a type here.
 */
export interface ComponentStateI {}

export interface StoreStateI {
  questions: QuestionI[];
  isLoading: IsQuestionLoading;
}
