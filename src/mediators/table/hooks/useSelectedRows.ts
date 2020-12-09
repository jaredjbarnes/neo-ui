import useTable from "./useTable";
import { useValue } from "../../../utils/hooks/useValue";

const useSelectedRows = () => {
  const table = useTable();
  return useValue(table.selectedRows);
};

export default useSelectedRows;
