import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useTableState = () => {
  const table = useTable();
  const [state, setState] = useState(table.getLoadingState());

  const subscription = useMemo(() => {
    return table.onLoadingStateChange((state) => {
      setState(state);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return state;
};

export default useTableState;
