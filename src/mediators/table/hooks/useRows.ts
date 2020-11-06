import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useRows = () => {
  const table = useTable();
  const [rows, setRows] = useState(table.getRows());

  const subscription = useMemo(() => {
    return table.onRowsLoaded((rows) => {
      setRows(rows);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return rows;
};

export default useRows;
