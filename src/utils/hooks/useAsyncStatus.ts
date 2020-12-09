import { useValue } from './useValue';
import { AsyncStateMachine } from '../AsyncStateMachine';

export function useAsyncStatus(asyncStateMachine: AsyncStateMachine<any, any>) {
  return useValue(asyncStateMachine.status);
}
