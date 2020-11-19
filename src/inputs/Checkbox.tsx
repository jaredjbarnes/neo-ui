import React from "react";
import Surface from "../core/Surface";
import styled from "styled-components";

const CheckboxContainer = styled(Surface)`
  border-radius: 4px;
  width: 18px;
  height: 18px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px ridge rgba(255, 255, 255, 0.35);
  box-sizing: border-box;
`;

export interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const Checkbox = ({ style, className }: Props) => {
  return (
    <CheckboxContainer
      style={style}
      className={className}
      mode="inset"
      insetOffset={2}
      insetSpread={4}
    ></CheckboxContainer>
  );
};

export default Checkbox;
