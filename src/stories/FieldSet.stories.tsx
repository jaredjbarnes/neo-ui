import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { FieldSet } from "../components/inputs/FieldSet";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "FieldSet",
  component: FieldSet,
} as Meta;

export function Baseline() {
  return (
    <StoryBackdrop>
      <FieldSet name="Group Name" style={{ width: "400px", height: "35px" }} />
    </StoryBackdrop>
  );
}
