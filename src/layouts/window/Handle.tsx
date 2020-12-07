import React from "react";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";
import Button from "./Button";

const useStyles = createUseStyles({
  handleContainer: {
    display: "flex",
    cursor: "move",
    justifyContent: "space-between",
    alignItems: "center",
    height: "35px",
    borderTopRightRadius: "6px",
    borderTopLeftRadius: "6px",
    background: `repeating-linear-gradient(
        rgba(190, 200, 215, 0),
        rgba(190, 200, 215, 0) 4px,
        rgba(190, 200, 215, 1) 5px
      ),
      repeating-linear-gradient(
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0) 2px,
        rgba(255, 255, 255, 0) 5px
      )`,
  },
  handleLabel: {
    backgroundColor: "#ecf0f3",
    borderRadius: "10px",
    height: "22px",
    color: "rgba(100, 110, 140, 0.9)",
    fontSize: "14px",
    fontFamily: "Verdana, Geneva, sans-serif",
    lineHeight: "18px",
    padding: "0px 18px",
    border: "2px ridge rgba(255, 255, 255, 0.15)",
    boxSizing: "border-box",
    userSelect: "none",
  },
  leftHandleOptions: {
    padding: "0px 12px",
    width: "15px",
  },
  rightHandleOptions: {
    padding: "0px 12px",
    height: "15px",
    boxSizing: "border-box",
  },
});

export interface Props {
  name?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Handle = ({ name, style, className }: Props) => {
  const classes = useStyles();

  return (
    <div
      style={style}
      className={joinClassNames(classes.handleContainer, className)}
    >
      <div className={classes.leftHandleOptions}></div>
      {typeof name === "string" && name.length > 0 ? (
        <div className={classes.handleLabel}>{name}</div>
      ) : null}
      <div className={classes.rightHandleOptions}>
        <Button />
      </div>
    </div>
  );
};

export default Handle;
