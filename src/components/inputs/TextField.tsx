import React from "react";
import { TextInput } from "./TextInput";
import { createUseStyles } from "react-jss";
import { joinClassNames } from "../../utils/joinClassNames";

const useStyles = createUseStyles({
  textFieldContainer: {
    display: "inline-grid",
    gridTemplateColumns: "auto 0px 0px",
    gridTemplateRows: "24px 35px",
    height: "70px",
    width: "200px",
  }, // div
  label: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 1,
    gridRowEnd: 1,
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    lineHeight: "24px",
    paddingLeft: "4px",
    color: "rgba(100, 110, 140, 0.85)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }, // div
  textInput: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 2,
    gridRowEnd: 2,
    width: "100%",
  }, // Text Input
  ErrorIcon: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 2,
    gridRowEnd: 2,
  }, // div
  infoIcon: {
    gridColumnStart: 3,
    gridColumnEnd: 3,
    gridRowStart: 2,
    gridRowEnd: 2,
  }, // div
});

export interface Props extends React.DOMAttributes<HTMLElement> {
  name?: string;
  value?: string;
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  error?: string;
  info?: string;
  textareaRef?:
    | ((instance: HTMLTextAreaElement) => void)
    | React.MutableRefObject<HTMLTextAreaElement>;
  inputRef?:
    | ((instance: HTMLInputElement) => void)
    | React.MutableRefObject<HTMLInputElement | null>;
  large?: boolean;
  disabled?: boolean;
}

export const TextField = React.forwardRef<HTMLDivElement, Props>(function (
  { name, value, style, className, ...props }: Props,
  ref
) {
  const classes = useStyles();
  return (
    <div
      ref={ref}
      className={joinClassNames(classes.textFieldContainer, className)}
      style={style}
    >
      <div className={classes.label}>{name}</div>
      <TextInput className={classes.textInput} value={value} {...props} />
    </div>
  );
});
