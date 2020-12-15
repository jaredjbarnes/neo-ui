import React, { useMemo, useEffect } from "react";
import { usePortalMediator } from "../../providers/portal/hooks/usePortalMediator";
import { useForkRef } from "../core/hooks/useForkRef";

export interface Props {
  children: React.ReactElement;
}

export const Portal = React.forwardRef<HTMLElement, Props>(
  ({ children }: Props, ref) => {
    const portalMediator = usePortalMediator();
    const portal = useMemo(() => {
      return portalMediator.createPortal();
    }, [portalMediator]);

    useEffect(() => () => portal.dispose(), [portal]);

    return portal.render(
      React.cloneElement(children, {
        ...children.props,
        ref: useForkRef(ref, children?.props?.ref),
      })
    );
  }
);
