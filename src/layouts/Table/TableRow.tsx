import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import useTable from "../../mediators/table/hooks/useTable";
import useIsRowSelected from "../../mediators/table/hooks/useIsRowSelected";
import TableCell from "./TableCell";
import TableMediator, { Row } from "../../mediators/table/TableMediator";
import RowProvider from "../../mediators/table/RowProvider";
import Checkbox from "../../inputs/Checkbox";
import IconButton from "../../inputs/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";

const useStyles = createUseStyles({
  tableRowContainer: {
    display: "grid",
    position: "relative",
    height: "40px",
    minWidth: "100%",
    borderBottom: "2px ridge rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    padding: 0,
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    padding: 0,
  },
  actionsButton: {
    width: "25px",
    height: "25px",
    marginLeft: "5px",
  },
});

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  row: Row<any>;
  onRowClick?: (
    row: Row<any>,
    table: TableMediator<any>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const TableRow = ({ row, className, style, onRowClick }: Props) => {
  const classes = useStyles();
  const columns = useColumns();
  const table = useTable();
  const isSelected = useIsRowSelected(row);

  const rowStyles = useMemo(() => {
    const gridTemplateColumns =
      "30px 50px " +
      columns
        .map((c) => (typeof c.width === "number" ? `${c.width}px` : c.width))
        .join(" ") +
      " auto";

    const width =
      columns.reduce((acc, column) => {
        return acc + column.width;
      }, 0) + 80;

    return {
      width: `${width}px`,
      gridTemplateColumns,
    } as React.CSSProperties;
  }, [columns]);

  const cells = row.cells;

  const onCheckboxClick = () => {
    if (table.isRowSelected(row)) {
      table.deselectRow(row);
    } else {
      table.selectRow(row);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (typeof onRowClick === "function") {
      onRowClick(row, table, event);
    }
  };

  return (
    <RowProvider row={row}>
      <div
        style={{ ...style, ...rowStyles }}
        className={joinClassNames(classes.tableRowContainer, className)}
        onClick={onClick}
      >
        <div className={classes.checkboxContainer}>
          <Checkbox value={isSelected} onValueChange={onCheckboxClick} />
        </div>
        <div className={classes.actionsContainer}>
          <IconButton
            className={classes.actionsButton}
            raisedOffset={2}
            raisedSpread={4}
            insetOffset={2}
            insetSpread={4}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
        {columns.map((c, index) => (
          <TableCell
            column={c}
            key={index}
            style={{
              gridColumnStart: index + 3,
              gridColumnEnd: index + 3,
              width: c.width + "px",
            }}
          >
            {cells.find((cell) => cell.name === c.name)?.value}
          </TableCell>
        ))}
        <div
          style={{
            gridColumnStart: columns.length + 3,
            gridColumnEnd: columns.length + 3,
            padding: 0,
          }}
        ></div>
      </div>
    </RowProvider>
  );
};

export default TableRow;
