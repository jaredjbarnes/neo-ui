import React, { useRef } from "react";
import styled from "styled-components";
import useTable from "../../mediators/table/hooks/useTable";
import TextInput from "../../inputs/TextInput";
import TableDataScroller from "./TableDataScroller";
import SolidButton from "../../inputs/SolidButton";
import OutlineButton from "../../inputs/OutlineButton";
import TableActions from "./TableActions";
import Search from "@material-ui/icons/Search";
import useActions from "../../mediators/table/hooks/useActions";
import TableMediator, { Row } from "../../mediators/table/TableMediator";

const TableGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 125px;
  grid-template-rows: 35px 16px auto;
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

const StyledTableActions = styled(TableActions)`
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

export interface Props<T> {
  style?: React.CSSProperties;
  className?: string;
  onRowClick?: (
    row: Row<T>,
    table: TableMediator<T>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

function TableLayout<T>({ style, className, onRowClick }: Props<T>) {
  const table = useTable();
  const actions = useActions();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const showActions = actions.length > 0;

  const search = (value: string) => {
    if (inputRef.current != null) {
      table.search(value);
    }
  };

  const gridStyles = {
    gridTemplateColumns: "auto 125px",
  };

  if (!showActions) {
    gridStyles.gridTemplateColumns = "100%";
  }

  return (
    <TableGrid className={className} style={{ ...style, ...gridStyles }}>
      <SearchContainer>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput inputRef={inputRef} onValueChange={search} />
      </SearchContainer>
      <TableDisplay onRowClick={onRowClick} />
      {showActions && <StyledTableActions />}
    </TableGrid>
  );
}

export default TableLayout;
