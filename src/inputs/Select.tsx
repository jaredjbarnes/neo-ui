import React, { useState } from "react";
import Surface from "../core/Surface";
import styled from "styled-components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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
  outline: none;
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

export interface Props {
  value: any;
  className: string;
  style: React.CSSProperties;
  innerRef:
    | ((instance: HTMLDivElement | null) => void)
    | React.MutableRefObject<HTMLDivElement | null>
    | null;
}

export default React.forwardRef<HTMLDivElement, Props>(function (
  { value, className, style, innerRef }: Props,
  ref
) {
  const [isFocused, setIsFocused] = useState<"normal" | "focused">("normal");
  let containerRef = useContainerStyledTransition(isFocused, { ref });

  const [isPressed, setIsPressed] = useState(false);

  const press = () => {
    setIsPressed(true);
  };

  const release = () => {
    setIsPressed(false);
  };

  const onFocus = () => {
    setIsFocused("focused");
  };

  const onBlur = () => {
    setIsFocused("normal");
  };

  return (
    <SelectContainer
      ref={containerRef}
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      onFocus={onFocus}
      onBlur={onBlur}
      mode={isPressed ? "inset" : "raised"}
      raisedOffset={5}
      raisedSpread={10}
      insetOffset={2}
      insetSpread={6}
      className={className}
      style={style}
      tabIndex={0}
    >
      <Label>Name</Label>
      <DownArrow>
        <ArrowDropDownIcon />
      </DownArrow>
    </SelectContainer>
  );
});
