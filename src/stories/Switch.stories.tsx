import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Switch, { Props } from "../components/inputs/Switch";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "Switch",
  component: Switch,
  argTypes: {
    checked: {
      control: "boolean",
    },
  },
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <Switch {...props} />
    </StoryBackdrop>
  );
}
