import React from "react";
import styled from "styled-components";
import Button from "./Button";

const HandleContainer = styled.div`
  display: flex;
  cursor: move;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  background: repeating-linear-gradient(
      rgba(190, 200, 215, 0),
      rgba(190, 200, 215, 0) 4px,
      rgba(190, 200, 215, 1) 5px
    ),
    repeating-linear-gradient(
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0) 2px,
      rgba(255, 255, 255, 0) 5px
    );
`;

const HandleLabel = styled.div`
  background-color: #ecf0f3;
  border-radius: 10px;
  height: 22px;
  color: rgba(100, 110, 140, 0.9);
  font-size: 14px;
  font-family: Verdana, Geneva, sans-serif;
  line-height: 18px;
  padding: 0px 18px;
  border: 2px ridge rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
  user-select: none;
`;

const LeftHandleOptions = styled.div`
  padding: 0px 12px;
  width: 15px;
`;

const RightHandleOptions = styled.div`
  padding: 0px 12px;
  height: 15px;
  box-sizing: border-box;
`;

export interface Props {
  name?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Handle = ({ name, style, className }: Props) => {
  return (
    <HandleContainer style={style} className={className}>
      <LeftHandleOptions></LeftHandleOptions>
      {typeof name === "string" && name.length > 0 ? (
        <HandleLabel>{name}</HandleLabel>
      ) : null}
      <RightHandleOptions>
        <Button />
      </RightHandleOptions>
    </HandleContainer>
  );
};

export default Handle;
