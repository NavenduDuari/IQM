/**
 * @fileinfo
 *
 * Actions are dispatched from rendering component and consumed by either saga / reducer or both
 */

import { ActionTypes } from './types';
import { Action } from '../../types';

export const testAction = (): Action<ActionTypes> => ({
  type: ActionTypes.TEST,
  payload: {},
});
