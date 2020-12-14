import React, { useState, useRef } from "react";
import { Meta } from "@storybook/react/types-6-0";
import Popover, { Props } from "../components/core/popover/Popover";
import Surface from "../components/core/Surface";
import SolidButton from "../components/inputs/SolidButton";
import StoryBackdrop from "./StoryBackdrop";
import ClickAwayListener from "../components/core/ClickAwayListener";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  menu: {
    width: "125px",
    height: "200px",
    borderRadius: "4px",
  },
});

export default {
  title: "Popover",
  component: Popover,
} as Meta;

export function Baseline(props: Props) {
  const classes = useStyles();
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
          <Surface
            mode={"popOut"}
            className={classes.menu}
            raisedOffset={2}
          ></Surface>
        </ClickAwayListener>
      </Popover>
      <SolidButton ref={buttonRef} onClick={openMenu}>
        Open
      </SolidButton>
    </StoryBackdrop>
  );
}
