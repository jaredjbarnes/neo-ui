import React from "react";
import styled from "styled-components";

const TableCellContainer = styled.div`
  :last-child {
    border-right: 1px solid rgba(190, 200, 215, 0);
  }
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(100, 110, 140, 1);
  border-right: 1px solid rgba(190, 200, 215, 1);
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 11px;
  cursor: pointer;
  user-select: none;
`;

export interface Props {
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

const TableCell = ({ children, style, className }: Props) => {
  return (
    <TableCellContainer style={style} className={className}>
      {children}
    </TableCellContainer>
  );
};

export default TableCell;
