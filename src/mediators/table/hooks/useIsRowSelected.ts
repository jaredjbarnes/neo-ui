import { useState, useMemo, useEffect } from "react";
import { Row } from "../TableMediator";
import useTable from "./useTable";

const useIsRowSelected = (row: Row<any>) => {
  const table = useTable();
  const [isSelected, setIsSelected] = useState(table.isRowSelected(row));

  const subscription = useMemo(() => {
    return table.selectedRows.onChange(() => {
      setIsSelected(table.isRowSelected(row));
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return isSelected;
};

export default useIsRowSelected;
