import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import ClickAwayListener, { Props } from "../components/core/ClickAwayListener";
import StoryBackdrop from "./StoryBackdrop";
import Portal from "../components/layouts/Portal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "100px",
    height: "100px",
    border: "1px solid #000",
    backgroundColor: "red",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default {
  title: "ClickAwayListener",
  component: ClickAwayListener,
  argTypes: {},
} as Meta;

export function Baseline(props: Props) {
  const classes = useStyles();
  const [state, setState] = useState(0);

  const handler = () => {
    setState((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <StoryBackdrop>
      <ClickAwayListener onClickAway={handler}>
        <div className={classes.container}>{state}</div>
      </ClickAwayListener>
    </StoryBackdrop>
  );
}

export function WithPortal(props: Props) {
  const classes = useStyles();
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
            <div className={classes.container}>Hello World</div>
          </ClickAwayListener>
        </Portal>
      )}
    </StoryBackdrop>
  );
}
