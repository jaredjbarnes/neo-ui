import { useContext } from "react";
import { Context } from "../FormProvider";

export function useForm() {
  return useContext(Context);
}

export default useForm;
