import React, { useState, useMemo } from "react";
import useColumns from "../../mediators/table/hooks/useColumns";
import styled from "styled-components";
import Column from "./TableColumn";

const TableHeaderContainer = styled.div`
  display: grid;
  position: relative;
  height: 25px;
  min-width: 100%;
  background-color: #ecf0f3;
  border-bottom: 1px solid #999;
`;

export interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const TableHeader = ({ className, style }: Props) => {
  const columns = useColumns();

  useMemo(() => {
    columns.push({
      name: "",
      label: "",
      width: "auto",
      canSort: false,
    });
  }, [columns]);

  const gridTemplateColumns = columns.map((c) => `${c.width}`).join(" ");

  return (
    <TableHeaderContainer
      style={{ ...style, gridTemplateColumns }}
      className={className}
    >
      {columns.map((c) => (
        <Column style={{ width: c.width }}>{c.label}</Column>
      ))}
    </TableHeaderContainer>
  );
};

export default TableHeader;
