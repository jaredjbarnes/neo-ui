import { useValue } from './useValue';
import { AsyncActionRunner } from '../AsyncActionRunner';

export function useAsyncStatus(asyncActionRunner: AsyncActionRunner<any, any>) {
  return useValue(asyncActionRunner.status);
}
