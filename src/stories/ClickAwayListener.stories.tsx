import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import ClickAwayListener, { Props } from "../core/ClickAwayListener";
import StoryBackdrop from "./StoryBackdrop";
import Portal from "../layouts/Portal";
import styled from "styled-components";

const Container = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  background-color: red;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export default {
  title: "ClickAwayListener",
  component: ClickAwayListener,
  argTypes: {},
} as Meta;

export function Baseline(props: Props) {
  const [state, setState] = useState(0);

  const handler = () => {
    setState((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <StoryBackdrop>
      <ClickAwayListener onClickAway={handler}>
        <Container>{state}</Container>
      </ClickAwayListener>
    </StoryBackdrop>
  );
}

export function WithPortal(props: Props) {
  const [open, setOpen] = useState(false);

  const handler = () => {
    setOpen(false);
  };

  const openPopup = () => {
    setOpen(true);
  };

  return (
    <StoryBackdrop>
      <button onClick={openPopup}>Open</button>
      {open && (
        <Portal>
          <ClickAwayListener onClickAway={handler}>
            <Container>Hello World</Container>
          </ClickAwayListener>
        </Portal>
      )}
    </StoryBackdrop>
  );
}
