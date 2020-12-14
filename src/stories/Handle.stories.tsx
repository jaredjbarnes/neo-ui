import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Handle from "../components/layouts/window/Handle";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "Handle",
  component: Handle,
} as Meta;

export function Baseline() {
  return (
    <StoryBackdrop>
      <Handle style={{ width: "400px", height: "35px" }} />
    </StoryBackdrop>
  );
}
