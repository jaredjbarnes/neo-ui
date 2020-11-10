import { useMemo, useEffect, useState } from 'react';
import useForm from './useForm';

const useSubmissionState = () => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(form.getIsSubmitting());

  const subscription = useMemo(() => {
    return form.onSubmissionChange(isSubmitting => {
      setIsSubmitting(isSubmitting);
    });
  }, [form]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return isSubmitting;
};

export default useSubmissionState;
