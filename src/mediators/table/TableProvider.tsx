import React, { useMemo, useEffect } from "react";
import TableMediator, {
  RequestOptions,
  Response,
  Column,
} from "./TableMediator";

const defaultTableMediator = new TableMediator<any>();

export const TableContext = React.createContext(defaultTableMediator);

export interface TableProviderProps<T> {
  columns: Column[];
  onLoad: (request: RequestOptions) => Promise<Response<T>>;
  onView: (item: T) => Promise<void>;
  onAdd: () => Promise<void>;
  onEdit: (item: T) => Promise<void>;
  onDelete: (item: T) => Promise<void>;
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
    return new TableMediator();
  }, []);

  useEffect(() => {
    tableMediator.setColumns(columns);
  }, [tableMediator, columns]);

  useEffect(() => {
    tableMediator.setOnLoad(onLoad);
  }, [tableMediator, onLoad]);

  useEffect(() => {
    tableMediator.setOnView(onView);
  }, [tableMediator, onView]);

  useEffect(() => {
    tableMediator.setOnAdd(onAdd);
  }, [tableMediator, onAdd]);

  useEffect(() => {
    tableMediator.setOnEdit(onEdit);
  }, [tableMediator, onEdit]);

  useEffect(() => {
    tableMediator.setOnDelete(onDelete);
  }, [tableMediator, onDelete]);

  return (
    <TableContext.Provider value={tableMediator}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
