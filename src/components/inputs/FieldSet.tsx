import React from "react";
import { createUseStyles } from "react-jss";
import { joinClassNames } from "../../utils/joinClassNames";

const useStyles = createUseStyles({
  fieldset: {
    border: "2px ridge rgba(255, 255, 255, 0.35)",
    borderRadius: "8px",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "16px",
    color: "rgba(100, 110, 140, 0.8)",
    padding: "24px",
  },
});

export interface Props {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const FieldSet = React.forwardRef<HTMLFieldSetElement, Props>(
  ({ name, className, style, children }: Props, ref) => {
    const classes = useStyles();
    return (
      <fieldset
        ref={ref}
        className={joinClassNames(classes.fieldset, className)}
        style={style}
      >
        <legend>{name}</legend>
        {children}
      </fieldset>
    );
  }
);