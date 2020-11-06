import React, { useState } from "react";
import Surface from "../core/Surface";
import styled from "styled-components";
import { makeStyledTransition } from "react-motion-ux";

const useContainerStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    focused: {
      border: "2px ridge rgba(30, 167, 253, 0.9)",
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

const InputContainer = styled(Surface)`
  border-radius: 8px;
  width: 150px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.25);
  border: 2px ridge rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
`;

const Input = styled.input`
  outline: none;
  border: 0;
  padding: 0px 8px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: rgba(100, 110, 140, 1);
  ::placeholder {
    color: rgba(100, 110, 140, 0.3);
  }
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  outline: none;
  border: 0;
  padding: 6px 8px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: rgba(100, 110, 140, 1);
  ::placeholder {
    color: rgba(100, 110, 140, 0.3);
  }
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 16px;
  resize: none;
`;

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
    | React.MutableRefObject<HTMLInputElement>;
  large?: boolean;
  disabled?: boolean;
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
    ...props
  }: Props,
  ref
) {
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
    <InputContainer
      ref={containerRef}
      className={className}
      style={{ ...style, minHeight: large ? "100px" : "35px" }}
      mode={disabled ? "flat" : "inset"}
      insetOffset={3}
      insetSpread={5}
      {...props}
    >
      {!large && (
        <Input
          type="text"
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          value={value}
          onChange={onInputChangeWrapper}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {large && (
        <Textarea
          onFocus={onFocus}
          onBlur={onBlur}
          ref={textareaRef}
          value={value}
          onChange={onTextChangeWrapper}
          placeholder={placeholder}
        />
      )}
    </InputContainer>
  );
});

export default TextInput;
