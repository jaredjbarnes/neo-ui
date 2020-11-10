import { useContext } from 'react';
import { Context } from '../FormProvider';

const useForm = () => {
  return useContext(Context);
};

export default useForm;
