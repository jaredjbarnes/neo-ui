import { useContext } from "react";
import { RowContext } from "../RowProvider";
import { Row } from "../TableMediator";

function useRow<T>() {
  useContext(RowContext) as Row<T>;
}

export default useRow;
