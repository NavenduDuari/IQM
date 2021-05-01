import { IsQuestionLoading, QuestionI } from '../../types';

export interface ComponentPropsI {
  getQuestions: (page: number) => void;
  questions: QuestionI[];
  isLoading: IsQuestionLoading;
  clearQuestions: () => void;
}

export interface ComponentStateI {
  openQuestionIdx: number;
  currentPageNo: number;
}
