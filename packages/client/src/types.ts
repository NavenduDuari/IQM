/**
 * @fileinfo
 *
 * Type definitations of the objects which is shared across all the components and containers.
 *
 * We try not to use any as much as possible, hence we need a central namespace where all the
 * type definitations would go.
 *
 * This file also content the global enums and constants which are shared across components
 * and containers.
 *
 * Every container would have their won types.ts file. These local files are for their local
 * type defination which are not required to leak in globally.
 */

export interface Action<T> {
  type: T;
  payload?: Record<string, any>;
}
