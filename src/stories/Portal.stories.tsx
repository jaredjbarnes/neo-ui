import React, { useMemo, useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import Portal, { Props } from "../layouts/Portal";
import OutlineButton from "../inputs/OutlineButton";
import SolidButton from "../inputs/SolidButton";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "Portal",
  component: Portal,
  argTypes: {
    color: {
      control: "color",
    },
  },
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <div>
        <div>
          <Portal>
            <span>I'm in another world</span>
          </Portal>
          <Portal>
            <span style={{ position: "absolute", top: "100px" }}>
              I'm in another world too!
            </span>
          </Portal>
        </div>
      </div>
    </StoryBackdrop>
  );
}

export function AddAndRemovePortals(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  return (
    <StoryBackdrop>
      <div>
        <button onClick={show}>Show</button>
        <div>
          {isOpen && (
            <Portal>
              <button onClick={hide}>Hide</button>
            </Portal>
          )}
        </div>
      </div>
    </StoryBackdrop>
  );
}
