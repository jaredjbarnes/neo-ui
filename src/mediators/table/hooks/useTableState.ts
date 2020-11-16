import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";
import { StateEvent } from "../../../utils/AsyncActionStateMachine";

const useTableState = () => {
  const table = useTable();
  const [state, setState] = useState<StateEvent>(table.getLoadingState());

  const subscription = useMemo(() => {
    return table.onLoadingStateChange((state) => {
      setState(state);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return state;
};

export default useTableState;
