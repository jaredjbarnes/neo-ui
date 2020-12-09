import useTable from "./useTable";
import { useValue } from "../../../utils/hooks/useValue";

const useColumnSortDirection = (name: string) => {
  const table = useTable();
  const sorting = useValue(table.sorting);

  return sorting.find((c) => c.name === name)?.direction || "ASC";
};

export default useColumnSortDirection;
