import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { SwitchField, Props } from "../components/inputs/SwitchField";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "SwitchField",
  component: SwitchField,
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <SwitchField name="Enabled" {...props} />
    </StoryBackdrop>
  );
}
