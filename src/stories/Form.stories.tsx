import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import TextField from "../inputs/TextField";
import SwitchField from "../inputs/SwitchField";
import Button from "../inputs/Button";
import StoryBackdrop from "./StoryBackdrop";
import Surface from "../core/Surface";
import Handle from "../layouts/window/Handle";
import styled from "styled-components";

const WindowHandle = styled(Handle)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const WindowBody = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  overflow: hidden;
`;

const Window = styled(Surface)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 35px auto;
  width: 500px;
  padding: 0px;
  margin: 0px;
  height: 216px;
  border-radius: 6px;
  box-sizing: border-box;
`;

const Form = styled.div`
  display: grid;
  width: 100%;
  padding: 16px;
  grid-row-gap: 8px;
  box-sizing: border-box;
  grid-template-columns: 50% 50%;
  grid-template-rows: 59px 35px 35px;
`;

const FirstNameField = styled(TextField)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  width: 90%;
`;

const LastNameField = styled(TextField)`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: end;
  width: 90%;
`;

const IsMarriedField = styled(SwitchField)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
`;

const SaveButton = styled(Button)`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 3;
  justify-self: end;
`;

const BorderButtonContent = styled.div`
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
  color: rgba(30, 167, 253, 1);
`;

export default {
  title: "Form",
} as Meta;

export function Baseline() {
  return (
    <StoryBackdrop>
      <Window mode="popOut" raisedOffset={5} raisedSpread={25}>
        <WindowHandle name="Person" />
        <WindowBody>
          <Form>
            <FirstNameField name="First Name" />
            <LastNameField name="Last Name" />
            <IsMarriedField name="Married" />
            <SaveButton>
              <BorderButtonContent>Save</BorderButtonContent>
            </SaveButton>
          </Form>
        </WindowBody>
      </Window>
    </StoryBackdrop>
  );
}
