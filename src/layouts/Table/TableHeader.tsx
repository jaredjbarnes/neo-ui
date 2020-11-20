import React, { useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import useSelectedRows from "../../mediators/table/hooks/useSelectedRows";
import useTable from "../../mediators/table/hooks/useTable";
import styled from "styled-components";
import TableColumn from "./TableColumn";
import Surface from "../../core/Surface";
import Checkbox from "../../inputs/Checkbox";

const TableHeaderContainer = styled(Surface)`
  display: grid;
  position: relative;
  height: 37px;
  min-width: 100%;
  background-color: #ecf0f3;
  grid-template-rows: 6px 25px 6px;
`;

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const TableHeader = ({ className, style }: Props) => {
  const table = useTable();
  const columns = useColumns();
  const selectedRows = useSelectedRows();
  const isChecked = selectedRows.length > 0;

  const barStyles = useMemo(() => {
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

  const toggleSelection = () => {
    if (isChecked) {
      table.deselectAllRows();
    } else {
      table.selectedAllRows();
    }
  };

  return (
    <TableHeaderContainer
      style={{ ...style, ...barStyles }}
      className={className}
      mode="popOut"
      raisedSpread={4}
      raisedOffset={2}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gridColumnStart: 1,
          gridColumnEnd: 1,
          gridRowStart: 2,
          gridRowEnd: 2,
          padding: 0,
        }}
      >
        <Checkbox value={isChecked} onValueChange={toggleSelection} />
      </div>
      {columns.map((c, index) => (
        <TableColumn
          column={c}
          key={index}
          style={{
            gridRowStart: 2,
            gridRowEnd: 2,
            gridColumnStart: index + 2,
            gridColumnEnd: index + 2,
            width: c.width + "px",
            textAlign: c.alignment,
          }}
        >
          {c.label}
        </TableColumn>
      ))}
      <div
        style={{
          gridRowStart: 2,
          gridRowEnd: 2,
          gridColumnStart: columns.length + 2,
          gridColumnEnd: columns.length + 2,
          padding: 0,
        }}
      ></div>
    </TableHeaderContainer>
  );
};

export default TableHeader;
