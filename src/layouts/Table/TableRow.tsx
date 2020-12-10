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
import { DynamicRow } from "./DynamicRow";

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
    boxSizing: "border-box",
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

  const children = columns.map((c, index) => (
    <TableCell column={c} key={index}>
      {cells.find((cell) => cell.name === c.name)?.value}
    </TableCell>
  ));

  const columnsWidths = columns.map((column) => column.width);

  if (table.actions.getValue().length > 0) {
    children.unshift(
      <div className={classes.checkboxContainer}>
        <Checkbox value={isSelected} onValueChange={onCheckboxClick} />
      </div>,
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
    );
    children.push(<div></div>);

    columnsWidths.unshift(30, 50);
  }

  return (
    <RowProvider row={row}>
      <DynamicRow
        onClick={onClick}
        className={joinClassNames(classes.tableRowContainer, className)}
        style={style}
        columnWidths={columnsWidths}
      >
        {children}
      </DynamicRow>
    </RowProvider>
  );
};

export default TableRow;
