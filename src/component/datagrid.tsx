import React from "react";

import styled from "styled-components";
import { Checkbox } from "./checkbox";

import { getConcatedUserName } from "@/utils/converter";
import { Switch } from "./switch";
import { BodyText2, CaptionText } from "@/utils/fonts";

type RowsWithSelectionProps = Record<string, unknown> & {
  isSelected: boolean;
  isMaster: boolean;
};

interface GridProps {
  rows: RowsWithSelectionProps[];
  toggleRowSelect: (id: string) => void;
  onMakingRowMaster?: (id: string) => void;
  columnsList: string[];
  fieldMapping?: {
    [key: string]: string;
  };
}

const getColumnValue = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return value.toString();
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.map((item) => item.toString()).join(", ");
  }

  if (typeof value === "object") {
    const name = getConcatedUserName(value as any);
    if (name) return name;
    return JSON.stringify(value);
  }

  return "***********";
};

const DataGrid = ({
  rows,
  columnsList,
  toggleRowSelect,
  onMakingRowMaster,
  fieldMapping
}: GridProps) => {
  return (
    <GridContainer>
      <thead>
        <TableRow $backgroundColor="blue-tertiary">
          <th>
            <CellHeaderWrapper>{"#"}</CellHeaderWrapper>
          </th>
          <th>
            <CellHeaderWrapper>Master</CellHeaderWrapper>
          </th>
          {columnsList.map((column, index) => (
            <th key={index}>
              <CellHeaderWrapper>
                {fieldMapping?.[column] || column}
              </CellHeaderWrapper>
            </th>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <td>
              <CellWrapper>
                <Checkbox
                  checked={row.isSelected}
                  label=""
                  onCheckedChange={() => {
                    toggleRowSelect(String(row.id));
                  }}
                />
              </CellWrapper>
            </td>
            <td>
              <CellWrapper>
                <Switch
                  id={String(row.id)}
                  checked={row.isMaster}
                  onCheckedChange={() => {
                    onMakingRowMaster && onMakingRowMaster(String(row.id));
                  }}
                />
              </CellWrapper>
            </td>
            {columnsList.map((column, index) => (
              <td key={index}>
                <CellWrapper>
                  <TextEllipsis>{getColumnValue(row[column])}</TextEllipsis>
                </CellWrapper>
              </td>
            ))}
          </TableRow>
        ))}
      </tbody>
    </GridContainer>
  );
};

export default DataGrid;

const GridContainer = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

const TextEllipsis = styled(CaptionText)`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const CellWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.25rem 0.5rem 0.25rem;
  max-width: 300px;
`;

const CellHeaderWrapper = styled(BodyText2)`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.25rem 0.5rem 0.25rem;
`;

const TableRow = styled.tr<{ $backgroundColor?: string }>`
  height: fit-content;
  border-bottom: 1px solid var(--clr-surfaces-secondary-2);
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? `var(--${$backgroundColor})` : "transparent"};
`;
