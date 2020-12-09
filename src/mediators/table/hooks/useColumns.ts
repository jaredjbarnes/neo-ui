import useTable from "./useTable";
import { useValue } from "../../../utils/hooks/useValue";

const useColumns = () => {
  const table = useTable();
  return useValue(table.columns);
};

export default useColumns;
