import { AsyncStateMachine } from '../AsyncStateMachine';
import { useAsyncValue } from './useAsyncValue';
import { useAsyncError } from './useAsyncError';
import { useAsyncStatus } from './useAsyncStatus';

export function useAsyncState<TResult, TError>(
  asyncStateMachine: AsyncStateMachine<TResult, TError>
) {
  return {
    value: useAsyncValue<TResult>(asyncStateMachine),
    error: useAsyncError<TError>(asyncStateMachine),
    status: useAsyncStatus(asyncStateMachine),
  };
}
