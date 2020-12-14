import React, { useState } from "react";
import Surface from "../core/Surface";
import { createUseStyles } from "react-jss";
import { makeStyledTransition } from "react-motion-ux";
import joinClassNames from "../../utils/joinClassNames";

const useContainerStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    focused: {
      border: "2px ridge rgba(30, 167, 253, 0.5)",
    },
    normal: {
      border: "2px ridge rgba(255, 255, 255, 0.15)",
    },
  },
  700
);

const useTextAreaHeight = makeStyledTransition<HTMLDivElement>(
  {
    true: {
      minHeight: "100px",
    },
    false: {
      minHeight: "35px",
    },
  },
  700
);

const useStyles = createUseStyles({
  inputContainer: {
    borderRadius: "8px",
    width: "150px",
    height: "35px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "2px ridge rgba(255, 255, 255, 0.15)",
    boxSizing: "border-box",
  },
  input: {
    outline: "none",
    border: 0,
    padding: "0px 8px",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    color: "rgba(100, 110, 140, 1)",
    "::placeholder": {
      color: "rgba(100, 110, 140, 0.3)",
    },
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "16px",
  },
  textarea: {
    outline: "none",
    border: 0,
    padding: "6px 8px",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    color: "rgba(100, 110, 140, 1)",
    "::placeholder": {
      color: "rgba(100, 110, 140, 0.3)",
    },
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "16px",
    resize: "none",
  },
});

export interface Props extends React.DOMAttributes<HTMLElement> {
  value?: string;
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  textareaRef?:
    | ((instance: HTMLTextAreaElement) => void)
    | React.MutableRefObject<HTMLTextAreaElement>;
  inputRef?:
    | ((instance: HTMLInputElement) => void)
    | React.MutableRefObject<HTMLInputElement | null>;
  large?: boolean;
  disabled?: boolean;
  inputProps?: React.DOMAttributes<HTMLInputElement>;
  textareaProps?: React.DOMAttributes<HTMLTextAreaElement>;
}

const TextInput = React.forwardRef<HTMLDivElement, Props>(function (
  {
    value,
    onValueChange,
    className,
    style,
    inputRef,
    textareaRef,
    placeholder,
    large,
    disabled,
    inputProps,
    textareaProps,
    ...props
  }: Props,
  ref
) {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState<"normal" | "focused">("normal");
  let containerRef = useContainerStyledTransition(isFocused, { ref });

  large = typeof large === "boolean" ? large : false;
  disabled = typeof disabled === "boolean" ? disabled : false;
  containerRef = useTextAreaHeight(large.toString(), { ref: containerRef });

  const onInputChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onValueChange === "function") {
      onValueChange(event.target.value, event);
    }
  };

  const onTextChangeWrapper = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (typeof onValueChange === "function") {
      onValueChange(event.target.value, event);
    }
  };

  const onFocus = () => {
    setIsFocused("focused");
  };

  const onBlur = () => {
    setIsFocused("normal");
  };

  return (
    <Surface
      ref={containerRef}
      className={joinClassNames(classes.inputContainer, className)}
      style={{ ...style, minHeight: large ? "100px" : "35px" }}
      mode={disabled ? "flat" : "inset"}
      insetOffset={3}
      insetSpread={5}
      {...props}
    >
      {!large && (
        <input
          type="text"
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          value={value}
          onChange={onInputChangeWrapper}
          placeholder={placeholder}
          disabled={disabled}
          className={classes.input}
          {...inputProps}
        />
      )}
      {large && (
        <textarea
          onFocus={onFocus}
          onBlur={onBlur}
          ref={textareaRef}
          value={value}
          onChange={onTextChangeWrapper}
          placeholder={placeholder}
          disabled={disabled}
          className={classes.textarea}
          {...textareaProps}
        />
      )}
    </Surface>
  );
});

export default TextInput;
