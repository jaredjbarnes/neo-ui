import React, { useMemo, useEffect } from "react";
import AsyncAction from "../../utils/AsyncAction";
import TableMediator, {
  RequestOptions,
  Response,
  Column,
  Row,
} from "./TableMediator";

const defaultTableMediator = new TableMediator<any>();

export const TableContext = React.createContext(defaultTableMediator);

export interface TableProviderProps<T> {
  columns: Column[];
  onLoad: (request: RequestOptions<T>) => AsyncAction<Response<T>>;
  onView?: (item: Row<T>) => Promise<void>;
  onAdd?: () => Promise<Row<T>>;
  onEdit?: (item: Row<T>) => Promise<void>;
  onDelete?: (item: Row<T>) => Promise<void>;
  children: React.ReactNode[] | React.ReactNode;
}

function TableProvider<T>({
  columns,
  onLoad,
  onView,
  onAdd,
  onEdit,
  onDelete,
  children,
}: TableProviderProps<T>) {
  const tableMediator = useMemo(() => {
    return new TableMediator<T>();
  }, []);

  useEffect(() => {
    tableMediator.setColumns(columns);
  }, [tableMediator, columns]);

  useEffect(() => {
    tableMediator.setOnLoad(onLoad);
  }, [tableMediator, onLoad]);

  useEffect(() => {
    if (onView != null) {
      tableMediator.setOnView(onView);
    }
  }, [tableMediator, onView]);

  useEffect(() => {
    if (onAdd != null) {
      tableMediator.setOnAdd(onAdd);
    }
  }, [tableMediator, onAdd]);

  useEffect(() => {
    if (onEdit != null) {
      tableMediator.setOnEdit(onEdit);
    }
  }, [tableMediator, onEdit]);

  useEffect(() => {
    if (onDelete != null) {
      tableMediator.setOnDelete(onDelete);
    }
  }, [tableMediator, onDelete]);

  useEffect(() => {
    tableMediator.loadNextBatch();
  }, [tableMediator]);

  useEffect(() => () => tableMediator.dispose(), [tableMediator]);

  return (
    <TableContext.Provider value={tableMediator}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
