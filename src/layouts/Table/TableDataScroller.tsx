import React, { useEffect, useState, useRef, useCallback } from "react";
import TableHeader from "./TableHeader";
import Surface from "../../core/Surface";
import useTable from "../../mediators/table/hooks/useTable";
import TableRow from "./TableRow";
import useRows from "../../mediators/table/hooks/useRows";
import styled from "styled-components";

const TableScrollerContainer = styled(Surface)`
  position: relative;
  border: 2px ridge rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.5);
  min-height: 200px;
  min-width: 200px;
`;

const TableSyledHeader = styled(TableHeader)`
  position: sticky;
  top: 0;
  min-width: 100%;
  z-index: 1;
`;

const TableContent = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  z-index: 0;
`;

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

interface Range {
  startY: number;
  endY: number;
}

const OFFSET_Y = 25;
const ROW_HEIGHT = 40;

const TableDataScroller = ({ style, className }: Props) => {
  useRows();
  const table = useTable();
  const tableScrollerRef = useRef<HTMLDivElement>();
  const [range, setRange] = useState<Range>({ startY: 0, endY: 0 });

  const rowsData = table.getRowsWithinRange(
    OFFSET_Y,
    ROW_HEIGHT,
    range.startY,
    range.endY
  );

  const height = table.getLoadedLength() * ROW_HEIGHT;
  const width = table.getContentWidth();

  const tableContentStyle = {
    width: width + "px",
    height: height + OFFSET_Y + "px",
  };

  const updateRect = useCallback(() => {
    if (tableScrollerRef.current != null) {
      const element = tableScrollerRef.current;
      const rect = element.getBoundingClientRect();
      const scrollTop = element.scrollTop;

      setRange({
        startY: scrollTop,
        endY: rect.height + scrollTop,
      });
    }
  }, []);

  useEffect(() => {
    updateRect();
  }, []);

  const onScroll = () => {
    updateRect();
  };

  return (
    <TableScrollerContainer
      ref={tableScrollerRef}
      mode="cutOut"
      insetOffset={2}
      className={className}
      style={style}
      onScroll={onScroll}
    >
      <TableContent style={tableContentStyle}>
        <TableSyledHeader />
        {rowsData.map((data, index) => {
          const y = index * ROW_HEIGHT + range.startY;

          const style = {
            position: "absolute",
            top: "0px",
            left: "0px",
            transform: `translate(${data.x}px, ${data.y}px)`,
            width: `${data.width}px`,
            height: `${data.height}px`,
          } as React.CSSProperties;

          return <TableRow key={data.row.id} row={data.row} style={style} />;
        })}
      </TableContent>
    </TableScrollerContainer>
  );
};

export default TableDataScroller;
