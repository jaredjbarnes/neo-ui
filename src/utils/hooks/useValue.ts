import { useState, useMemo, useEffect } from "react";
import ObservableValue from "../ObservableValue";

export function useValue<T>(observableValue: ObservableValue<T>) {
  const [value, setValue] = useState(observableValue.getValue());

  const subscription = useMemo(() => {
    return observableValue.onChange((value) => {
      setValue(value);
    });
  }, [observableValue]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return value;
}
