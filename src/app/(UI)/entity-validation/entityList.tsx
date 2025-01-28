import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card } from "@/component/Card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/component/icons";
import { FlexColumnGapWrapper, FlexGapWrapper } from "@/utils/styled";
import { Button } from "@/component/button";
import { Autocomplete } from "@/component/autocomplete";
import DataGrid from "@/component/datagrid";
import toast from "react-hot-toast";
import { CaptionText } from "@/utils/fonts";

interface Props {
  entity: string;
  data: {
    [key: string]: unknown;
  }[];
  fieldMapping: {
    [key: string]: string;
  };
  start: number;
  count: number;
  totalCount: number;
  setStart: (start: number) => void;
  setCount: (count: number) => void;
  handleFindInvalidRecords: (start?: number) => void;
}

const EntityList = ({
  data,
  start,
  count,
  totalCount,
  setStart,
  setCount,
  handleFindInvalidRecords,
  fieldMapping
}: Props) => {
  const [rows, setRows] = useState<
    {
      id: number;
      isSelected: boolean;
      [key: string]: unknown;
    }[]
  >([]);

  const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);

  const columns = Object.keys(fieldMapping);

  useEffect(() => {
    const rowsList = Object.values(data).map((item) => ({
      ...item,
      isSelected: false,
      id: item.id as number
    }));

    // from the row list, remove all the fields if none of the rows in the column have a value
    const nullFields = columns.filter((column) =>
      rowsList.every((row) => {
        const value = row[column as keyof typeof row];
        return !value;
      })
    );

    setFieldsToRemove(nullFields);

    rowsList.forEach((row) => {
      fieldsToRemove.forEach((field) => {
        const key = field as keyof typeof row;
        delete row[key];
      });
    });

    setRows(rowsList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const toggleRowSelect = (id: string) => {
    const tmpRows = rows?.map((row) => ({
      ...row,
      isSelected: row.id === Number(id) ? !row.isSelected : row.isSelected
    }));
    setRows(tmpRows);
  };

  const handleNext = () => {
    handleFindInvalidRecords(start + count);
  };

  const handlePrevious = () => {
    setStart(start - count < 0 ? 0 : start - count);
    handleFindInvalidRecords();
  };

  const handleChangeCount = (value: number) => {
    setCount(value);
    handleFindInvalidRecords();
  };

  return (
    <>
      <ListCardContainer>
        <ContentContainer>
          <GridContainer>
            <DataGrid
              rows={rows}
              toggleRowSelect={toggleRowSelect}
              columnsList={columns.sort((a, b) => {
                const cA = fieldMapping?.[a] || a;
                const cB = fieldMapping?.[b] || b;

                if (cA === "id") return -1;
                if (cB === "id") return 1;

                if (
                  cA.toLowerCase().includes("name") &&
                  !cB.toLowerCase().includes("name")
                )
                  return -1;
                if (
                  !cA.toLowerCase().includes("name") &&
                  cB.toLowerCase().includes("name")
                )
                  return 1;

                if (
                  cA.toLowerCase().includes("email") &&
                  !cB.toLowerCase().includes("email")
                )
                  return -1;
                if (
                  !cA.toLowerCase().includes("email") &&
                  cB.toLowerCase().includes("email")
                )
                  return 1;

                return 0;
              })}
              fieldMapping={fieldMapping}
            />
          </GridContainer>
          <PaginationContainer>
            <FlexGapWrapper $gap="1rem">
              <Button
                label="Store selected records as a Tear Sheet"
                outlined
                disabled={rows.filter((row) => row.isSelected).length === 0}
                onClick={() => {
                  toast.success(
                    `Selected ${rows.filter((row) => row.isSelected).length} records stored as a Tear Sheet`
                  );
                }}
              />

              <Button
                label="Store all records as a Tear Sheet"
                outlined
                onClick={() => {
                  toast.success("Searched results stored as a Tear Sheet");
                }}
              />
            </FlexGapWrapper>

            <Autocomplete
              label="Rows per page"
              options={[
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 50, label: "50" },
                { value: 100, label: "100" }
              ]}
              value={count}
              onChange={(value) => {
                handleChangeCount(Number(value));
              }}
            />

            <Button
              leadingIcon={<ArrowLeftIcon />}
              outlined
              label="Previous"
              disabled={start === 0}
              onClick={handlePrevious}
            />
            <CaptionText>
              {`Page ${Math.floor(start / count) + 1} of ${Math.ceil(totalCount / count)}`}
            </CaptionText>
            <Button
              label="Next"
              outlined
              trailingIcon={<ArrowRightIcon />}
              disabled={start + count >= totalCount}
              onClick={handleNext}
            />
          </PaginationContainer>
        </ContentContainer>
      </ListCardContainer>
    </>
  );
};

export default EntityList;

const ListCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  gap: 1.5rem;
  width: 100%;
`;

const ContentContainer = styled(FlexColumnGapWrapper)`
  width: 100%;
`;

const _GridContainer = styled.div`
  width: 100%;
  overflow: auto;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  line-height: 1;
`;

const GridContainer = styled.div`
  width: 100%;
  overflow: auto;
`;
