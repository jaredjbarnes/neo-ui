import React from "react";
import Portal from "../layouts/Portal";

interface Props {
  open: boolean;
  children: React.ReactNode | React.ReactNode[];
  anchorRef: React.Ref<HTMLElement>;
  offset: {
      x: number;
      y: number;
  }
}

const Popover = ({ open, children, anchorRef }: Props) => {
  if (open) {
    return null;
  } else {
    return (
      <Portal>
        {children}
      </Portal>
    );
  }
};

export default Popup;
