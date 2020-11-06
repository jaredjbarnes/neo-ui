import React, { useState } from "react";
import styled from "styled-components";

const ColumnContainer = styled.div`
  :first-child {
    border-left: 1px solid rgba(255, 255, 255, 0);
  }
  :last-child {
    border-right: 1px solid rgba(190, 200, 215, 0);
  }
  position: relative;
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

const TableColumn = ({ children, style, className }: Props) => {
  const [state, setState] = useState("released");

  const press = () => {
    setState("pressed");
  };

  const release = () => {
    setState("released");
  };

  let activeStyle = {};

  if (state === "pressed") {
    activeStyle = {
      top: "1px",
      borderBottom: "1px solid rgba(190, 200, 215, 0)",
    };
  } else {
    activeStyle = {
      top: "0px",
      borderBottom: "1px solid rgba(190, 200, 215, 1)",
    };
  }

  return (
    <ColumnContainer
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      style={{ ...style, ...activeStyle }}
      className={className}
    >
      {children}
    </ColumnContainer>
  );
};

export default TableColumn;
