import React from "react";
import useTableState from "../../mediators/table/hooks/useTableState";
import useTable from "../../mediators/table/hooks/useTable";
import styled from "styled-components";

const TableStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 25px;
  min-width: 100%;
  background-color: #ecf0f3;
  border-top: 4px ridge rgba(255, 255, 255, 0.25);
  font-size: 10px;
  color: rgba(100, 110, 140, 0.8);
  font-family: Verdana, Geneva, sans-serif;
`;

const Status = styled.span`
  padding-left: 4px;
`;

const Loaded = styled.span`
  padding-right: 4px;
`;

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const textMap = {
  ready: "Idle",
  disabled: "Complete",
  pending: "Loading",
  error: "Error",
};

const TableStatus = ({ className, style }: Props) => {
  const state = useTableState();
  const table = useTable();

  return (
    <TableStatusContainer className={className} style={style}>
      <Status>Status: {textMap[state]}</Status>
      <Loaded>Loaded: {table.getLoadedRowsLength()}</Loaded>
    </TableStatusContainer>
  );
};

export default TableStatus;
