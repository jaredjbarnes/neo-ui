import { useState, useMemo, useEffect } from "react";
import StatefulSubject from "../StatefulSubject";

export function useValue<T>(statefulSubject: StatefulSubject<T>) {
  const [value, setValue] = useState(statefulSubject.getValue());

  const subscription = useMemo(() => {
    return statefulSubject.onChange((value) => {
      setValue(value);
    });
  }, [statefulSubject]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return value;
}
