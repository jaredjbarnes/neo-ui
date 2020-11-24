import React, { useMemo } from "react";
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

const alignmentMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const TableRow = ({ className, style }: Props) => {
  const columns = useColumns();

  const rowStyles = useMemo(() => {
    const gridTemplateColumns =
      "50px " +
      columns
        .map((c) => (typeof c.width === "number" ? `${c.width}px` : c.width))
        .join(" ") +
      " auto";

    const width =
      columns.reduce((acc, column) => {
        return acc + column.width;
      }, 0) + 50;

    return {
      width: `${width}px`,
      gridTemplateColumns,
    } as React.CSSProperties;
  }, [columns]);

  return (
    <TableRowContainer style={{ ...style, ...rowStyles }} className={className}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gridColumnStart: 1,
          gridColumnEnd: 1,
          padding: 0,
        }}
      >
        <PulsingSection style={{ width: "60%" }} />
      </div>
      {columns.map((c, index) => (
        <div
          key={index}
          style={{
            gridColumnStart: index + 2,
            gridColumnEnd: index + 2,
            width: c.width + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: alignmentMap[c.alignment],
          }}
        >
          <PulsingSection />
        </div>
      ))}
      <div
        style={{
          gridColumnStart: columns.length + 2,
          gridColumnEnd: columns.length + 2,
          padding: 0,
        }}
      ></div>
    </TableRowContainer>
  );
};

export default TableRow;
