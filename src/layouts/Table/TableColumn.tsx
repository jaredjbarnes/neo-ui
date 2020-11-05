import React, { useState, useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled from "styled-components";
import { makeStyledTransition } from "react-motion-ux";

const useStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    pressed: {
      borderBottom: "1px solid rgba(190, 200, 215, 0)",
      borderLeft: "1px solid rgba(255, 255, 255, 0)",
      borderRight: "1px solid rgba(190, 200, 215, 0)",
    },
    released: {
      borderBottom: "1px solid rgba(190, 200, 215, 1)",
      borderLeft: "1px solid rgba(255, 255, 255, 1)",
      borderRight: "1px solid rgba(190, 200, 215, 1)",
    },
  },
  700
);

const ColumnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(100, 110, 140, 1);
  border-bottom: 1px solid rgba(190, 200, 215, 1);
  border-left: 1px solid rgba(255, 255, 255, 1);
  border-right: 1px solid rgba(190, 200, 215, 1);
  box-sizing: border-box;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 11px;
  cursor: pointer;
  user-select: none;
`;

export interface Props {
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

const Column = ({ children, style, className }: Props) => {
  const [state, setState] = useState("released");
  const ref = useStyledTransition(state);

  const press = () => {
    setState("pressed");
  };

  const release = () => {
    setState("released");
  };

  return (
    <ColumnContainer
      ref={ref}
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      style={style}
      className={className}
    >
      {children}
    </ColumnContainer>
  );
};

export default Column;
