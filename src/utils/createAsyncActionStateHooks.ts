import { useMemo, useState, useEffect } from 'react';

interface IHooks<T> {
  useStatus: () => string;
  useValue: () => T;
  useError: () => Error;
}

export default function createStatefulActionHooks<T>(
  useMediator,
  propName: string
): IHooks<T> {
  return {
    useStatus: () => {
      const mediator = useMediator();
      const [state, setState] = useState(mediator[propName].status.value);

      const subscription = useMemo(() => {
        return mediator[propName].status.onChange(status => setState(status));
      }, [mediator]);

      useEffect(() => {
        return () => subscription.unsubscribe();
      }, [subscription]);

      return state;
    },
    useValue: () => {
      const mediator = useMediator();
      const [state, setState] = useState(mediator[propName].value);

      const subscription = useMemo(() => {
        return mediator[propName].onChange(value => setState(value));
      }, [mediator]);

      useEffect(() => {
        return () => subscription.unsubscribe();
      }, [subscription]);

      return state;
    },
    useError: () => {
      const mediator = useMediator();
      const [error, setError] = useState(mediator[propName].error);

      const subscription = useMemo(() => {
        return mediator[propName].onError(newError => setError(newError));
      }, [mediator]);

      useEffect(() => {
        return () => subscription.unsubscribe();
      }, [subscription]);

      return error;
    },
  };
}
