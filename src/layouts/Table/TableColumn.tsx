import React, { useState } from "react";
import styled from "styled-components";
import { Column } from "../../mediators/table/TableMediator";
import useTable from "../../mediators/table/hooks/useTable";
import useColumnSortDirection from "../../mediators/table/hooks/useColumnSortDirection";
import Surface from "../../core/Surface";

const ColumnContainer = styled(Surface)`
  border-radius: 4px;
  position: relative;
  text-align: center;
  line-height: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(100, 110, 140, 0.9);
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 11px;
  padding: 0px 8px;
  cursor: pointer;
  user-select: none;
`;

export interface Props {
  column: Column;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

const TableColumn = ({ column, children, style, className }: Props) => {
  const table = useTable();
  const [state, setState] = useState<"flat" | "inset" | "raised">("flat");
  const direction = useColumnSortDirection(column.name);

  const press = () => {
    if (!column.canSort) {
      return;
    }

    setState("inset");
  };

  const release = () => {
    if (!column.canSort) {
      return;
    }

    setState("flat");
  };

  const toggleSortDirection = () => {
    if (!column.canSort) {
      return;
    }

    if (direction === "ASC") {
      table.setSort(column.name, "DESC");
    } else {
      table.setSort(column.name, "ASC");
    }
  };

  return (
    <ColumnContainer
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      mode={state}
      onClick={toggleSortDirection}
      style={{ ...style }}
      className={className}
      insetOffset={2}
      insetSpread={4}
      raisedOffset={2}
      raisedSpread={4}
    >
      {children}
    </ColumnContainer>
  );
};

export default TableColumn;
