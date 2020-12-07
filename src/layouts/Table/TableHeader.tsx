import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import useSelectedRows from "../../mediators/table/hooks/useSelectedRows";
import useTable from "../../mediators/table/hooks/useTable";
import TableColumn from "./TableColumn";
import Surface from "../../core/Surface";
import Checkbox from "../../inputs/Checkbox";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";

const useStyles = createUseStyles({
  headerContainer: {
    display: "grid",
    position: "relative",
    height: "37px",
    minWidth: "100%",
    backgroundColor: "#ecf0f3",
    gridTemplateRows: "6px 25px 6px",
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

  const barStyles = useMemo(() => {
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

  const toggleSelection = () => {
    if (isChecked) {
      table.deselectAllRows();
    } else {
      table.selectedAllRows();
    }
  };

  return (
    <Surface
      style={{ ...style, ...barStyles }}
      className={joinClassNames(classes.headerContainer, className)}
      mode="popOut"
      raisedSpread={4}
      raisedOffset={2}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gridColumnStart: 1,
          gridColumnEnd: 1,
          gridRowStart: 2,
          gridRowEnd: 2,
          padding: 0,
        }}
      >
        <Checkbox value={isChecked} onValueChange={toggleSelection} />
      </div>
      {columns.map((c, index) => (
        <TableColumn
          column={c}
          key={index}
          style={{
            gridRowStart: 2,
            gridRowEnd: 2,
            gridColumnStart: index + 3,
            gridColumnEnd: index + 3,
            width: c.width + "px",
            textAlign: c.alignment,
          }}
        >
          {c.label}
        </TableColumn>
      ))}
      <div
        style={{
          gridRowStart: 2,
          gridRowEnd: 2,
          gridColumnStart: columns.length + 3,
          gridColumnEnd: columns.length + 3,
          padding: 0,
        }}
      ></div>
    </Surface>
  );
};

export default TableHeader;
