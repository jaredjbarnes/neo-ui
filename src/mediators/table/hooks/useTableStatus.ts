import useTable from "./useTable";
import { useAsyncStatus } from "../../../utils/hooks/useAsyncStatus";

const useTableStatus = () => {
  return useAsyncStatus(useTable().rows);
};

export default useTableStatus;
