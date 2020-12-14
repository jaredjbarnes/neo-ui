import React, { useState } from "react";
import Surface, { Props } from "../core/Surface";
import { createUseStyles } from "react-jss";
import joinClassNames from '../../utils/joinClassNames';
import { makeStyledTransition } from "react-motion-ux";

const useStyledTransition = makeStyledTransition<HTMLDivElement>(
  {
    raised: {
      transform: "scale(1)",
    },
    inset: {
      transform: "scale(0.96)",
    },
    flat: {
      transform: "scale(1)",
    },
  },
  500
);

const useStyles = createUseStyles({
  container: {
    position: "relative",
    display: "inline-block",
    borderRadius: "18px",
    height: "35px",
    width: "100px",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "16px",
    userSelect: "none",
    color: "rgba(0, 0, 0, 0.6)",
    cursor: "pointer",
    outlineStyle: "none",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
});

export type { Props };

const Button = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }: Props, ref) => {
    const [state, setState] = useState<"raised" | "inset" | "flat">("flat");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const contentRef = useStyledTransition(state);
    const classes = useStyles();
    const [duration, setDuration] = useState(2000);

    const returnToNormal = () => {
      if (isFocused) {
        setState("raised");
      } else {
        setState("flat");
      }
    };

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      if (typeof props.onMouseDown === "function") {
        props.onMouseDown(event);
      }

      setState("inset");
      setDuration(1000);
    };

    const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
      if (typeof props.onMouseUp === "function") {
        props.onMouseUp(event);
      }

      returnToNormal();
      setDuration(1000);
    };

    const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      if (typeof props.onMouseEnter === "function") {
        props.onMouseEnter(event);
      }

      setState("raised");
      setDuration(1250);
    };

    const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      if (typeof props.onMouseLeave === "function") {
        props.onMouseLeave(event);
      }

      returnToNormal();
      setDuration(1250);
    };

    const onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
      if (typeof props.onFocus === "function") {
        props.onFocus(event);
      }

      if (state === "flat") {
        setState("raised");
      }
      setDuration(1000);
      setIsFocused(true);
    };

    const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      if (typeof props.onBlur === "function") {
        props.onBlur(event);
      }

      setState("flat");
      setDuration(1250);
      setIsFocused(false);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        setState("inset");
      }
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        returnToNormal();
      }
    };

    return (
      <Surface
        ref={ref}
        raisedOffset={4}
        raisedSpread={7}
        className={joinClassNames(className, classes.container)}
        {...props}
        mode={state}
        transitionDuration={duration}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
      >
        <Surface className={classes.content}>{children}</Surface>
      </Surface>
    );
  }
);

export default Button;
