import { useMemo, useEffect, useState } from "react";
import useForm from "./useForm";

export function useValidationState() {
  const form = useForm();
  const [isValidating, setIsValidating] = useState(form.getIsValidating());

  const subscription = useMemo(() => {
    return form.onValidationChange((isValidating) => {
      setIsValidating(isValidating);
    });
  }, [form]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return isValidating;
}
