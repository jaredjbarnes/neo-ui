import React, { useMemo, useEffect } from 'react';
import useForm from './hooks/useForm';
import FieldMediator from './FieldMediator';

interface Props<T> {
  children: React.ReactNode | React.ReactNode[];
  label: string;
  name: string;
  message: string | null;
  initialValue: T | null;
}

const Context = React.createContext(new FieldMediator());

function FieldProvider<T>({ children, initialValue, name, label, message }: Props<T>) {
  const formMediator = useForm();

  const fieldMediator = useMemo(() => {
    const fieldMediator = new FieldMediator();
    fieldMediator.setName(name);
    fieldMediator.setLabel(label);
    fieldMediator.setInitialValue(initialValue);
    fieldMediator.setValue(initialValue);
    fieldMediator.setMessage(message);

    return fieldMediator;
  }, [initialValue, name, label, message]);

  useEffect(() => {
    formMediator.addField(fieldMediator);

    return () => {
      formMediator.removeField(fieldMediator);
      fieldMediator.dispose();
    };
  }, [formMediator, fieldMediator]);

  return <Context.Provider value={fieldMediator}>{children}</Context.Provider>;
}

export default FieldProvider;

export { Context };
