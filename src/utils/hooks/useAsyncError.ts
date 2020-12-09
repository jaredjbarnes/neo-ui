import { useState, useMemo, useEffect } from 'react';
import { AsyncStateMachine } from '../AsyncStateMachine';

export function useAsyncError<T>(asyncStateMachine: AsyncStateMachine<any, T>) {
  const [value, setValue] = useState(asyncStateMachine.getError());

  const subscription = useMemo(() => {
    return asyncStateMachine.onError(value => {
      setValue(value);
    });
  }, [asyncStateMachine]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return value;
}
