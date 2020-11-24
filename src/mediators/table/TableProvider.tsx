import React, { useMemo, useEffect } from "react";
import TableMediator, {
  RequestOptions,
  Response,
  Column,
  Row,
  Action,
} from "./TableMediator";

const defaultTableMediator = new TableMediator<any>();

export const TableContext = React.createContext(defaultTableMediator);

export interface TableProviderProps<T> {
  columns: Column[];
  actions?: Action<T>[];
  onLoad: (request: RequestOptions<T>) => Promise<Response<T>>;
  onSelectionChange?: (rows: Row<T>[], table: TableMediator<T>) => void;
  children: React.ReactNode[] | React.ReactNode;
}

function TableProvider<T>({
  columns,
  onLoad,
  children,
  actions,
  onSelectionChange,
}: TableProviderProps<T>) {
  const tableMediator = useMemo(() => {
    return new TableMediator<T>();
  }, []);

  useEffect(() => {
    tableMediator.setColumns(columns);
  }, [tableMediator, columns]);

  useEffect(() => {
    if (Array.isArray(actions)) {
      tableMediator.setActions(actions);
    }
  }, [tableMediator, actions]);

  useEffect(() => {
    tableMediator.setOnLoad(onLoad);
  }, [tableMediator, onLoad]);

  useEffect(() => {
    // This will load the first page on mount.
    tableMediator.loadNextBatch();
  }, [tableMediator]);

  useEffect(() => {
    if (typeof onSelectionChange === "function") {
      const subscription = tableMediator.rowsAction.onChange((rows) => {
        onSelectionChange(rows, tableMediator);
      });

      return () => subscription.unsubscribe();
    }
  }, [onSelectionChange]);

  useEffect(() => () => tableMediator.dispose(), [tableMediator]);

  return (
    <TableContext.Provider value={tableMediator}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
