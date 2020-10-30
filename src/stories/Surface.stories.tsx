import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Surface, { Props } from "../core/Surface";
import StoryBackdrop from "./StoryBackdrop";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

export default {
  title: "Surface",
  component: Surface,
  argTypes: {
    mode: {
      control: {
        type: "inline-radio",
        options: ["flat", "raised", "inset","cutOut","popOut"],
      },
    },
    highlightColor: {
      control: "color",
    },
    shadowColor: {
      control: "color",
    },
  },
  args: {
    mode: "raised",
  },
} as Meta;

const Circle = styled(Surface)`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
`;

const RoundedSquare = styled(Surface)`
  height: 100px;
  width: 100px;
  border-radius: 8px;
  text-align: center;
  line-height: 100px;
  border: 2px ridge rgba(255, 255, 255, 0.15);
`;

const OuterSurface = styled(Surface)`
  height: 36px;
  width: 175px;
  border-radius: 18px;
  text-align: center;
  line-height: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: left;
`;

const InnerSurface = styled(Surface)`
  position: relative;
  height: 30px;
  width: 130px;
  border-radius: 15px;
  text-align: center;
  line-height: 100px;
  margin-left: 3px;
  color: rgba(126, 134, 168, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.25);
`;

const Icon = styled(SearchIcon)`
  margin-left: 6px;
  color: rgba(126, 134, 168, 0.9);
`;

const Input = styled.input`
  outline: none;
  border: 0;
  background-color: transparent;
  padding: 0px 12px;
  width: 100%;
  height: 100%;
  color: rgba(126, 134, 168, 0.9);
`;

const Big = styled(Surface)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Small = styled(Surface)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Smallest = styled(Surface)`
  width: 30px;
  height: 30px;
  border-radius: 4px;
`;

export function Baseline(props: Props) {
  const isDefault = props.mode == null || props.mode === "flat";
  let inverseMode: "flat" | "raised" | "inset" =
    props.mode === "raised" ? "inset" : "raised";
  inverseMode = isDefault ? "flat" : inverseMode;

  return (
    <StoryBackdrop>
      <Circle {...props}></Circle>
      <RoundedSquare {...props}></RoundedSquare>
      <OuterSurface {...props} mode="raised">
        <InnerSurface mode="inset" insetOffset={3} insetSpread={5}>
          <Input />
        </InnerSurface>
        <Icon />
      </OuterSurface>
      <Big mode={props.mode}>
        <Small mode={inverseMode}>
          <Smallest mode={props.mode}></Smallest>
        </Small>
      </Big>
    </StoryBackdrop>
  );
}
