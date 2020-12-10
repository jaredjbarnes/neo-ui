import useTable from "./useTable";
import { useValue } from "../../../utils/hooks/useValue";

const useIsTableFinishedLoading = () => {
  return useValue(useTable().isFinishedLoading);
};

export default useIsTableFinishedLoading;
