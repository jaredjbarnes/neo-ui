import React from "react";
import { TableProvider } from "../../../providers/table/TableProvider";
import {
  TableMediator,
  RequestOptions,
  Response,
  Column,
  Row,
  Action,
} from "../../../mediators/table/TableMediator";
import { TableLayout } from "./TableLayout";

export interface DiggingTableProps<T> {
  columns: Column[];
  onLoad: (request: RequestOptions<T>) => Promise<Response<T>>;
  className?: string;
  style?: React.CSSProperties;
  actions?: Action<T>[];
  onSelectionChange?: (rows: Row<T>[], table: TableMediator<T>) => void;
  onRowClick?: (
    row: Row<T>,
    table: TableMediator<T>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  isSelectable?: boolean;
  isSearchable?: boolean;
}

export function DiggingTable<T>({
  actions,
  onLoad,
  columns,
  onSelectionChange,
  onRowClick,
  style,
  className,
  isSelectable,
  isSearchable,
}: DiggingTableProps<T>) {
  return (
    <TableProvider
      actions={actions}
      columns={columns}
      onLoad={onLoad}
      onSelectionChange={onSelectionChange}
      isSelectable={isSelectable}
      isSearchable={isSearchable}
    >
      <TableLayout
        style={style}
        className={className}
        onRowClick={onRowClick}
      />
    </TableProvider>
  );
}
