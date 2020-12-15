import React from "react";
import { Row } from "../../mediators/table/TableMediator";

export const RowContext = React.createContext<Row<any>>({
  value: {},
  cells: [],
  id: "0",
});

export interface Props<T> {
  row: Row<T>;
  children: React.ReactChild | React.ReactChild[];
}

export function RowProvider<T>({ row, children }: Props<T>) {
  return <RowContext.Provider value={row}>{children}</RowContext.Provider>;
}
