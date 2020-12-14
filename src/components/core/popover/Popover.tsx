import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Portal from "../../layouts/Portal";
import useForkRef from "../hooks/useForkRef";
import { makeStyledTransition } from "react-motion-ux";
import PopoverMediator, { IAnchorPlacement, IOffset } from "../../../mediators/popover/PopoverMediator";

const useStyledTransition = makeStyledTransition<HTMLElement>(
  {
    closed: {
      transform: "scale(0.9) translate(0px, -20px)",
      opacity: 0,
      transformOrigin: "center center",
    },
    closing: {
      transform: "scale(0.9) translate(0px, -20px)",
      opacity: 0,
      transformOrigin: "center center",
    },
    open: {
      transform: "scale(1) translate(0px, 0px)",
      opacity: 1,
      transformOrigin: "center center",
    },
  },
  500
);

export interface Props {
  open: boolean;
  children: React.ReactElement;
  anchorRef: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>;
  placement: IAnchorPlacement;
  offset?: IOffset;
}

const getOffset = (offset: { x: number; y: number } | null | undefined) => {
  return offset != null && typeof offset === "object" ? offset : { x: 0, y: 0 };
};

const Popover = React.forwardRef<HTMLElement, Props>(
  ({ open, children, anchorRef, placement, offset }: Props, ref) => {
    const nodeRef = useRef<HTMLElement>(null);
    const forkedRef = useForkRef(nodeRef, ref);
    const finalOffset = getOffset(offset);

    const popoverMediator = useMemo(() => {
      return new PopoverMediator();
    }, []);

    const [internalState, setInternalState] = useState<
      "open" | "closed" | "closing"
    >(open ? "open" : "closed");
    const timeoutRef = useRef<number>(0);

    const finalRef = useStyledTransition(internalState, {
      ref: forkedRef,
      duration: internalState === "open" ? 200 : 200,
    });

    const position = useCallback(() => {
      const anchorElement = anchorRef.current;
      const node = nodeRef.current;

      if (anchorElement == null || node == null) {
        return;
      }

      const anchorRect = anchorElement.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const boundingRect = {
        top: 0,
        left: 0,
        right: document.documentElement.clientWidth,
        bottom: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };

      popoverMediator.nodeRect = nodeRect;
      popoverMediator.boundingRect = boundingRect;
      popoverMediator.offset = finalOffset;
      popoverMediator.anchorRect = anchorRect;
      popoverMediator.placement = placement;

      const resultRect = popoverMediator.getPosition();

      node.style.position = "absolute";
      node.style.top = `${resultRect.top}px`;
      node.style.left = `${resultRect.left}px`;
    }, []);

    useEffect(() => {
      if (open) {
        clearTimeout(timeoutRef.current);
        setInternalState("open");
      } else {
        setInternalState("closing");
        timeoutRef.current = setTimeout(() => {
          setInternalState("closed");
        }, 200);
      }
    }, [open]);

    useEffect(() => {
      const onResize = () => {
        position();
      };

      window.addEventListener("resize", onResize);

      return () => {
        return window.removeEventListener("resize", onResize);
      };
    }, []);

    useEffect(() => {
      if (internalState === "open") {
        const anchorElement = anchorRef.current;
        const node = nodeRef.current;
        if (anchorElement != null && node != null) {
          position();
        }
      }
    }, [internalState]);

    if (internalState === "closed") {
      return null;
    } else {
      return <Portal ref={finalRef}>{children}</Portal>;
    }
  }
);

export default Popover;
