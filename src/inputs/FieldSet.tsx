import React from "react";
import styled from "styled-components";

const StyledFieldSet = styled.fieldset`
  border: 4px ridge rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 16px;
  color: rgba(100, 110, 140, 1);
  padding: 24px;
`;

export interface Props {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const FieldSet = React.forwardRef<HTMLDivElement, Props>(
  ({ name, className, style, children }: Props) => {
    return (
      <StyledFieldSet className={className} style={style}>
        <legend>{name}</legend>
        {children}
      </StyledFieldSet>
    );
  }
);

export default FieldSet;
