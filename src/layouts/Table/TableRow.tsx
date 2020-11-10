import React, { useState, useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled from "styled-components";
import TableCell from "./TableCell";
import { Row, Column } from "../../mediators/table/TableMediator";
import RowProvider from "../../mediators/table/RowProvider";

const TableRowContainer = styled.div`
  display: grid;
  position: relative;
  height: 40px;
  min-width: 100%;
  border-bottom: 1px solid #ccc;
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
    <RowProvider row={row}>
      <TableRowContainer
        style={{ ...style, ...rowStyles }}
        className={className}
      >
        {columns.map((c, index) => (
          <TableCell
            column={c}
            key={index}
            style={{
              gridColumnStart: index + 1,
              gridColumnEnd: index + 1,
              width: c.width + "px",
            }}
          >
            {cells.find((cell) => cell.name === c.name).value}
          </TableCell>
        ))}
        <div
          style={{
            gridColumnStart: columns.length + 1,
            gridColumnEnd: columns.length + 1,
            padding: 0,
          }}
        ></div>
      </TableRowContainer>
    </RowProvider>
  );
};

export default TableRow;
