import React from "react";
import { Button, Props as ButtonProps } from "../inputs/Button";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  outline: {
    border: " 2px solid rgba(30, 167, 253, 0.8)",
    width: "94px",
    height: "29px",
    boxSizing: "border-box",
    borderRadius: "15px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: "33px",
    color: "rgba(30, 167, 253, 0.9)",
  },
});

export interface Props extends ButtonProps {
  color?: string;
}

export const OutlineButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, color, ...props }: Props, ref) => {
    const classes = useStyles();
    let outlineStyle = undefined;

    if (color != null) {
      outlineStyle = {
        border: `2px solid ${color}`,
        color: color,
      };
    }

    return (
      <Button ref={ref} {...props}>
        <div className={classes.outline} style={outlineStyle}>
          {children}
        </div>
      </Button>
    );
  }
);
