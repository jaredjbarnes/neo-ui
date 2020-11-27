import React, { useEffect, useRef } from "react";
import Portal from "../layouts/Portal";
import useForkRef from "./hooks/useForkRef";

export interface Props {
  open: boolean;
  children: React.ReactElement;
  anchorRef: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>;
  placement: {
    horizontal: "center" | "left" | "right";
    vertical: "center" | "top" | "bottom";
  };
  offset?: {
    x: number;
    y: number;
  };
}

const getOffset = (offset: { x: number; y: number } | null | undefined) => {
  return offset != null && typeof offset === "object" ? offset : { x: 0, y: 0 };
};

const Popover = React.forwardRef<HTMLElement, Props>(
  ({ open, children, anchorRef, placement, offset }: Props, ref) => {
    const nodeRef = useRef<HTMLElement>(null);
    const forkedRef = useForkRef(nodeRef, ref);
    offset = getOffset(offset);

    useEffect(() => {
      if (open) {
        const anchorElement = anchorRef.current;
        const node = nodeRef.current;

        if (anchorElement != null && node != null) {
          const rect = anchorElement.getBoundingClientRect();
          node.style.position = "absolute";

          if (placement.vertical === "center") {
            const top = `${
              rect.top + Math.floor(rect.height / 2) + offset.y
            }px`;
            node.style.top = top;
          } else {
            const top = `${rect[placement.vertical] + offset.y}px`;
            node.style.top = top;
          }

          if (placement.horizontal === "center") {
            const left = `${
              rect.left + Math.floor(rect.width / 2) + offset.x
            }px`;
            node.style.left = left;
          } else {
            const left = `${rect[placement.horizontal] + offset.x}px`;
            node.style.left = left;
          }
        }
      }
    }, [open]);

    if (!open) {
      return null;
    } else {
      return <Portal ref={forkedRef}>{children}</Portal>;
    }
  }
);

export default Popover;
