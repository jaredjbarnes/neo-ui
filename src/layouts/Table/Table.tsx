import React from "react";
import TableProvider, { TableProviderProps } from "../../mediators/table/TableProvider";
import AsyncAction from "../../utils/AsyncAction";
import {
  RequestOptions,
  Response,
  Column,
  Row,
} from "../../mediators/table/TableMediator";

export interface TableProps<T> {
  columns: Column[];
  onLoad: (request: RequestOptions<T>) => AsyncAction<Response<T>>;
  onView?: (item: Row<T>) => Promise<void>;
  onAdd?: () => Promise<Row<T>>;
  onEdit?: (item: Row<T>) => Promise<void>;
  onDelete?: (item: Row<T>) => Promise<void>;
  children: React.ReactNode[] | React.ReactNode;
}

function Table<T>(props: TableProps<T>) {
  return <TableProvider<T> {...props}></TableProvider>;
}

export default Table;
