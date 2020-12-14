import React from "react";
import { Row } from "./TableMediator";

export const RowContext = React.createContext<Row<any>>({
  value: {},
  cells: [],
  id: "0",
});

interface Props<T> {
  row: Row<T>;
  children: React.ReactChild | React.ReactChild[];
}

function RowProvider<T>({ row, children }: Props<T>) {
  return <RowContext.Provider value={row}>{children}</RowContext.Provider>;
}

export default RowProvider;
