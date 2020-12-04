import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Select, { Props } from "../inputs/select/Select";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "Select",
  component: Select,
  argTypes: {
    
  },
} as Meta;

export function Baseline(props: Props<string>) {
  return (
    <StoryBackdrop>
      <Select {...props} />
    </StoryBackdrop>
  );
}
