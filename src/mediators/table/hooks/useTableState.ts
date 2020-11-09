import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useTableState = () => {
  const table = useTable();
  const [state, setState] = useState(table.getState());

  const subscription = useMemo(() => {
    return table.onStateChange((state) => {
      setState(state);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return state;
};

export default useTableState;
