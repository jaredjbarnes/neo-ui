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
  children: React.ReactNode[] | React.ReactNode;
  onLoad: (request: RequestOptions<T>) => Promise<Response<T>>;
  actions?: Action<T>[];
  isSelectable?: boolean;
  isSearchable?: boolean;
  onSelectionChange?: (rows: Row<T>[], table: TableMediator<T>) => void;
}

function TableProvider<T>({
  columns,
  onLoad,
  children,
  actions,
  onSelectionChange,
  isSelectable,
  isSearchable
}: TableProviderProps<T>) {
  const selectable = typeof isSelectable === "boolean" ? isSelectable : false;
  const searchable = typeof isSearchable === "boolean" ? isSearchable : false;

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
    tableMediator.isSelectable.setValue(selectable);
  }, [tableMediator, selectable]);

  useEffect(() => {
    tableMediator.isSearchable.setValue(searchable);
  }, [tableMediator, searchable]);

  useEffect(() => {
    // This will load the first page on mount.
    tableMediator.loadNextBatch();
  }, [tableMediator]);

  useEffect(() => {
    if (typeof onSelectionChange === "function") {
      const subscription = tableMediator.rows.onChange((rows) => {
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
