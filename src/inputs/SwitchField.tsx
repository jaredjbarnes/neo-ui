import React from "react";
import styled, { CSSProperties } from "styled-components";
import Switch from "./Switch";
import { makeStyledTransition } from "react-motion-ux";

const SwitchFieldContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto 0px 70px;
  grid-template-rows: 100%;
  grid-gap: 3px;
  height: 35px;
  width: 200px;
`;

const PositionedSwitch = styled(Switch)`
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const PositionedLabel = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 14px;
  line-height: 35px;
  padding-left: 4px;
  color: rgba(100, 110, 140, 0.85);
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface Props {
  name?: string;
  checked?: boolean;
  onChange?: (
    value: boolean,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  style?: React.CSSProperties;
  className?: string;
}

const SwitchField = React.forwardRef<HTMLDivElement, Props>(
  ({ name, checked, className, style, ...props }: Props, ref) => {
    return (
      <SwitchFieldContainer ref={ref} className={className} style={style}>
        <PositionedLabel>{name}</PositionedLabel>
        <PositionedSwitch checked={checked} {...props} />
      </SwitchFieldContainer>
    );
  }
);

export default SwitchField;
