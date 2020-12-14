import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Button, { Props } from "../components/inputs/Button";
import OutlineButton from "../components/inputs/OutlineButton";
import SolidButton from "../components/inputs/SolidButton";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    color: {
      control: "color",
    },
  },
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <Button {...props}>Save</Button>
      <OutlineButton {...props}>Save</OutlineButton>
      <SolidButton {...props}>Save</SolidButton>
    </StoryBackdrop>
  );
}
