import React, { useMemo, useEffect } from 'react';
import FormMediator from './FormMediator';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onSubmit?: (form: FormMediator) => Promise<void>;
  onValidate?: (form: FormMediator) => Promise<void>;
  onChange?: (form: FormMediator) => void;
  onInitialize?: (form: FormMediator) => void;
}

const defaultOnSubmit = () => {
  return Promise.resolve();
};
const defaultOnValidate = () => {
  return Promise.resolve();
};

const defaultOnChange = () => {};
const defaultOnInitialize = () => {};

const Context = React.createContext(new FormMediator());

const FormProvider = ({
  children,
  onValidate,
  onSubmit,
  onChange,
  onInitialize,
}: Props) => {
  const validation = onValidate != null ? onValidate : defaultOnValidate;
  const submission = onSubmit != null ? onSubmit : defaultOnSubmit;
  const change = onChange != null ? onChange : defaultOnChange;
  const initialize = onInitialize != null ? onInitialize : defaultOnInitialize;

  const formMediator = useMemo(() => {
    return new FormMediator();
  }, []);

  useEffect(() => () => formMediator.dispose(), [formMediator]);

  useEffect(() => {
    formMediator.setValidation(validation);
  }, [formMediator, validation]);

  useEffect(() => {
    formMediator.setSubmission(submission);
  }, [formMediator, submission]);

  useEffect(() => {
    initialize(formMediator);
  }, [formMediator, initialize]);

  const subscription = useMemo(() => {
    return formMediator.onChange(change);
  }, [formMediator, change]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return <Context.Provider value={formMediator}>{children}</Context.Provider>;
};

export default FormProvider;

export { Context };
