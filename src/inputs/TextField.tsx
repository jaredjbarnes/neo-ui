import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import { makeStyledTransition } from "react-motion-ux";

const TextFieldContainer = styled.div`
  display: inline-block;
  height: 70px;
  width: 200px;
`;

const TextFieldGrid = styled.div`
  display: inline-grid;
  grid-template-columns: auto 0px 0px;
  grid-template-rows: 24px 35px;
  width: 100%;
  height: 100%;
`;

const InputLabel = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 14px;
  line-height: 24px;
  padding-left: 4px;
  color: rgba(100, 110, 140, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PositionedTextInput = styled(TextInput)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
  width: 100%;
`;

const PositionedErrorIcon = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
`;

const PositionedInfoIcon = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
`;

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
    | React.MutableRefObject<HTMLInputElement>;
  large?: boolean;
}

const TextField = React.forwardRef<HTMLDivElement, Props>(function (
  { name, value, style, className, ...props }: Props,
  ref
) {
  return (
    <TextFieldContainer ref={ref} className={className} style={style}>
      <TextFieldGrid>
        <InputLabel>{name}</InputLabel>
        <PositionedTextInput value={value} {...props} />
      </TextFieldGrid>
    </TextFieldContainer>
  );
});

export default TextField;
