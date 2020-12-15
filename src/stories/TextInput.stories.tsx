import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { TextInput, Props } from "../components/inputs/TextInput";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "TextInput",
  component: TextInput,
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <TextInput {...props} />
      <TextInput {...props} disabled />
    </StoryBackdrop>
  );
}
