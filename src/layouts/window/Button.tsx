import React, { useState } from "react";
import Surface from "../../core/Surface";
import styled from "styled-components";

const ButtonContainer = styled(Surface)`
  position: relative;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: rgba(243, 85, 92, 1);
  cursor: pointer;
`;

export interface Props {}

const Button = ({}: Props) => {
  const [mode, setMode] = useState<"flat" | "cutOut">("flat");
  const press = () => {
    setMode("cutOut");
  };
  const release = () => {
    setMode("flat");
  };

  return (
    <ButtonContainer
      onMouseDown={press}
      onMouseLeave={release}
      onMouseUp={release}
      mode={mode}
      insetSpread={5}
      insetOffset={0}
      shadowColor="rgba(180,0,0,1)"
      highlightColor="rgba(255,80,80,0.9)"
    ></ButtonContainer>
  );
};

export default Button;
