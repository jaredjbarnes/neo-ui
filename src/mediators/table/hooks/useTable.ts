import { useContext } from "react";
import { TableContext } from "../TableProvider";

const useTable = () => {
  return useContext(TableContext);
};

export default useTable;
