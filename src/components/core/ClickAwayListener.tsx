import React, { useRef, useEffect } from "react";
import { useForkRef } from "./hooks/useForkRef";

export interface Props {
  onClickAway: (event: React.MouseEvent | React.TouchEvent) => void;
  mouseEvent?: "onMouseUp" | "onMouseDown" | "onClick";
  touchEvent?: "onTouchStart" | "onTouchEnd";
  children: React.ReactElement;
}

const eventMap = {
  onClick: "click",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
};

const touchMap = {
  onTouchStart: "touchstart",
  onTouchEnd: "touchend",
};

export const ClickAwayListener = React.forwardRef<HTMLElement, Props>(
  ({ mouseEvent, touchEvent, children, onClickAway }: Props, ref) => {
    const nodeRef = useRef<any>(null);
    const DOMMouseEvent = eventMap[mouseEvent || "onClick"];
    const DOMTouchEvent = touchMap[touchEvent || "onTouchEnd"];
    const childrenProps = {
      ...children.props,
      ref: useForkRef(nodeRef, children.props.ref, ref),
    };

    const eventHandler = (event: any) => {
      let insideDOM;

      // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
      if (event.composedPath) {
        insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
      } else {
        insideDOM =
          !document.documentElement.contains(event.target) ||
          nodeRef.current.contains(event.target);
      }

      if (!insideDOM) {
        onClickAway(event);
      }
    };

    useEffect(() => {
      document.addEventListener(DOMMouseEvent, eventHandler);
      document.addEventListener(DOMTouchEvent, eventHandler);

      return () => {
        document.removeEventListener(DOMMouseEvent, eventHandler);
        document.removeEventListener(DOMTouchEvent, eventHandler);
      };
    }, [touchEvent, mouseEvent]);

    return React.cloneElement(children, childrenProps);
  }
);
