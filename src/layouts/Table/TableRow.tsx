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
  border-bottom: 1px solid #ccc;
  :hover {
    background-color: rgba(30, 167, 253, 0.3);
  }
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

    const width = columns.reduce((acc, column) => {
      return acc + column.width;
    }, 0);

    return {
      width,
      gridTemplateColumns,
    } as React.CSSProperties;
  }, [columns]);

  const cells = row.cells;

  return (
    <TableRowContainer style={{ ...style, ...rowStyles }} className={className}>
      {columns.map((c, index) => (
        <TableCell key={index} style={{ width: c.width + "px" }}>
          {cells.find((cell) => cell.name === c.name).value}
        </TableCell>
      ))}
      <TableCell style={{ width: "auto" }}>&nbsp;</TableCell>
    </TableRowContainer>
  );
};

export default TableRow;
