import React from "react";
import TableProvider from "../../mediators/table/TableProvider";
import TableMediator, {
  RequestOptions,
  Response,
  Column,
  Row,
  Action,
} from "../../mediators/table/TableMediator";
import TableLayout from "./TableLayout";

export interface TableProps<T> {
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
}

function Table<T>({
  actions,
  onLoad,
  columns,
  onSelectionChange,
  onRowClick,
  style,
  className,
  isSelectable,
}: TableProps<T>) {
  return (
    <TableProvider
      actions={actions}
      columns={columns}
      onLoad={onLoad}
      onSelectionChange={onSelectionChange}
      isSelectable={isSelectable}
    >
      <TableLayout
        style={style}
        className={className}
        onRowClick={onRowClick}
      />
    </TableProvider>
  );
}

export default Table;
