import { useState, useMemo, useEffect, useRef } from "react";
import useForm from "./useForm";

export function useField(name: string) {
  const form = useForm();
  const field = form.getFieldByName(name);
  const [_, render] = useState<any>({});
  const timeoutRef = useRef<number>(-1);

  const formSubscription = useMemo(() => {
    return form.onFieldsChange((event) => {
      if (event.field.getName() === name) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          render({});
        });
      }
    });
  }, [form, name]);

  useEffect(() => () => formSubscription.unsubscribe(), [formSubscription]);

  const fieldSubscription = useMemo(() => {
    if (field != null) {
      return field.onChange((_) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          render({});
        });
      });
    }
    return null;
  }, [field]);

  useEffect(() => {
    if (fieldSubscription != null) {
      return () => {
        fieldSubscription.unsubscribe();
      };
    }
  }, [fieldSubscription]);

  return field;
}
