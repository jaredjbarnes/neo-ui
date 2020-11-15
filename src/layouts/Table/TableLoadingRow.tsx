import React, { useState, useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled, { keyframes } from "styled-components";

const TableRowContainer = styled.div`
  display: grid;
  position: relative;
  height: 40px;
  min-width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.5);
`;

const pulse = keyframes`
  0% {
    background-color: rgba(190, 200, 215, 0.5);
  }

  70% {
    background-color: rgba(190, 200, 215, 0.15);
  }

  100% {
    background-color: rgba(190, 200, 215, 0.5);
  }
`;

const PulsingSection = styled.div`
  display: inline-block;
  width: 70%;
  height: 20px;
  animation-name: ${pulse};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  border-radius: 8px;
`;

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const TableRow = ({ className, style }: Props) => {
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

  return (
    <TableRowContainer style={{ ...style, ...rowStyles }} className={className}>
      {columns.map((c, index) => (
        <div
          key={index}
          style={{
            gridColumnStart: index + 1,
            gridColumnEnd: index + 1,
            width: c.width + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PulsingSection />
        </div>
      ))}
      <div
        style={{
          gridColumnStart: columns.length + 1,
          gridColumnEnd: columns.length + 1,
          padding: 0,
        }}
      ></div>
    </TableRowContainer>
  );
};

export default TableRow;
