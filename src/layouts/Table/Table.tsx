import React from "react";
import { DiggingTable } from "./DiggingTable";
import TableMediator, {
  Column,
  Response,
  Row,
  RequestOptions,
  Action,
} from "../../mediators/table/TableMediator";

function onLoadGenerator<T>(rows: Row<T>[], columns: Column[]) {
  return ({ query, sorting: sorts }: RequestOptions<T>) => {
    const filteredResults = rows.filter((row: Row<T>) => {
      return row.cells.some((cell) => {
        return cell.value
          ?.toString()
          .toLowerCase()
          .includes(query.toLowerCase());
      });
    });

    const cells = rows[0]?.cells || [];
    const columnNameToIndexMap = cells.reduce((acc, column, index) => {
      acc[column.name] = index;
      return acc;
    }, {} as any);

    filteredResults.sort((rowA, rowB) => {
      let score = 0;

      sorts.every((sort) => {
        const columnName = sort.name;
        const direction = sort.direction === "ASC" ? 1 : -1;
        const columnA =
          rowA.cells[columnNameToIndexMap[columnName]].value || "";
        const columnB =
          rowB.cells[columnNameToIndexMap[columnName]].value || "";

        if (columnA < columnB) {
          score = -1 * direction;
          return false;
        } else if (columnA > columnB) {
          score = 1 * direction;
          return false;
        } else {
          return true;
        }
      });

      return score;
    });

    return Promise.resolve({
      data: filteredResults,
      isLast: true,
    }) as Promise<Response<T>>;
  };
}

export interface TableProps<T> {
  columns: Column[];
  rows: Row<T>[];
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

export function Table<T>({ rows, columns, ...props }: TableProps<T>) {
  const onLoad = onLoadGenerator(rows, columns);
  return (
    <DiggingTable<T>
      onLoad={onLoad}
      columns={columns}
      {...props}
    ></DiggingTable>
  );
}
