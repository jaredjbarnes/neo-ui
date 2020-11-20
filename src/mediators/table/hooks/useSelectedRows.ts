import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useSelectedRows = () => {
  const table = useTable();
  const [rows, setRows] = useState(table.getSelectedRows());

  const subscription = useMemo(() => {
    return table.onSelectedRowsChange((column) => {
      setRows(column);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return rows;
};

export default useSelectedRows;

