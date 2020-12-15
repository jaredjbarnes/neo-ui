import { useContext } from "react";
import { PortalContext } from "../PortalProvider";

export function usePortalMediator() {
  return useContext(PortalContext);
}
