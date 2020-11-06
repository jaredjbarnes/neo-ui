import React, { useState, useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled from "styled-components";
import TableCell from "./TableCell";
import { Row } from "../../mediators/table/TableMediator";

const TableRowContainer = styled.div`
  display: grid;
  position: relative;
  height: 40px;
  min-width: 100%;
  border-bottom: 1px solid #999;
`;

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  row: Row<any>;
}

const TableRow = ({ row, className, style }: Props) => {
  const columns = useColumns();

  const rowStyles = useMemo(() => {
    const gridTemplateColumns =
      columns
        .map((c) => (typeof c.width === "number" ? `${c.width}px` : c.width))
        .join(" ") + " auto";

    const minWidth = columns.reduce((acc, column) => {
      return acc + column.width;
    }, 0);

    return {
      minWidth,
      gridTemplateColumns,
    } as React.CSSProperties;
  }, [columns]);

  const cells = row.cells;

  return (
    <TableRowContainer style={{ ...style, ...rowStyles }} className={className}>
      {columns.map((c) => (
        <TableCell style={{ width: c.width + "px" }}>
          {cells.find((cell) => cell.name === c.name).value}
        </TableCell>
      ))}
      <TableCell style={{ width: "auto" }}></TableCell>
    </TableRowContainer>
  );
};

export default TableRow;
