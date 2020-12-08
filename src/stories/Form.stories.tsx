import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import TextField from "../inputs/TextField";
import SwitchField from "../inputs/SwitchField";
import OutlineButton from "../inputs/OutlineButton";
import StoryBackdrop from "./StoryBackdrop";
import Surface from "../core/Surface";
import Handle from "../layouts/window/Handle";
import Select from "../inputs/select/Select";
import { Option } from "../mediators/select/SelectMediator";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  windowHandle: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
  },
  windowBody: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 2,
    gridRowEnd: 2,
    borderBottomRightRadius: "6px",
    borderBottomLeftRadius: "6px",
    overflow: "hidden",
  },
  window: {
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "35px auto",
    width: "500px",
    padding: "0px",
    margin: "0px",
    height: "248px",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  form: {
    display: "grid",
    width: "100%",
    padding: "16px",
    gridRowGap: "16px",
    boxSizing: "border-box",
    gridTemplateColumns: "50% 50%",
    gridRemplateRows: "59px 35px 50px",
  },
  firstNameField: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "90%",
  },
  lastNameField: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "90%",
    justifySelf: "end",
  },
  isMarriedField: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 2,
    gridRowEnd: 2,
    width: "90%",
  },
  selectField: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 2,
    gridRowEnd: 2,
    width: "90%",
    justifySelf: "end",
  },
  saveButton: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 3,
    gridRowEnd: 3,
    justifySelf: "end",
    alignSelf: "end",
  },
});

export default {
  title: "Form",
} as Meta;

export function Baseline() {
  const classes = useStyles();
  const options = [
    {
      id: "1",
      label: "First Option",
      value: "1",
    },
    {
      id: "2",
      label: "Second Option",
      value: "2",
    },
    {
      id: "3",
      label: "Third Option",
      value: "3",
    },
    {
      id: "4",
      label: "Fourth Option",
      value: "4",
    },
    {
      id: "5",
      label: "Fifth Option",
      value: "5",
    },
    {
      id: "6",
      label: "Sixth Option",
      value: "6",
    },
    {
      id: "7",
      label: "Seventh Option",
      value: "7",
    },
  ] as Option<string>[];

  return (
    <StoryBackdrop>
      <Surface
        className={classes.window}
        mode="popOut"
        raisedOffset={5}
        raisedSpread={25}
      >
        <Handle className={classes.windowHandle} name="Person" />
        <div className={classes.windowBody}>
          <div className={classes.form}>
            <TextField className={classes.firstNameField} name="First Name" />
            <TextField className={classes.lastNameField} name="Last Name" />
            <SwitchField className={classes.isMarriedField} name="Married" />
            <Select<string>
              value={null}
              className={classes.selectField}
              options={options}
            />
            <OutlineButton className={classes.saveButton}>Save</OutlineButton>
          </div>
        </div>
      </Surface>
    </StoryBackdrop>
  );
}
