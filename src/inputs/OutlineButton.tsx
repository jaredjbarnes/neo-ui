import React from "react";
import Button, { Props as ButtonProps } from "../inputs/Button";
import styled from "styled-components";

const Outline = styled.div`
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

export interface Props extends ButtonProps {
  color?: string;
}

const OutlineButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, color, ...props }: Props, ref) => {
    let outlineStyle = undefined;

    if (color != null) {
      outlineStyle = {
        border: `2px solid ${color}`,
        color: color,
      };
    }

    return (
      <Button ref={ref} {...props}>
        <Outline style={outlineStyle}>{children}</Outline>
      </Button>
    );
  }
);

export default OutlineButton;
