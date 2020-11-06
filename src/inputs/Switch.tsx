import React, { useState, useEffect } from "react";
import Surface from "../core/Surface";
import styled from "styled-components";
import { makeStyledTransition } from "react-motion-ux";

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

const useOnStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    on: {
      color: "rgba(30, 167, 253, 0.9)",
    },
    off: {
      color: "rgba(30, 167, 253, 0)",
    },
  },
  500
);

const useOffStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    on: {
      color: "rgba(126, 134, 168, 0)",
    },
    off: {
      color: "rgba(126, 134, 168, 0.9)",
    },
  },
  500
);

const useHandleStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    on: {
      transform: "translate(36px, 4px)",
    },
    off: {
      transform: "translate(4px, 4px)",
    },
  },
  500
);

const SwitchContainer = styled(Surface)`
  display: inline-grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  position: relative;
  width: 70px;
  height: 36px;
  border-radius: 8px;
  font-size: 10px;
  font-family: Verdana, Geneva, sans-serif;
  color: rgba(126, 134, 168, 1);
  cursor: pointer;
  border: 2px ridge rgba(30, 167, 253, 0.9);
  box-sizing: border-box;
  cursor: pointer;
  outline-style: none;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Handle = styled(Surface)`
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 26px;
  transform: translate(5px, 5px);
  border-radius: 4px;
  background-color: #ecf0f3;
`;

const Knob = styled(Surface)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
`;

const TopLeftKnob = styled(Knob)`
  top: 6px;
  left: 6px;
`;

const TopRightKnob = styled(Knob)`
  top: 6px;
  right: 8px;
`;

const BottomRightKnob = styled(Knob)`
  bottom: 7px;
  right: 8px;
`;

const BottomLeftKnob = styled(Knob)`
  bottom: 7px;
  left: 6px;
`;

const Off = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 2;
  grid-column-end: 2;
  text-transform: uppercase;
  padding-right: 2px;
  user-select: none;
`;

const On = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 1;
  text-transform: uppercase;
  padding-left: 4px;
  user-select: none;
`;

export interface Props {
  checked?: boolean;
  onChange?: (
    value: boolean,
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  style?: React.CSSProperties;
  className?: string;
}

const Switch = React.forwardRef<HTMLDivElement, Props>(function (
  { checked, onChange }: Props,
  ref
) {
  const [isFocused, setIsFocused] = useState<"normal" | "focused">("normal");
  const containerRef = useContainerStyledTransition(isFocused, { ref });
  const secureChecked = typeof checked === "boolean" ? checked : false;
  const [isChecked, setIsChecked] = useState(secureChecked);

  useEffect(() => {
    setIsChecked(secureChecked);
  }, [secureChecked]);

  const state = isChecked ? "on" : "off";
  const onRef = useOnStyledTransition(state);
  const offRef = useOffStyledTransition(state);
  const handleRef = useHandleStyledTransition(state);

  const toggle = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    if (typeof onChange === "function") {
      onChange(newValue, event);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      toggle(event);
    }
  };

  const onFocus = () => {
    setIsFocused("focused");
  };

  const onBlur = () => {
    setIsFocused("normal");
  };

  return (
    <SwitchContainer
      onClick={toggle}
      onKeyDown={onKeyDown}
      ref={containerRef}
      mode="inset"
      insetOffset={2}
      insetSpread={5}
      tabIndex={0}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <Off ref={offRef}>Off</Off>
      <On ref={onRef}>On</On>
      <Handle ref={handleRef} mode="raised" raisedOffset={2} raisedSpread={5}>
        <TopLeftKnob mode="raised" raisedOffset={1} raisedSpread={2} />
        <TopRightKnob mode="raised" raisedOffset={1} raisedSpread={2} />
        <BottomLeftKnob mode="raised" raisedOffset={1} raisedSpread={2} />
        <BottomRightKnob mode="raised" raisedOffset={1} raisedSpread={2} />
      </Handle>
    </SwitchContainer>
  );
});

export default Switch;
