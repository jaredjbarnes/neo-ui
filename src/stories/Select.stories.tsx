import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Select, { Props } from "../components/inputs/select/Select";
import { Option } from "../mediators/select/SelectMediator";
import StoryBackdrop from "./StoryBackdrop";

export default {
  title: "Select",
  component: Select,
  argTypes: {},
} as Meta;

export function Baseline(props: Props<string>) {
  const options = [
    {
      id: "1",
      label: "First Option",
      value: "1",
    },
    {
      id: "2",
      label: "Second Option",
      value: "2",
    },
    {
      id: "3",
      label: "Third Option",
      value: "3",
    },
    {
      id: "4",
      label: "Fourth Option",
      value: "4",
    },
    {
      id: "5",
      label: "Fifth Option",
      value: "5",
    },
    {
      id: "6",
      label: "Sixth Option",
      value: "6",
    },
    {
      id: "7",
      label: "Seventh Option",
      value: "7",
    },
  ] as Option<string>[];

  return (
    <StoryBackdrop>
      <Select {...props} options={options} />
    </StoryBackdrop>
  );
}
