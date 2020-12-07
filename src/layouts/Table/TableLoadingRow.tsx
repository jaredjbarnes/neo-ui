import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";

const useStyles = createUseStyles({
  tableRowContainer: {
    display: "grid",
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

const TableRow = ({ className, style }: Props) => {
  const classes = useStyles();
  const columns = useColumns();

  const rowStyles = useMemo(() => {
    const gridTemplateColumns =
      "80px " +
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

  return (
    <div
      style={{ ...style, ...rowStyles }}
      className={joinClassNames(classes.tableRowContainer, className)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gridColumnStart: 1,
          gridColumnEnd: 1,
          padding: 0,
        }}
      >
        <div className={classes.pulsingSection} />
      </div>
      {columns.map((c, index) => (
        <div
          key={index}
          style={{
            gridColumnStart: index + 2,
            gridColumnEnd: index + 2,
            width: c.width + "px",
            display: "flex",
            alignItems: "center",
            justifyContent: alignmentMap[c.alignment],
          }}
        >
          <div className={classes.pulsingSection} />
        </div>
      ))}
      <div
        style={{
          gridColumnStart: columns.length + 2,
          gridColumnEnd: columns.length + 2,
          padding: 0,
        }}
      ></div>
    </div>
  );
};

export default TableRow;
