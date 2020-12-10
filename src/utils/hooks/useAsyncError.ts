import { useState, useMemo, useEffect } from 'react';
import { AsyncActionRunner } from '../AsyncActionRunner';

export function useAsyncError<T>(asyncActionRunner: AsyncActionRunner<any, T>) {
  const [value, setValue] = useState(asyncActionRunner.getError());

  const subscription = useMemo(() => {
    return asyncActionRunner.onError(value => {
      setValue(value);
    });
  }, [asyncActionRunner]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return value;
}
