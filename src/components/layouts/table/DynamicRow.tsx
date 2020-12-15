import React from "react";
import { createUseStyles } from "react-jss";
import { joinClassNames } from "../../../utils/joinClassNames";

const useStyles = createUseStyles({
  row: {
    display: "grid",
    width: "100%",
  },
});

interface Props extends React.DOMAttributes<HTMLDivElement> {
  columnWidths: number[];
  children: React.ReactElement[];
  style?: React.CSSProperties;
  className?: string;
}

function generateGridTemplateColumns(columnWidths: number[]) {
  return columnWidths.map((width) => `${width}px`).join(" ") + " auto";
}

function getMinWidth(columnWidths: number[]) {
  return columnWidths.reduce((acc, width) => acc + width, 0);
}

export function DynamicRow({
  style,
  className,
  columnWidths,
  children,
  ...props
}: Props) {
  const classes = useStyles();
  const gridTemplateColumns = generateGridTemplateColumns(columnWidths);
  const minWidth = getMinWidth(columnWidths);

  style = {
    ...style,
    gridTemplateColumns,
    minWidth,
  };
  return (
    <div
      {...props}
      style={style}
      className={joinClassNames(classes.row, className)}
    >
      {children.map((child, index) => {
        const width =
          typeof columnWidths[index] === "number"
            ? `${columnWidths[index]}px`
            : `0px`;

        const gridColumnStart = index + 1;
        const gridColumnEnd = index + 1;

        const style = {
          ...(child.props?.style || {}),
          width,
          gridColumnStart,
          gridColumnEnd,
        };

        return React.cloneElement(child, { ...child.props, style });
      })}
    </div>
  );
}
