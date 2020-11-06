import React, { useRef } from "react";
import styled from "styled-components";
import useTable from "../../mediators/table/hooks/useTable";
import TextInput from "../../inputs/TextInput";
import TableDataScroller from "./TableDataScroller";
import SolidButton from "../../inputs/SolidButton";
import OutlineButton from "../../inputs/OutlineButton";
import Search from "@material-ui/icons/Search";

const TableGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 125px;
  grid-template-rows: 35px 8px auto;
  min-width: 400px;
  min-height: 400px;
`;

const TableDisplay = styled(TableDataScroller)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 3;
  grid-row-end: 3;
  width: 100%;
  height: 100%;
`;

const TableActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 3;
`;

const StyledOutlineButton = styled(OutlineButton)`
  display: block;
  margin-bottom: 10px;
`;

const StyledSolidButton = styled(SolidButton)`
  display: block;
  margin-bottom: 10px;
`;

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: auto 30px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  width: 100%;
`;

const SearchInput = styled(TextInput)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  width: 100%;
`;

const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  width: 100%;
`;

const SearchIcon = styled(Search)`
  color: rgba(100, 110, 140, 0.8);
`;

export interface Props {
  style?: React.CSSProperties;
  className?: string;
}

function TableLayout<T>({ style, className }: Props) {
  const table = useTable();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const search = (value) => {
    if (inputRef.current != null) {
      table.search(value);
    }
  };

  return (
    <TableGrid className={className} style={style}>
      <SearchContainer>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput inputRef={inputRef} onValueChange={search} />
      </SearchContainer>
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
