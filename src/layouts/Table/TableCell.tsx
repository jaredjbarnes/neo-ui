import React from "react";
import styled from "styled-components";
import { Column } from "../../mediators/table/TableMediator";

const TableCellContainer = styled.div`
  position: relative;
  text-align: center;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(100, 110, 140, 0.8);
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 14px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  padding: 0px 8px;
`;

export interface Props {
  column: Column;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

const TableCell = ({ column, children, style, className }: Props) => {
  const styleOverrides = {
    textAlign: column.alignment,
  } as React.CSSProperties;

  return (
    <TableCellContainer
      style={{ ...style, ...styleOverrides }}
      className={className}
    >
      {children}
    </TableCellContainer>
  );
};

export default TableCell;
