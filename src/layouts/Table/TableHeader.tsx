import React, { useState, useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled from "styled-components";
import TableColumn from "./TableColumn";

const TableHeaderContainer = styled.div`
  display: grid;
  position: relative;
  height: 25px;
  min-width: 100%;
  background-color: #ecf0f3;
  border-bottom: 1px solid #999;
`;

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const TableHeader = ({ className, style }: Props) => {
  const columns = useColumns();

  const barStyles = useMemo(() => {
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

  return (
    <TableHeaderContainer
      style={{ ...style, ...barStyles }}
      className={className}
    >
      {columns.map((c) => (
        <TableColumn key={c.name} style={{ width: c.width + "px" }}>
          {c.label}
        </TableColumn>
      ))}
      <TableColumn style={{ width: "auto" }}></TableColumn>
    </TableHeaderContainer>
  );
};

export default TableHeader;
