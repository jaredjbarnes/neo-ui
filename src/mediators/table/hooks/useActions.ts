import { useState, useMemo, useEffect } from "react";
import useTable from "./useTable";

const useActions = () => {
  const table = useTable();
  const [actions, setActions] = useState(table.getActions());

  const subscription = useMemo(() => {
    return table.onActionsChange((actions) => {
      setActions(actions);
    });
  }, [table]);

  useEffect(() => () => subscription.unsubscribe(), [subscription]);

  return actions;
};

export default useActions;

