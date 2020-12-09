import useTable from "./useTable";
import { useValue } from "../../../utils/hooks/useValue";

const useActions = () => {
  const table = useTable();
  return useValue(table.actions);
};

export default useActions;
