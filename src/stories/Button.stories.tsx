import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Button, { Props } from "../inputs/Button";
import StoryBackdrop from "./StoryBackdrop";
import styled from "styled-components";

const Content = styled.div`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(30, 167, 253, 0.8);
  width: 94px;
  height: 29px;
  border-radius: 15px;
  text-align: center;
  line-height: 29px;
`;

const BorderContent = styled.div`
  border: 2px solid rgba(30, 167, 253, 0.8);
  width: 94px;
  height: 29px;
  box-sizing: border-box;
  border-radius: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 33px;
  color: rgba(30, 167, 253, 0.9);
`;

export default {
  title: "Button",
  component: Button,
} as Meta;

export function Baseline(props: Props) {
  return (
    <StoryBackdrop>
      <Button>
        <BorderContent>Save</BorderContent>
      </Button>
      <Button>Save</Button>
      <Button>
        <Content>Save</Content>
      </Button>
    </StoryBackdrop>
  );
}
