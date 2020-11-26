import React, { useMemo, useEffect } from "react";
import usePortalMediator from "../mediators/portal/hooks/usePortalMediator";

export interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Portal = ({ children }: Props) => {
  const portalMediator = usePortalMediator();
  const portal = useMemo(() => {
    return portalMediator.createPortal();
  }, [portalMediator]);

  useEffect(() => () => portal.dispose(), [portal]);

  return portal.render(children);
};

export default Portal;
