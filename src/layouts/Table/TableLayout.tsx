import React, { useRef } from "react";
import useTable from "../../mediators/table/hooks/useTable";
import TextInput from "../../inputs/TextInput";
import TableDataScroller from "./TableDataScroller";
import TableActions from "./TableActions";
import Search from "@material-ui/icons/Search";
import useActions from "../../mediators/table/hooks/useActions";
import TableMediator, { Row } from "../../mediators/table/TableMediator";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";
import { useValue } from "../../utils/hooks/useValue";

const useStyles = createUseStyles({
  tableLayout: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "auto 125px",
    gridTemplateRows: "35px 16px auto",
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
  searchContainer: {
    display: "grid",
    gridTemplateColumns: "auto 30px",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%",
  },
  searchInput: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%",
  },
  searchIcon: {
    color: "rgba(100, 110, 140, 0.8)",
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isSelectable = useValue(table.isSelectable);
  const showActions = actions.length > 0 && isSelectable;

  const search = (value: string) => {
    if (inputRef.current != null) {
      table.search(value);
    }
  };

  const gridStyles = {
    gridTemplateColumns: "auto 125px",
  };

  if (!showActions) {
    gridStyles.gridTemplateColumns = "100%";
  }

  return (
    <div
      className={joinClassNames(classes.tableLayout, className)}
      style={{ ...style, ...gridStyles }}
    >
      <div className={classes.searchContainer}>
        <div className={classes.searchIconContainer}>
          <Search className={classes.searchIcon} />
        </div>
        <TextInput
          className={classes.searchInput}
          inputRef={inputRef}
          onValueChange={search}
        />
      </div>
      <TableDataScroller className={classes.display} onRowClick={onRowClick} />
      {showActions && <TableActions className={classes.actions} />}
    </div>
  );
}

export default TableLayout;
