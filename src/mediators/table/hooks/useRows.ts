import useTable from "./useTable";
import { useValue } from "../../../utils/hooks/useValue";

const useRows = () => {
  const table = useTable();
  return useValue(table.rows);
};

export default useRows;
