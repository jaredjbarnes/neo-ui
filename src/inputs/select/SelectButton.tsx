import React, { useState, useCallback } from "react";
import Surface from "../../core/Surface";
import styled from "styled-components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyledTransition } from "react-motion-ux";
import {
  useSelectedOption,
  useSelectMediator,
  useIsOpen,
} from "../../mediators/select/hooks";
import useForkRef from "../../core/hooks/useForkRef";

const useContainerStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    focused: {
      border: "2px ridge rgba(30, 167, 253, 0.5)",
    },
    normal: {
      border: "2px ridge rgba(255, 255, 255, 0.15)",
    },
  },
  200
);

const useArrowTransition = makeStyledTransition<SVGSVGElement>(
  {
    open: {
      transform: "rotate(180deg)",
    },
    closed: {
      transform: "rotate(0deg)",
    },
  },
  600
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
  className?: string;
  style?: React.CSSProperties;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function <T>({ className, style, innerRef }: Props) {
  const selectMediator = useSelectMediator();
  const open = useIsOpen();
  const [isFocused, setIsFocused] = useState<"normal" | "focused">("normal");
  const selectedOption = useSelectedOption();
  const label = selectedOption != null ? selectedOption.value : "-- Select --";
  const [isPressed, setIsPressed] = useState(false);

  const onElementMount = (element: HTMLDivElement | null) => {
    if (element != null) {
      selectMediator.dropDownWidth.value = element.offsetWidth;
    }
  };

  const ref = useForkRef(innerRef, onElementMount);
  const svgRef = useArrowTransition(open ? "open" : "closed");
  let containerRef = useContainerStyledTransition(isFocused, { ref });

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

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      toggle();
    }
  };

  const toggle = () => {
    if (selectMediator.isOpen.value) {
      selectMediator.close();
    } else {
      selectMediator.open();
    }
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
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <Label>{label}</Label>
      <DownArrow>
        <ArrowDropDownIcon ref={svgRef} />
      </DownArrow>
    </SelectContainer>
  );
}