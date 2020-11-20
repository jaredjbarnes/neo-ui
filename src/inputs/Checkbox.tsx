import React, { useState, useEffect } from "react";
import Surface from "../core/Surface";
import Check from "@material-ui/icons/Check";
import styled from "styled-components";

const CheckboxContainer = styled(Surface)`
  border-radius: 4px;
  width: 18px;
  height: 18px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px ridge rgba(255, 255, 255, 0.25);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CheckIcon = styled(Check)`
  color: rgba(30, 167, 253, 0.9);
`;

export interface Props {
  style?: React.CSSProperties;
  className?: string;
  onValueChange?: (value: boolean) => void;
  value?: boolean;
}

const Checkbox = ({ style, className, value, onValueChange }: Props) => {
  const verifiedValue = typeof value === "boolean" ? value : false;
  const [isChecked, setIsChecked] = useState(verifiedValue);

  const onMouseDown = () => {
    const newValue = !isChecked;

    setIsChecked(newValue);
    if (typeof onValueChange === "function") {
      onValueChange(newValue);
    }
  };

  useEffect(() => {
    setIsChecked(verifiedValue);
  }, [verifiedValue]);

  return (
    <CheckboxContainer
      style={style}
      className={className}
      mode="inset"
      insetOffset={2}
      insetSpread={4}
      onMouseDown={onMouseDown}
    >
      {isChecked && <CheckIcon style={{ fontSize: 15 }} />}
    </CheckboxContainer>
  );
};

export default Checkbox;
