import React, { useState } from "react";
import Surface, { Props } from "../core/Surface";
import styled from "styled-components";
import { makeStyledTransition } from "react-motion-ux";

const useStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    raised: {
      transform: "scale(1)",
    },
    inset: {
      transform: "scale(0.96)",
    },
    flat: {
      transform: "scale(1)",
    },
  },
  500
);

const ButtonContainer = styled(Surface)`
  position: relative;
  display: inline-block;
  border-radius: 18px;
  height: 35px;
  width: 100px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  user-select: none;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  outline-style: none;
  background-color: rgba(0, 0, 0, 0);
`;

const ContentContainer = styled(Surface)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0);
`;

export type { Props };

const Button = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }: Props, ref) => {
    const [state, setState] = useState<"raised" | "inset" | "flat">("flat");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const contentRef = useStyledTransition(state);
    const [duration, setDuration] = useState(2000);

    const returnToNormal = () => {
      if (isFocused) {
        setState("raised");
      } else {
        setState("flat");
      }
    };

    const onMouseDown = () => {
      setState("inset");
      setDuration(1000);
    };

    const onMouseUp = () => {
      returnToNormal();
      setDuration(1000);
    };

    const onMouseEnter = () => {
      setState("raised");
      setDuration(1250);
    };

    const onMouseLeave = () => {
      returnToNormal();
      setDuration(1250);
    };

    const onFocus = () => {
      if (state === "flat") {
        setState("raised");
      }
      setDuration(1000);
      setIsFocused(true);
    };

    const onBlur = () => {
      setState("flat");
      setDuration(1250);
      setIsFocused(false);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        setState("inset");
      }
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        returnToNormal();
      }
    };

    return (
      <ButtonContainer
        ref={ref}
        {...props}
        mode={state}
        transitionDuration={duration}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
        raisedOffset={4}
        raisedSpread={7}
      >
        <ContentContainer ref={contentRef}>{children}</ContentContainer>
      </ButtonContainer>
    );
  }
);

export default Button;
