import React from "react";
import { createUseStyles } from "react-jss";
import { makeStyledTransition } from "react-motion-ux";
import ColorConverter from "../../utils/ColorConverter";
import joinClassNames from "../../utils/joinClassNames";

const colorConverter = new ColorConverter();

function resolveHighlightColor(color: string | null | undefined) {
  color = color || "rgba(255,255,255,1)";
  const convertedColor = colorConverter.convertToRgba(color) || color;
  return convertedColor;
}

function resolveShadowColor(color: string | null | undefined) {
  color = color || "rgba(190,200,215,1)";
  const convertedColor = colorConverter.convertToRgba(color) || color;
  return convertedColor;
}

const useStyles = createUseStyles({
  container: {
    display: "inline-block",
    boxSizing: "border-box",
    backgroundColor: "#ecf0f3",
  },
});

const useStyledTransition = makeStyledTransition<HTMLDivElement>(
  ({
    highlightColor,
    shadowColor,
    fadedShadowColor,
    fadedHighlightColor,
    raisedOffset,
    raisedSpread,
    insetOffset,
    insetSpread,
  }) => ({
    raised: {
      boxShadow: `-${raisedOffset}px -${raisedOffset}px ${raisedSpread}px 0px ${highlightColor},
      ${raisedOffset}px ${raisedOffset}px ${raisedSpread}px 0px ${shadowColor},
         inset -${insetOffset}px -${insetOffset}px ${insetSpread}px 0px ${fadedHighlightColor},
         inset ${insetOffset}px ${insetOffset}px ${insetSpread}px 0px ${fadedShadowColor}`,
    },
    inset: {
      boxShadow: `-${raisedOffset}px -${raisedOffset}px ${raisedSpread}px 0px ${fadedHighlightColor},
      ${raisedOffset}px ${raisedOffset}px ${raisedSpread}px 0px ${fadedShadowColor},
         inset -${insetOffset}px -${insetOffset}px ${insetSpread}px 0px ${highlightColor},
         inset ${insetOffset}px ${insetOffset}px ${insetSpread}px 0px ${shadowColor}`,
    },
    cutOut: {
      boxShadow: `-${raisedOffset * 3}px -${raisedOffset * 3}px ${
        raisedSpread * 2
      }px 0px ${fadedHighlightColor},
      ${raisedOffset * 3}px ${raisedOffset * 3}px ${
        raisedSpread * 2
      }px 0px ${fadedShadowColor},
      inset -${insetOffset}px -${insetOffset}px ${
        insetSpread * 2
      }px 0px ${fadedHighlightColor},
        inset ${insetOffset}px ${insetOffset}px ${insetSpread}px 1px ${shadowColor}`,
    },
    popOut: {
      boxShadow: `${raisedOffset * 3}px ${raisedOffset * 3}px ${
        raisedSpread * 2
      }px 0px ${fadedShadowColor},
      ${raisedOffset}px ${raisedOffset}px ${raisedSpread}px 1px ${shadowColor},
      inset -${insetOffset}px -${insetOffset}px ${
        insetSpread * 2
      }px 0px ${fadedHighlightColor},
      inset ${insetOffset}px ${insetOffset}px ${
        insetSpread * 2
      }px 0px ${fadedShadowColor}`,
    },
    flat: {
      boxShadow: `-${raisedOffset * 3}px -${raisedOffset * 3}px ${
        raisedSpread * 2
      }px 0px ${fadedHighlightColor},
      ${raisedOffset * 3}px ${raisedOffset * 3}px ${
        raisedSpread * 2
      }px 0px ${fadedShadowColor},
      inset -${insetOffset}px -${insetOffset}px ${
        insetSpread * 2
      }px 0px ${fadedHighlightColor},
      inset ${insetOffset}px ${insetOffset}px ${
        insetSpread * 2
      }px 0px ${fadedShadowColor}`,
    },
  }),
  1000
);

export interface Props extends React.DOMAttributes<HTMLDivElement> {
  highlightColor?: string;
  shadowColor?: string;
  insetSpread?: number;
  insetOffset?: number;
  raisedSpread?: number;
  raisedOffset?: number;
  children?: React.ReactNode[] | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  mode?: "flat" | "inset" | "raised" | "cutOut" | "popOut";
  transitionDuration?: number;
  tabIndex?: number;
}

const Surface = React.forwardRef<HTMLDivElement, Props>(function (
  {
    className,
    style,
    children,
    mode,
    highlightColor,
    shadowColor,
    raisedSpread,
    raisedOffset,
    insetSpread,
    insetOffset,
    transitionDuration,
    ...props
  }: Props,
  ref
) {
  const classes = useStyles();

  highlightColor = resolveHighlightColor(highlightColor);
  shadowColor = resolveShadowColor(shadowColor);
  mode = mode == null ? "flat" : mode;
  raisedSpread = typeof raisedSpread === "number" ? raisedSpread : 15;
  raisedOffset = typeof raisedOffset === "number" ? raisedOffset : 10;
  insetSpread = typeof insetSpread === "number" ? insetSpread : 7;
  insetOffset = typeof insetOffset === "number" ? insetOffset : 4;

  const fadedHighlightColor = colorConverter.changeAlpha(highlightColor, 0);
  const fadedShadowColor = colorConverter.changeAlpha(shadowColor, 0);

  const containerRef = useStyledTransition(mode, {
    ref,
    duration: typeof transitionDuration === "number" ? transitionDuration : 700,
    props: {
      highlightColor,
      shadowColor,
      raisedSpread,
      raisedOffset,
      insetSpread,
      insetOffset,
      fadedHighlightColor,
      fadedShadowColor,
    },
  });

  return (
    <div
      {...props}
      ref={containerRef}
      className={joinClassNames(classes.container, className)}
      style={style}
    >
      {children}
    </div>
  );
});

export default Surface;
