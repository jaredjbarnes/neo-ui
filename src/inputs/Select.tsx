import React, { useState } from "react";
import Surface from "../core/Surface";
import styled from "styled-components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const SelectContainer = styled(Surface)`
  display: inline-grid;
  grid-template-columns: auto 30px;
  width: 200px;
  height: 35px;
  box-sizing: border-box;
  border: 2px ridge rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  color: rgba(100, 110, 140, 1);
  font-family: Verdana, Geneva, sans-serif;
`;

const DownArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 2;
  grid-column-end: 2;
  user-select: none;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 8px;
  grid-column-start: 1;
  grid-column-end: 1;
  user-select: none;
`;

export interface Props<T> {
  value: T;
  className: string;
  style: React.CSSProperties;
  innerRef:
    | ((instance: HTMLDivElement | null) => void)
    | React.MutableRefObject<HTMLDivElement | null>
    | null;
}

export default function Select<T>({
  value,
  className,
  style,
  innerRef,
}: Props<T>) {
  const [isPressed, setIsPressed] = useState(false);

  const press = () => {
    setIsPressed(true);
  };

  const release = () => {
    setIsPressed(false);
  };
  return (
    <SelectContainer
      ref={innerRef}
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      mode={isPressed ? "inset" : "raised"}
      raisedOffset={5}
      raisedSpread={10}
      insetOffset={2}
      insetSpread={6}
      className={className}
      style={style}
    >
      <Label>Name</Label>
      <DownArrow>
        <ArrowDropDownIcon />
      </DownArrow>
    </SelectContainer>
  );
}
