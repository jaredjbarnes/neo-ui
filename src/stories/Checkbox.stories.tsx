import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Checkbox, { Props } from "../inputs/Checkbox";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "Checkbox",
  component: Checkbox,
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <Checkbox />
    </StoryBackdrop>
  );
}
