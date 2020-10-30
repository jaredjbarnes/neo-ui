import React from "react";
import Button, { Props as ButtonProps } from "../inputs/Button";
import styled from "styled-components";

const SolidBackground = styled.div`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(30, 167, 253, 0.8);
  width: 94px;
  height: 29px;
  border-radius: 15px;
  text-align: center;
  line-height: 29px;
`;

export interface Props extends ButtonProps {
  color?: string;
}

const OutlineButton = React.forwardRef<HTMLDivElement, Props>(
  ({ children, color, ...props }: Props, ref) => {
    let solidStyle = undefined;

    if (color != null) {
      solidStyle = {
        backgroundColor: `${color}`,
      };
    }

    return (
      <Button ref={ref} {...props}>
        <SolidBackground style={solidStyle}>{children}</SolidBackground>
      </Button>
    );
  }
);

export default OutlineButton;
