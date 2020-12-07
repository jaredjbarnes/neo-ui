import React from "react";
import Switch from "./Switch";
import { createUseStyles } from "react-jss";
import joinClassNames from "../utils/joinClassNames";

const useStyles = createUseStyles({
  switchFieldContainer: {
    display: "inline-grid",
    gridTemplateColumns: "auto 70px",
    gridTemplateRows: "100%",
    gridGap: "3px",
    height: "35px",
    width: "200px",
  },
  switch: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1,
  },
  label: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    lineHeight: "35px",
    paddingLeft: "4px",
    color: "rgba(100, 110, 140, 0.85)",
    width: "100%",
    height: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    userSelect: "none",
  },
});

export interface Props {
  name?: string;
  checked?: boolean;
  onChange?: (
    value: boolean,
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  style?: React.CSSProperties;
  className?: string;
}

const SwitchField = React.forwardRef<HTMLDivElement, Props>(
  ({ name, checked, className, style, ...props }: Props, ref) => {
    const classes = useStyles();

    return (
      <div
        ref={ref}
        className={joinClassNames(classes.switchFieldContainer, className)}
        style={style}
      >
        <div className={classes.label}>{name}</div>
        <Switch className={classes.switch} checked={checked} {...props} />
      </div>
    );
  }
);

export default SwitchField;
