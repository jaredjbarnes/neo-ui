import { useContext, useMemo, useEffect, useState } from "react";
import { TableContext } from "./TableProvider";
import { useAsyncStatus } from "../../utils/hooks/useAsyncStatus";
import { useValue } from "../../utils/hooks/useValue";
import { RowContext } from "./RowProvider";
import { Row } from "./TableMediator";

export function useTable() {
  return useContext(TableContext);
}

export function useTableStatus() {
  return useAsyncStatus(useTable().rows);
}

export function useSelectedRows() {
  return useValue(useTable().selectedRows);
}

export function useRows() {
  return useValue(useTable().rows);
}

export function useRow<T>() {
  useContext(RowContext) as Row<T>;
}

export function useActions() {
  return useValue(useTable().actions);
}

export function useColumns() {
  return useValue(useTable().columns);
}

export function useIsTableFinishedLoading() {
  return useValue(useTable().isFinishedLoading);
}

export function useColumnSortDirection (name: string) {
  const sorting = useValue(useTable().sorting);
  return sorting.find((c) => c.name === name)?.direction || "ASC";
};

export const useIsRowSelected = (row: Row<any>) => {
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
