import React, { useState, useEffect } from "react";
import { Surface } from "../core/Surface";
import Check from "@material-ui/icons/Check";
import { joinClassNames } from "../../utils/joinClassNames";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    borderRadius: "4px",
    width: "18px",
    height: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "2px ridge rgba(255, 255, 255, 0.25)",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  icon: {
    color: "rgba(100, 110, 140, 1)",
  },
});

export interface Props {
  style?: React.CSSProperties;
  className?: string;
  onValueChange?: (
    value: boolean,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  value?: boolean;
}

export function Checkbox({ style, className, value, onValueChange }: Props) {
  const classes = useStyles();
  const verifiedValue = typeof value === "boolean" ? value : false;
  const [isChecked, setIsChecked] = useState(verifiedValue);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newValue = !isChecked;

    setIsChecked(newValue);
    if (typeof onValueChange === "function") {
      onValueChange(newValue, event);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    setIsChecked(verifiedValue);
  }, [verifiedValue]);

  return (
    <Surface
      style={style}
      className={joinClassNames(classes.container, className)}
      mode="inset"
      insetOffset={2}
      insetSpread={4}
      onClick={onClick}
    >
      {isChecked && <Check className={classes.icon} style={{ fontSize: 15 }} />}
    </Surface>
  );
}
