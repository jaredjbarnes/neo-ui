import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";
import { Column } from "../../mediators/table/TableMediator";
import { useTable, useColumnSortDirection } from "../../mediators/table/hooks";
import Surface from "../../core/Surface";

const useStyles = createUseStyles({
  columnContainer: {
    borderRadius: "6px",
    position: "relative",
    textAlign: "center",
    lineHeight: "25px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "rgba(100, 110, 140, 0.8)",
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "12px",
    padding: "0px 8px",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
  },
});

export interface Props {
  column: Column;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

const TableColumn = ({ column, children, style, className }: Props) => {
  const classes = useStyles();
  const table = useTable();
  const [state, setState] = useState<"flat" | "inset">("flat");
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
    <Surface
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      mode={state}
      onClick={toggleSortDirection}
      style={{ ...style }}
      className={joinClassNames(classes.columnContainer, className)}
      insetOffset={2}
      insetSpread={4}
      raisedOffset={2}
      raisedSpread={4}
    >
      {children}
    </Surface>
  );
};

export default TableColumn;
