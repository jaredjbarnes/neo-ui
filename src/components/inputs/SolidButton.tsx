import React from "react";
import { Button, Props as ButtonProps } from "../inputs/Button";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  solid: {
    color: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(30, 167, 253, 0.8)",
    width: "94px",
    height: "29px",
    borderRadius: "15px",
    textAlign: "center",
    lineHeight: "29px",
  },
});

export interface Props extends ButtonProps {
  color?: string;
}

export const SolidButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, color, ...props }: Props, ref) => {
    const classes = useStyles();
    let solidStyle = undefined;

    if (color != null) {
      solidStyle = {
        backgroundColor: `${color}`,
      };
    }

    return (
      <Button ref={ref} {...props}>
        <div style={solidStyle} className={classes.solid}>
          {children}
        </div>
      </Button>
    );
  }
);
