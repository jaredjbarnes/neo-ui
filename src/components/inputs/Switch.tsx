import React, { useState, useEffect } from "react";
import Surface from "../core/Surface";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";
import { makeStyledTransition } from "react-motion-ux";

const useContainerStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    focused: {
      border: "2px ridge rgba(30, 167, 253, 0.5)",
    },
    normal: {
      border: "2px ridge rgba(255, 255, 255, 0.15)",
    },
  },
  700
);

const useOnStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    on: {
      color: "rgba(30, 167, 253, 0.9)",
    },
    off: {
      color: "rgba(30, 167, 253, 0)",
    },
  },
  500
);

const useOffStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    on: {
      color: "rgba(126, 134, 168, 0)",
    },
    off: {
      color: "rgba(126, 134, 168, 0.9)",
    },
  },
  500
);

const useHandleStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    on: {
      transform: "translate(36px, 4px)",
    },
    off: {
      transform: "translate(4px, 4px)",
    },
  },
  500
);

const useStyles = createUseStyles({
  switchContainer: {
    display: "inline-grid",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "100%",
    position: "relative",
    width: "70px",
    height: "36px",
    borderRadius: "8px",
    fontSize: "10px",
    fontFamily: "Verdana, Geneva, sans-serif",
    color: "rgba(126, 134, 168, 1)",
    border: "2px ridge rgba(30, 167, 253, 0.9)",
    boxSizing: "border-box",
    cursor: "pointer",
    outlineStyle: "none",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  handle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "28px",
    height: "26px",
    transform: "translate(5px, 5px)",
    borderRadius: "4px",
    backgroundColor: "#ecf0f3",
  },
  topLeftTexture: {
    top: "6px",
    left: "6px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
  },
  topRightTexture: {
    top: "6px",
    right: "8px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
  },
  bottomLeftTexture: {
    bottom: "7px",
    right: "8px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
  },
  bottomRightTexture: {
    bottom: "7px",
    left: "6px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
  },
  off: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridRowStart: 1,
    gridRowEnd: 1,
    gridColumnStart: 2,
    gridColumnEnd: 2,
    textTransform: "uppercase",
    paddingRight: "2px",
    userSelect: "none",
  },
  on: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridRowStart: 1,
    gridRowEnd: 1,
    gridColumnStart: 1,
    gridColumnEnd: 1,
    textTransform: "uppercase",
    paddingLeft: "4px",
    userSelect: "none",
  },
});

export interface Props {
  checked?: boolean;
  onChange?: (
    value: boolean,
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  style?: React.CSSProperties;
  className?: string;
}

const Switch = React.forwardRef<HTMLDivElement, Props>(function (
  { checked, onChange, className, style }: Props,
  ref
) {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState<"normal" | "focused">("normal");
  const containerRef = useContainerStyledTransition(isFocused, { ref });
  const verifiedValue = typeof checked === "boolean" ? checked : false;
  const [isChecked, setIsChecked] = useState(verifiedValue);

  useEffect(() => {
    setIsChecked(verifiedValue);
  }, [verifiedValue]);

  const state = isChecked ? "on" : "off";
  const onRef = useOnStyledTransition(state);
  const offRef = useOffStyledTransition(state);
  const handleRef = useHandleStyledTransition(state);

  const toggle = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    if (typeof onChange === "function") {
      onChange(newValue, event);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      toggle(event);
    }
  };

  const onFocus = () => {
    setIsFocused("focused");
  };

  const onBlur = () => {
    setIsFocused("normal");
  };

  return (
    <Surface
      onClick={toggle}
      onKeyDown={onKeyDown}
      ref={containerRef}
      mode="inset"
      insetOffset={2}
      insetSpread={5}
      tabIndex={0}
      onBlur={onBlur}
      onFocus={onFocus}
      className={joinClassNames(classes.switchContainer, className)}
      style={style}
    >
      <div className={classes.off} ref={offRef}>
        Off
      </div>
      <div className={classes.on} ref={onRef}>
        On
      </div>
      <Surface
        className={classes.handle}
        ref={handleRef}
        mode="raised"
        raisedOffset={2}
        raisedSpread={5}
      >
        <Surface
          className={classes.topLeftTexture}
          mode="raised"
          raisedOffset={1}
          raisedSpread={2}
        />
        <Surface
          className={classes.topRightTexture}
          mode="raised"
          raisedOffset={1}
          raisedSpread={2}
        />
        <Surface
          className={classes.bottomLeftTexture}
          mode="raised"
          raisedOffset={1}
          raisedSpread={2}
        />
        <Surface
          className={classes.bottomRightTexture}
          mode="raised"
          raisedOffset={1}
          raisedSpread={2}
        />
      </Surface>
    </Surface>
  );
});

export default Switch;
