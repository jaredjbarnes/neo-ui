import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Button, { Props } from "../inputs/Button";
import OutlineButton from "../inputs/OutlineButton";
import SolidButton from "../inputs/SolidButton";
import StoryBackdrop from "./StoryBackdrop";
import styled from "styled-components";

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
