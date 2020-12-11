import React from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import useTable from "../../mediators/table/hooks/useTable";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";
import { DynamicRow } from "./DynamicRow";
import { useValue } from "../../utils/hooks/useValue";

const useStyles = createUseStyles({
  tableRowContainer: {
    position: "relative",
    height: "40px",
    minWidth: "100%",
    borderBottom: "1px solid #ccc",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  "@keyframes pulse": {
    "0%": {
      backgroundColor: "rgba(190, 200, 215, 0.5)",
    },
    "70%": {
      backgroundColor: "rgba(190, 200, 215, 0.15)",
    },
    "100%": {
      backgroundColor: "rgba(190, 200, 215, 0.5)",
    },
  },
  pulsingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px",
  },
  pulsingSection: {
    display: "inline-block",
    width: "70%",
    height: "20px",
    animationName: "$pulse",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    borderRadius: "8px",
  },
});

const alignmentMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const TableLoadingRow = ({ className, style }: Props) => {
  const table = useTable();
  const classes = useStyles();
  const columns = useColumns();
  const isSelectable = useValue(table.isSelectable);

  const children = columns.map((c, index) => {
    return (
      <div
        key={index}
        style={{ justifyContent: alignmentMap[c.alignment] }}
        className={classes.pulsingContainer}
      >
        <div className={classes.pulsingSection} />
      </div>
    );
  });

  const columnsWidths = columns.map((column) => column.width);

  if (table.actions.getValue().length > 0) {
    let actionsWidth = 40;

    children.unshift(
      <div
        key={children.length}
        style={{ justifyContent: isSelectable ? "flex-start" : "center" }}
        className={classes.pulsingContainer}
      >
        <div className={classes.pulsingSection} />
      </div>
    );
    children.push(<div key={children.length}></div>);

    if (isSelectable) {
      actionsWidth = 70;
    }

    columnsWidths.unshift(actionsWidth);
  }

  return (
    <DynamicRow
      className={joinClassNames(classes.tableRowContainer, className)}
      style={style}
      columnWidths={columnsWidths}
    >
      {children}
    </DynamicRow>
  );
};

export default TableLoadingRow;
