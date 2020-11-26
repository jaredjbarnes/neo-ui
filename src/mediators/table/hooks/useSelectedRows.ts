import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useSelectedRows = () => {
  const table = useTable();
  const [rows, setRows] = useState(table.selectedRows.value);

  const subscription = useMemo(() => {
    return table.selectedRows.onChange((rows) => {
      setRows(rows);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return rows;
};

export default useSelectedRows;

