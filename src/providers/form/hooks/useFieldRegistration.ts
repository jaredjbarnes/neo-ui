import { useMemo, useEffect, useState } from "react";
import useForm from "./useForm";
import FieldMediator from "../FieldMediator";

interface Options<T> {
  name: string;
  label?: string;
  initialValue?: T | null;
}

function useFieldRegistration<T>({ name, label, initialValue }: Options<T>) {
  const form = useForm();
  const [_, render] = useState<any>({});
  let field = form.getFieldByName(name) as FieldMediator<T>;

  if (field == null) {
    field = new FieldMediator<T>();
    field.setName(name);
    field.setLabel(label || "");
    field.setInitialValue(
      typeof initialValue === "undefined" ? null : initialValue
    );

    form.addField(field);
  }

  const changeSubscription = useMemo(() => {
    return field.onChange(() => {
      render({});
    });
  }, [field]);

  useEffect(() => () => changeSubscription.unsubscribe(), [changeSubscription]);

  return field;
}

export default useFieldRegistration;
