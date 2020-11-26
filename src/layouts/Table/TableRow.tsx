import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import useTable from "../../mediators/table/hooks/useTable";
import useIsRowSelected from "../../mediators/table/hooks/useIsRowSelected";
import styled from "styled-components";
import TableCell from "./TableCell";
import TableMediator, { Row } from "../../mediators/table/TableMediator";
import RowProvider from "../../mediators/table/RowProvider";
import Checkbox from "../../inputs/Checkbox";
import IconButton from "../../inputs/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const TableRowContainer = styled.div`
  display: grid;
  position: relative;
  height: 40px;
  min-width: 100%;
  border-bottom: 2px ridge rgba(255, 255, 255, 0.65);
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  user-select: none;
  overflow: hidden;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-column-start: 1;
  grid-column-end: 1;
  padding: 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-column-start: 2;
  grid-column-end: 2;
  padding: 0;
`;

const ActionsButton = styled(IconButton)`
  width: 25px;
  height: 25px;
  margin-left: 5px;
`;

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  row: Row<any>;
  onRowClick?: (
    row: Row<any>,
    table: TableMediator<any>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const TableRow = ({ row, className, style, onRowClick }: Props) => {
  const columns = useColumns();
  const table = useTable();
  const isSelected = useIsRowSelected(row);

  const rowStyles = useMemo(() => {
    const gridTemplateColumns =
      "30px 50px " +
      columns
        .map((c) => (typeof c.width === "number" ? `${c.width}px` : c.width))
        .join(" ") +
      " auto";

    const width =
      columns.reduce((acc, column) => {
        return acc + column.width;
      }, 0) + 80;

    return {
      width: `${width}px`,
      gridTemplateColumns,
    } as React.CSSProperties;
  }, [columns]);

  const cells = row.cells;

  const onCheckboxClick = () => {
    if (table.isRowSelected(row)) {
      table.deselectRow(row);
    } else {
      table.selectRow(row);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (typeof onRowClick === "function") {
      onRowClick(row, table, event);
    }
  };

  return (
    <RowProvider row={row}>
      <TableRowContainer
        style={{ ...style, ...rowStyles }}
        className={className}
        onClick={onClick}
      >
        <CheckboxContainer>
          <Checkbox value={isSelected} onValueChange={onCheckboxClick} />
        </CheckboxContainer>
        <ActionsContainer>
          <ActionsButton
            raisedOffset={2}
            raisedSpread={4}
            insetOffset={2}
            insetSpread={4}
          >
            <MoreVertIcon fontSize="small" />
          </ActionsButton>
        </ActionsContainer>
        {columns.map((c, index) => (
          <TableCell
            column={c}
            key={index}
            style={{
              gridColumnStart: index + 3,
              gridColumnEnd: index + 3,
              width: c.width + "px",
            }}
          >
            {cells.find((cell) => cell.name === c.name)?.value}
          </TableCell>
        ))}
        <div
          style={{
            gridColumnStart: columns.length + 3,
            gridColumnEnd: columns.length + 3,
            padding: 0,
          }}
        ></div>
      </TableRowContainer>
    </RowProvider>
  );
};

export default TableRow;
