import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import TextField, { Props } from "../inputs/TextField";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "TextField",
  component: TextField,
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <TextField name="First Name" placeholder="e.g. John" {...props} />
    </StoryBackdrop>
  );
}
