import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Surface, { Props } from "../core/Surface";
import StoryBackdrop from "./StoryBackdrop";
import SearchIcon from "@material-ui/icons/Search";
import { createUseStyles } from "react-jss";

export default {
  title: "Surface",
  component: Surface,
  argTypes: {
    mode: {
      control: {
        type: "inline-radio",
        options: ["flat", "raised", "inset", "cutOut", "popOut"],
      },
    },
    highlightColor: {
      control: "color",
    },
    shadowColor: {
      control: "color",
    },
  },
  args: {
    mode: "raised",
  },
} as Meta;

const useStyles = createUseStyles({
  circle: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "100px",
  },
  roundedSquare: {
    height: "100px",
    width: "100px",
    borderRadius: "8px",
    textAlign: "center",
    lineHeight: "100px",
    border: "2px ridge rgba(255, 255, 255, 0.15)",
  },
  outerSurface: {
    height: "36px",
    width: "175px",
    borderRadius: "18px",
    textAlign: "center",
    lineHeight: "100px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "left",
  },
  innerSurface: {
    position: "relative",
    height: "30px",
    width: "130px",
    borderRadius: "15px",
    textAlign: "center",
    lineHeight: "100px",
    marginLeft: "3px",
    color: "rgba(126, 134, 168, 0.9)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  icon: {
    marginLeft: "6px",
    color: "rgba(126, 134, 168, 0.9)",
  },
  input: {
    outline: "none",
    border: 0,
    backgroundColor: "transparent",
    padding: "0px 12px",
    width: "100%",
    height: "100%",
    color: "rgba(126, 134, 168, 0.9)",
  },
  big: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  smallest: {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
  },
});

export function Baseline(props: Props) {
  const classes = useStyles();
  const isDefault = props.mode == null || props.mode === "flat";
  let inverseMode: "flat" | "raised" | "inset" =
    props.mode === "raised" ? "inset" : "raised";
  inverseMode = isDefault ? "flat" : inverseMode;

  return (
    <StoryBackdrop>
      <Surface className={classes.circle} {...props}></Surface>
      <Surface className={classes.roundedSquare} {...props}></Surface>
      <Surface className={classes.outerSurface} {...props} mode="raised">
        <Surface
          className={classes.innerSurface}
          mode="inset"
          insetOffset={3}
          insetSpread={5}
        >
          <input className={classes.input} />
        </Surface>
        <SearchIcon className={classes.icon} />
      </Surface>
      <Surface className={classes.big} mode={props.mode}>
        <Surface className={classes.small} mode={inverseMode}>
          <Surface className={classes.smallest} mode={props.mode}></Surface>
        </Surface>
      </Surface>
    </StoryBackdrop>
  );
}
