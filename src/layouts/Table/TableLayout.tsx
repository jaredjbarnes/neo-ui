import React from "react";
import styled from "styled-components";
import useTable from "../../mediators/table/hooks/useTable";
import TextInput from "../../inputs/TextInput";
import TableDataScroller from "./TableDataScroller";
import SolidButton from "../../inputs/SolidButton";
import OutlineButton from "../../inputs/OutlineButton";

const TableGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 150px;
  grid-template-rows: 42px auto;
  min-width: 400px;
  min-height: 400px;
`;

const TableDisplay = styled(TableDataScroller)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
  width: 100%;
  height: 100%;
`;

const SearchInput = styled(TextInput)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  width: 100%;
`;

const TableActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
`;

const StyledOutlineButton = styled(OutlineButton)`
    display: block;
    margin-bottom: 10px;
`;

const StyledSolidButton = styled(SolidButton)`
    display: block;
    margin-bottom: 10px;
`;

export interface Props {
  style?: React.CSSProperties;
  className?: string;
}

function TableLayout<T>({ style, className }: Props) {
  const table = useTable();
  const columns = table.getColumns();

  return (
    <TableGrid className={className} style={style}>
      <SearchInput />
      <TableDisplay />
      <TableActions>
        <StyledSolidButton>Add</StyledSolidButton>
        <StyledOutlineButton>Edit</StyledOutlineButton>
        <StyledOutlineButton>Delete</StyledOutlineButton>
      </TableActions>
    </TableGrid>
  );
}

export default TableLayout;
