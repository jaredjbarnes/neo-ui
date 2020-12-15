import { useMemo, useEffect, useState } from "react";
import { useForm } from "./useForm";

export function useSubmissionError() {
  const form = useForm();
  const [submissionError, setSubmissionError] = useState(
    form.getSubmissionError()
  );

  const subscription = useMemo(() => {
    return form.onSubmissionError((submissionError) => {
      setSubmissionError(submissionError);
    });
  }, [form]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return submissionError;
}
