import React from "react";
import useTableStatus from "../../mediators/table/hooks/useTableStatus";
import useTable from "../../mediators/table/hooks/useTable";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";

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

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const textMap = {
  ready: "Idle",
  disabled: "Complete",
  pending: "Loading",
  error: "Error",
};

const TableStatus = ({ className, style }: Props) => {
  const classes = useStyles();
  const state = useTableStatus();
  const table = useTable();

  return (
    <div
      className={joinClassNames(classes.tableStatusContainer, className)}
      style={style}
    >
      <span className={classes.status}>Status: {textMap[state]}</span>
      <span className={classes.loaded}>
        Loaded: {table.getLoadedRowsLength()}
      </span>
    </div>
  );
};

export default TableStatus;
