import { AsyncActionRunner } from '../AsyncActionRunner';
import { useAsyncValue } from './useAsyncValue';
import { useAsyncError } from './useAsyncError';
import { useAsyncStatus } from './useAsyncStatus';

export function useAsyncState<TResult, TError>(
  asyncActionRunner: AsyncActionRunner<TResult, TError>
) {
  return {
    value: useAsyncValue<TResult>(asyncActionRunner),
    error: useAsyncError<TError>(asyncActionRunner),
    status: useAsyncStatus(asyncActionRunner),
  };
}
