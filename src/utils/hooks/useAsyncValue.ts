import { useValue } from './useValue';
import { AsyncActionRunner } from '../AsyncActionRunner';

export function useAsyncValue<T>(asyncActionRunner: AsyncActionRunner<T, any>) {
  return useValue<T>(asyncActionRunner);
}
