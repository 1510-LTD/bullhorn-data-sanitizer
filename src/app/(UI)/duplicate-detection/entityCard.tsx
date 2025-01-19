import { useEffect, useState } from "react";
import { getKeyPairJsxLabel } from "@/component/util";
import styled from "styled-components";
import { CaptionText } from "@/utils/fonts";
import { Badge } from "@/component/badge";

import { Card } from "@/component/Card";
import {
  ArrowDropDownIcon,
  ArrowRightIcon,
  IconWrapper
} from "@/component/icons";
import { FlexColumnGapWrapper, FlexGapWrapper } from "@/utils/styled";
import DataGrid from "@/component/datagrid";
import { Button } from "@/component/button";
import toast from "react-hot-toast";
import { BhDuplicates } from "@/app/app-types";

interface Props {
  data: BhDuplicates;
  fieldMapping: {
    [key: string]: string;
  };
}

const EntityCard = ({ data, fieldMapping }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState<
    {
      id: number;
      isSelected: boolean;
      isMaster: boolean;
      [key: string]: unknown;
    }[]
  >([]);

  const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);

  const columns = Object.keys(Object.values(data)[0][0]);

  useEffect(() => {
    const rowsList = Object.values(data)[0].map((item) => ({
      ...item,
      isSelected: false,
      isMaster: false,
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

    rowsList[0].isMaster = true;

    setRows(rowsList);
  }, [data]);

  const toggleRowSelect = (id: string) => {
    const tmpRows = rows?.map((row) => ({
      ...row,
      isSelected: row.id === Number(id) ? !row.isSelected : row.isSelected
    }));
    setRows(tmpRows);
  };

  const handleMakingRowMaster = (id: string) => {
    const tmpRows = rows?.map((row) => ({
      ...row,
      isMaster: row.id === Number(id)
    }));
    setRows(tmpRows);
  };

  const handleMergeWithMaster = () => {
    const selectedRows = rows?.filter((row) => row.isSelected);
    const masterRow = selectedRows?.find((row) => row.isMaster);

    if (!masterRow) {
      toast.error("Select a master row to merge with");
      return;
    }

    toast.success(
      `Merged ${selectedRows.length - 1} rows with master ${masterRow.id}`
    );
  };

  return (
    <>
      <ListCardContainer>
        <ContentContainer>
          <CardHeader>
            <FlexGapWrapper>
              <IconWrapper onClick={() => setIsOpen(!isOpen)}>
                {!isOpen ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
              </IconWrapper>

              {getKeyPairJsxLabel("Master Entity", Object.keys(data)[0])}
            </FlexGapWrapper>

            <Badge
              type="error"
              label={`Duplicate Count: ${Object.values(data)[0].length}`}
            />

            <TextEllipsis>
              {Object.values(data)[0].length > 1
                ? `Duplicates: ${Object.values(data)[0]
                    .map((item) => item.id)
                    .join(", ")}`
                : "No duplicates found"}
            </TextEllipsis>
          </CardHeader>
        </ContentContainer>
        {isOpen && (
          <>
            <GridContainer>
              <DataGrid
                columnsList={columns.filter(
                  (column) => !fieldsToRemove.includes(column)
                )}
                rows={rows || []}
                toggleRowSelect={toggleRowSelect}
                onMakingRowMaster={handleMakingRowMaster}
                fieldMapping={fieldMapping}
              />
            </GridContainer>
            {rows?.filter((row) => row.isSelected)?.length > 0 && (
              <Button onClick={handleMergeWithMaster}>Merge with Master</Button>
            )}
          </>
        )}
      </ListCardContainer>
    </>
  );
};

export default EntityCard;

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

const GridContainer = styled.div`
  width: 100%;
  overflow: auto;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const TextEllipsis = styled(CaptionText)`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
  overflow: hidden;
  line-height: 1;
`;
