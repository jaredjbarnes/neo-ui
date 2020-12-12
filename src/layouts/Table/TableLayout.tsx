import React, { useRef } from "react";
import useTable from "../../mediators/table/hooks/useTable";
import TableDataScroller from "./TableDataScroller";
import TableActions from "./TableActions";
import useActions from "../../mediators/table/hooks/useActions";
import TableMediator, { Row } from "../../mediators/table/TableMediator";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";
import { useValue } from "../../utils/hooks/useValue";
import { TableSearch } from "./TableSearch";

const useStyles = createUseStyles({
  tableLayout: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "100% 0px",
    gridTemplateRows: "0px 0px 100%",
    minWidth: "400px",
    minHeight: "400px",
  },
  display: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 3,
    gridRowEnd: 3,
    width: "100%",
    height: "100%",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 3,
    gridRowEnd: 3,
  },
});

export interface Props<T> {
  style?: React.CSSProperties;
  className?: string;
  onRowClick?: (
    row: Row<T>,
    table: TableMediator<T>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

function TableLayout<T>({ style, className, onRowClick }: Props<T>) {
  const classes = useStyles();
  const table = useTable();
  const actions = useActions();
  const isSelectable = useValue(table.isSelectable);
  const isSearchable = useValue(table.isSearchable);
  const showActions = actions.length > 0 && isSelectable;

  const gridStyles = {
    gridTemplateColumns: "100% 0px",
    gridTemplateRows: "0px 0px 100%",
  } as React.CSSProperties;

  if (showActions) {
    gridStyles.gridTemplateColumns = "auto 125px";
  }

  if (isSearchable) {
    gridStyles.gridTemplateRows = "35px 16px auto";
  }

  return (
    <div
      className={joinClassNames(classes.tableLayout, className)}
      style={{ ...style, ...gridStyles }}
    >
      {isSearchable && <TableSearch />}
      <TableDataScroller
        className={classes.display}
        onRowClick={onRowClick}
      />
      {showActions && <TableActions className={classes.actions} />}
    </div>
  );
}

export default TableLayout;
