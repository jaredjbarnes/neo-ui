import { useState, useMemo, useEffect } from 'react';

export default function createStatefulSubjectHook<T>(useMediatorHook, propertyName) {
  return () => {
    const mediator = useMediatorHook();
    const [_, setState] = useState(mediator[propertyName].value);

    const subscription = useMemo(() => {
      return mediator[propertyName].onChange(value => {
        setState(value);
      });
    }, [mediator]);

    useEffect(() => {
      return () => {
        subscription.unsubscribe();
      };
    }, [subscription]);

    return mediator[propertyName].value as T;
  };
}
