import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import useSelectedRows from "../../mediators/table/hooks/useSelectedRows";
import useTable from "../../mediators/table/hooks/useTable";
import TableColumn from "./TableColumn";
import Surface from "../../core/Surface";
import Checkbox from "../../inputs/Checkbox";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";
import IconButton from "../../inputs/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DynamicRow } from "./DynamicRow";

const useStyles = createUseStyles({
  headerContainer: {
    position: "relative",
    height: "37px",
    minWidth: "100%",
    backgroundColor: "#ecf0f3",
    padding: "6px 0px",
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
}

const TableHeader = ({ className, style }: Props) => {
  const classes = useStyles();
  const table = useTable();
  const columns = useColumns();
  const selectedRows = useSelectedRows();
  const isChecked = selectedRows.length > 0;

  const toggleSelection = () => {
    if (isChecked) {
      table.deselectAllRows();
    } else {
      table.selectedAllRows();
    }
  };

  const children = columns.map((column, index) => (
    <TableColumn
      column={column}
      key={index}
      style={{ textAlign: column.alignment }}
    >
      {column.label}
    </TableColumn>
  ));

  const columnsWidths = columns.map((column) => column.width);

  if (table.actions.getValue().length > 0) {
    children.unshift(
      <div className={classes.checkboxContainer}>
        <Checkbox value={isChecked} onValueChange={toggleSelection} />
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
    <Surface
      style={{ ...style }}
      className={joinClassNames(classes.headerContainer, className)}
      mode="popOut"
      raisedSpread={4}
      raisedOffset={2}
    >
      <DynamicRow columnWidths={columnsWidths}>{children}</DynamicRow>
    </Surface>
  );
};

export default TableHeader;
