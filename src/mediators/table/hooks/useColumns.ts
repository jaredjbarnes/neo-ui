import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useColumns = () => {
  const table = useTable();
  const [columns, setColumns] = useState(table.getColumns());

  const subscription = useMemo(() => {
    return table.columns.onChange((column) => {
      setColumns(column);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return columns;
};

export default useColumns;

