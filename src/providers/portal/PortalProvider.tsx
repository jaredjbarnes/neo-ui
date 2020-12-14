import React, { useMemo, useEffect } from "react";
import PortalMediator from "../../mediators/portal/PortalMediator";

const portalMediator = new PortalMediator(document.body);
const PortalContext = React.createContext(portalMediator);

interface Props {
  element: HTMLElement;
  children: React.ReactNode | React.ReactNode[];
}

const PortalProvider = ({ element, children }: Props) => {
  const portalMediator = useMemo(() => {
    return new PortalMediator(element);
  }, [element]);

  useEffect(() => () => portalMediator.dispose(), [portalMediator]);

  return (
    <PortalContext.Provider value={portalMediator}>
      {children}
    </PortalContext.Provider>
  );
};

export { PortalContext };
export default PortalProvider;
