import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useRows = () => {
  const table = useTable();
  const [rows, setRows] = useState(table.loadedRowsAction.value);

  const subscription = useMemo(() => {
    return table.loadedRowsAction.onChange((rows) => {
      setRows(rows);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return rows;
};

export default useRows;
