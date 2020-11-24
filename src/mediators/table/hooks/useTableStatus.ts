import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";
import { StateEvent } from "../../../utils/StatefulAction";

const useTableStatus = () => {
  const table = useTable();
  const [state, setState] = useState<StateEvent>(table.loadedRowsAction.status.value);

  const subscription = useMemo(() => {
    return table.loadedRowsAction.status.onChange((state) => {
      setState(state);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return state;
};

export default useTableStatus;
