import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useRows = () => {
  const table = useTable();
  const [rows, setRows] = useState(table.rowsAction.value);

  const subscription = useMemo(() => {
    return table.rowsAction.onChange((rows) => {
      setRows(rows);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return rows;
};

export default useRows;
