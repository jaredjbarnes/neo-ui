import { useContext } from "react";
import { PortalContext } from "../PortalProvider";

const usePortalMediator = () => {
  return useContext(PortalContext);
};

export default usePortalMediator;
