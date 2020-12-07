import React, { useState } from "react";
import Surface from "../../core/Surface";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  button: {
    position: "relative",
    width: "13px",
    height: "13px",
    borderRadius: "50%",
    backgroundColor: "rgba(243, 85, 92, 1)",
    cursor: "pointer",
  },
});

export interface Props {}

const Button = ({}: Props) => {
  const classes = useStyles();
  const [mode, setMode] = useState<"flat" | "cutOut">("flat");
  const press = () => {
    setMode("cutOut");
  };
  const release = () => {
    setMode("flat");
  };

  return (
    <Surface
      className={classes.button}
      onMouseDown={press}
      onMouseLeave={release}
      onMouseUp={release}
      mode={mode}
      insetSpread={5}
      insetOffset={0}
      shadowColor="rgba(180,0,0,1)"
      highlightColor="rgba(255,80,80,0.9)"
    ></Surface>
  );
};

export default Button;
