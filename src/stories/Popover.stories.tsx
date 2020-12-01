import React, { useState, useRef } from "react";
import { Meta } from "@storybook/react/types-6-0";
import Popover, { Props } from "../core/popover/Popover";
import Surface from "../core/Surface";
import SolidButton from "../inputs/SolidButton";
import StoryBackdrop from "./StoryBackdrop";
import ClickAwayListener from "../core/ClickAwayListener";
import styled from "styled-components";

const Menu = styled(Surface)`
  width: 125px;
  height: 200px;
  border-radius: 4px;
`;

export default {
  title: "Popover",
  component: Popover,
} as Meta;

export function Baseline(props: Props) {
  const [clickOpen, setClickOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setClickOpen(true);
  };

  const closeMenu = () => {
    setClickOpen(false);
  };

  return (
    <StoryBackdrop>
      <Popover
        open={clickOpen}
        anchorRef={buttonRef}
        placement={{ horizontal: "left", vertical: "bottom" }}
      >
        <ClickAwayListener onClickAway={closeMenu}>
          <Menu mode={"popOut"} raisedOffset={2}></Menu>
        </ClickAwayListener>
      </Popover>
      <SolidButton ref={buttonRef} onClick={openMenu}>
        Open
      </SolidButton>
    </StoryBackdrop>
  );
}
