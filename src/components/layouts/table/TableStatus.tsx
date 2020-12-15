import React from "react";
import {
  useTableStatus,
  useTable,
  useIsTableFinishedLoading,
} from "../../../providers/table/hooks";
import { createUseStyles } from "react-jss";
import { joinClassNames } from "../../../utils/joinClassNames";

const useStyles = createUseStyles({
  tableStatusContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    height: "34px",
    minWidth: "100%",
    backgroundColor: "#ecf0f3",
    borderTop: "2px ridge rgba(255, 255, 255, 0.25)",
    fontSize: "10px",
    color: "rgba(100, 110, 140, 0.8)",
    fontFamily: "Verdana, Geneva, sans-serif",
  },
  status: {
    paddingLeft: "4px",
    userSelect: "none",
  },
  loaded: {
    paddingRight: "4px",
    userSelect: "none",
  },
});

export interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const textMap = {
  initial: "Idle",
  success: "Idle",
  disabled: "Disabled",
  pending: "Loading",
  error: "Error",
};

export function TableStatus({ className, style }: Props) {
  const classes = useStyles();
  const state = useTableStatus();
  const table = useTable();
  const isFinished = useIsTableFinishedLoading();

  const status = isFinished ? "Complete" : textMap[state];
  return (
    <div
      className={joinClassNames(classes.tableStatusContainer, className)}
      style={style}
    >
      <span className={classes.status}>Status: {status}</span>
      <span className={classes.loaded}>
        Loaded: {table.getLoadedRowsLength()}
      </span>
    </div>
  );
}
