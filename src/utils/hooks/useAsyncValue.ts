import { useValue } from './useValue';
import { AsyncStateMachine } from '../AsyncStateMachine';

export function useAsyncValue<T>(asyncStateMachine: AsyncStateMachine<T, any>) {
  return useValue<T>(asyncStateMachine);
}
