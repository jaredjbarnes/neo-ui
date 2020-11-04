import React from "react";
import styled from "styled-components";
import useTable from "../../mediators/table/hooks/useTable";

const TableGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 150px;
  grid-template-rows: 100%;
`;

const TableDisplay = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const TableActions = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
`;

export interface Props {
    canView: boolean;
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
}

function TableLayout<T>() {
  const table = useTable();
  const columns = table.getColumns();
}

export default TableLayout;
