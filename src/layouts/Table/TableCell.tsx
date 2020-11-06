import React from "react";
import styled from "styled-components";

const TableCellContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(100, 110, 140, 1);
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  background-color: rgba(0,0,0,0);
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
