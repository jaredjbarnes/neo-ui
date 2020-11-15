import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled from "styled-components";
import TableColumn from "./TableColumn";
import Surface from "../../core/Surface";

const TableHeaderContainer = styled(Surface)`
  display: grid;
  position: relative;
  height: 25px;
  min-width: 100%;
  background-color: #ecf0f3;
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
      mode="popOut"
      raisedSpread={4}
      raisedOffset={2}
    >
      {columns.map((c, index) => (
        <TableColumn
          column={c}
          key={index}
          style={{
            gridColumnStart: index + 1,
            gridColumnEnd: index + 1,
            width: c.width + "px",
          }}
        >
          {c.label}
        </TableColumn>
      ))}
      <div
        style={{
          borderBottom: "1px solid rgba(190, 200, 215, 1)",
          borderLeft: "1px solid rgba(255, 255, 255, 1)",
          gridColumnStart: columns.length + 1,
          gridColumnEnd: columns.length + 1,
          padding: 0,
        }}
      ></div>
    </TableHeaderContainer>
  );
};

export default TableHeader;
