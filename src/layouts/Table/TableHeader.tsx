import React from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled from "styled-components";

const TableHeaderContainer = styled.div`
  display: grid;
  position: relative;
  height: 25px;
  min-width: 100%;
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(100, 110, 140, 1);
  border-top: 2px solid rgba(255, 255, 255, 1);
  border-bottom: 2px solid rgba(190, 200, 215, 1);
  border-left: 2px solid rgba(255, 255, 255, 1);
  border-right: 2px solid rgba(190, 200, 215, 1);
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 12px;
  cursor: pointer;
`;

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const TableHeader = ({ className, style }: Props) => {
  const columns = useColumns();
 
  columns.push({
    name: "",
    label: "",
    width: "auto",
    canSort: false,
  });

  const gridTemplateColumns = columns.map((c) => `${c.width}`).join(" ");

  return (
    <TableHeaderContainer style={{ ...style, gridTemplateColumns }}>
      {columns.map((c) => (
        <Column style={{ width: c.width }}>{c.label}</Column>
      ))}
    </TableHeaderContainer>
  );
};

export default TableHeader;
