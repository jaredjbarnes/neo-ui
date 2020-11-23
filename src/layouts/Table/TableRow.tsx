import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import useTable from "../../mediators/table/hooks/useTable";
import useIsRowSelected from "../../mediators/table/hooks/useIsRowSelected";
import styled from "styled-components";
import TableCell from "./TableCell";
import TableMediator, { Row } from "../../mediators/table/TableMediator";
import RowProvider from "../../mediators/table/RowProvider";
import Checkbox from "../../inputs/Checkbox";

const TableRowContainer = styled.div`
  display: grid;
  position: relative;
  height: 40px;
  min-width: 100%;
  border-bottom: 2px ridge rgba(255, 255, 255, 0.65);
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  user-select: none;
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
      "50px " +
      columns
        .map((c) => (typeof c.width === "number" ? `${c.width}px` : c.width))
        .join(" ") +
      " auto";

    const width =
      columns.reduce((acc, column) => {
        return acc + column.width;
      }, 0) + 50;

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gridColumnStart: 1,
            gridColumnEnd: 1,
            padding: 0,
          }}
        >
          <Checkbox value={isSelected} onValueChange={onCheckboxClick} />
        </div>
        {columns.map((c, index) => (
          <TableCell
            column={c}
            key={index}
            style={{
              gridColumnStart: index + 2,
              gridColumnEnd: index + 2,
              width: c.width + "px",
            }}
          >
            {cells.find((cell) => cell.name === c.name)?.value}
          </TableCell>
        ))}
        <div
          style={{
            gridColumnStart: columns.length + 2,
            gridColumnEnd: columns.length + 2,
            padding: 0,
          }}
        ></div>
      </TableRowContainer>
    </RowProvider>
  );
};

export default TableRow;
