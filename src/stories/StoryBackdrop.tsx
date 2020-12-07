import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    backgroundColor: "#ecf0f3",
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    minHeight: "400px",
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

const StoryBackdrop = ({ children }: Props) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default StoryBackdrop;
