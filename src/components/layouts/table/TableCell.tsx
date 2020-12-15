import React from "react";
import { Column } from "../../../mediators/table/TableMediator";
import { createUseStyles } from "react-jss";
import { joinClassNames } from "../../../utils/joinClassNames";

const useStyles = createUseStyles({
  tableCell: {
    position: "relative",
    textAlign: "center",
    lineHeight: "40px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "rgba(100, 110, 140, 0.8)",
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px 8px",
  },
});

export interface Props {
  column: Column;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

export function TableCell({ column, children, style, className }: Props) {
  const styleOverrides = {
    textAlign: column.alignment,
  } as React.CSSProperties;
  const classes = useStyles();

  return (
    <div
      style={{ ...style, ...styleOverrides }}
      className={joinClassNames(classes.tableCell, className)}
    >
      {children}
    </div>
  );
}
